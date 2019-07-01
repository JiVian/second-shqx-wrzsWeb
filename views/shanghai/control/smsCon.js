define(function(require){
    let $ = require("jquery"),
    Vue = require("vue");
    let serverPath = require("utils/serverPath");

    let vm = new Vue({
        el: "#app",
        data:{
            list:{},
            listData:[],
            listName:{},
            typeParam:'',
            send:'',
            areaId:'',
            areaStatus:'',
            oldPsd:'',
            newPsd:'',
            checkedCode: [],        // 用于保存被选中的数据
            isAllChecked: false,    // 正在进行中的数据是否被选中
            ischange:false,
            isShow:false,
        },
        created(){
            this.getDefault()
            // this.getStatus()
        },
        methods:{
            //设备类型的选择
            typeSelect(event){
                let self = this;
                this.typeParam = encodeURI(event.target.value)
                $.get(serverPath.page1 + "/sendnote/switchmessage"+"?"+"stationId="+self.areaId+"&"+"type="+self.typeParam, function(result){
                    self.list=JSON.parse(result)
                    self.listData = self.list.data
                    console.log(self.list)
                });
            },
            //默认显示的数据
            getDefault() {
                let self = this;
                this.areaId = window.location.search.slice(6,11)
                this.areaStatus = unescape(window.location.search.slice(19,31))
                console.log(this.areaStatus)
                if(this.areaStatus === "成功"){
                    this.isShow = true;
                }else{
                    this.isShow = false;
                    alert("温馨提示：请先登录！！")
                }    
                $.get(serverPath.page1 + "/sendnote/switchmessage"+"?"+"stationId="+self.areaId+"&"+"type="+"自动站", function(result){
                    self.list=JSON.parse(result)
                    self.listData = self.list.data
                    self.listName = self.list.name.stationNames
                    console.log('默认显示的数据',self.list)
                });
            },
            //全选功能
            checkAll(){
                if(!this.isAllChecked){
                    this.listData.forEach((item)=>{
                        this.checkedCode.push(item.id)
                    })
                }else{
                    this.checkedCode = []
                }
            },
            //反选
            singleChecked(){
                if(this.listData.length == this.checkedCode.length){
                    this.isAllChecked = true;
                }else{
                    this.isAllChecked = false
                }
            },
            //单独短信开关状态(0开1关)
            getStatus(item,index){
                let self = this
                //获取此行的index
                console.log('点击的开关此行的短信状态',item.isSend,item.id)
                this.send = item.isSend
                if(item.isSend === '1'){
                    item.isSend = '0'
                    console.log('开关状态改变',item.isSend)
                    $.ajax({
                        url : serverPath.page1 + "/sendnote/switchstatus"+"?"+"stationId="+self.areaId+"&"+"isSend="+item.isSend+'&'+'ids='+item.id,
                        type : 'post',
                        dataType : 'json',
                        contentType : 'application/json',
                        async : true,
                        success : function(data) {
                            if (data === true) {
                                alert("温馨提示：短信状态已打开！")
                            }
                        }
                    });
                }else{
                    item.isSend = '1'
                    console.log('开关状态改变',item.isSend)
                    $.ajax({
                        url : serverPath.page1 + "/sendnote/switchstatus"+"?"+"stationId="+self.areaId+"&"+"isSend="+item.isSend+'&'+'ids='+item.id,
                        type : 'post',
                        dataType : 'json',
                        contentType : 'application/json',
                        async : true,
                        success : function(data) {
                            if (data === true) {
                                alert("温馨提示：短信状态已关闭！")
                            }
                        }
                    });
                }
                
            },
            //批量短信开
            buttonOpen(){
                let self = this 
                //判断勾选的id和短信状态值
                if(this.checkedCode){
                    this.listData.forEach(item=>{
                        this.checkedCode.forEach(check=>{
                            if(item.id === check && item.isSend === '1'){
                                item.isSend = '0'
                                $.post(serverPath.page1 + "/sendnote/switchstatus"+"?"+"stationId="+self.areaId+"&"+"isSend="+item.isSend+'&'+'ids='+this.checkedCode, function(result){
                                    self.list=JSON.parse(result)
                                    self.listData = self.list.data
                                    console.log('传送给后台的数据是否成功',self.list)
                                },true);
                            }
                        })
                    })
                    setTimeout(function(){
                        alert("温馨提示：你选中的短信状态已打开");
                    },300)
                }
            },
            //批量短信关
            buttonClose(){
                let self = this 
                //判断勾选的id和短信状态值
                if(this.checkedCode){
                    this.listData.forEach(item=>{
                        this.checkedCode.forEach(check=>{
                            if(item.id === check && item.isSend === '0'){
                                item.isSend = '1'
                                $.post(serverPath.page1 + "/sendnote/switchstatus"+"?"+"stationId="+self.areaId+"&"+"isSend="+item.isSend+'&'+'ids='+this.checkedCode, function(result){
                                    self.list=JSON.parse(result)
                                    self.listData = self.list.data
                                    console.log('传送给后台的数据是否成功',self.list)
                                },true);
                            }
                        })
                    })
                    setTimeout(function(){
                        alert("温馨提示：你选中的短信状态关闭");
                    },300)
                }
            },
            //修改密码功能部分
            changePsd(){
                this.ischange = true
            },
            hideBox(){
                this.ischange = false
            },
            confirmPsd(){
                console.log('修改的密码',this.oldPsd,this.newPsd)
                if(this.oldPsd === "" && this.newPsd === ""){
                    alert("原密码和新密码不能为空！")
                }else if(this.oldPsd === ""){
                    alert("原密码不能为空！")
                }else if(this.newPsd === ""){
                    alert("新密码不能为空！")
                }else{
                    $.get(serverPath.page1 + "/senduserconf/updateWarnPass"+'?'+'userName='+this.listName+'&'+'oldPassword='+this.oldPsd+'&'+'newPassword='+this.newPsd, function(result){
                        console.log('传给后台的数据结果',result)
                        if(result == '修改成功'){
                            alert("温馨提示：密码修改成功！")
                        }else if(result == '原密码错误'){
                            alert("温馨提示：密码修改失败！原密码错误")
                        }else{
                            alert("温馨提示：密码修改失败！请检查服务器")
                        }
                    });
                    this.ischange = false
                    this.oldPsd = ""
                    this.newPsd = ""
                }
            }
        }
    })
})