define( function(require) {
    let $ = require("jquery"),
    Vue = require("vue");
    let laydate = require("laydate");
    let serverPath = require("utils/serverPath");

    let vm = new Vue({
        el: "#app",
        data:{
            stationName:[],
            checkMes:[],
            putCheck:[],
            areaStatus:'',
            oldPsd:'',
            newPsd:'',
            resetParam:'',
            timeValue:'',
            timeIndex:'',
            isShow:false,
            ischange:false,
            isreset:false,
            ischeck:false,
        },
        created(){
            this.areaStatus =  unescape(window.location.search.slice(8,20))
            console.log(this.areaStatus)
            if(this.areaStatus === "成功"){
                this.isShow = true;
            }else{
                this.isShow = false;
                alert("温馨提示：请先登录！")
            } 
            this.getStationName()
            this.getCheck()
        },
        updated(){
            //时间选择器
            let self = this
            $('.timeput').each(function(index){
                laydate.render({
                    elem: this,
                    trigger:'click',
                    done:function(value){
                        self.timeValue = value
                        self.timeIndex = index
                        self.putCheck[self.timeIndex] = self.timeValue;
                    },
                })
            })
        },
        methods:{
            // 区县数据
            getStationName() {
                let self = this   
                $.get(serverPath.page1 + "/stationNameDetail/", function(result){
                    self.stationName=JSON.parse(result)
                    console.log('短信设置页面区县数据',self.stationName)
                });
            },
            //修改密码
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
                    // this.newPsd = ""
                }else if(this.newPsd === ""){
                    alert("新密码不能为空！")
                    // this.oldPsd = ""
                }else{
                    $.get(serverPath.page1 + "/senduserconf/updateSendPass"+'?'+'oldPassword='+this.oldPsd+'&'+'newPassword='+this.newPsd, function(result){
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
            },
            //重置密码
            showReset(){
                this.isreset = true
            },
            hideReset(){
                this.isreset = false
            },
            resetSelect(event){
                this.resetParam = event.target.value
            },
            resetPsd(){
                console.log('重置的选项',this.resetParam)
                if(this.resetParam == ""){
                    alert("温馨提示：请选择区县！")
                }else{
                    const confirmStatus = confirm("温馨提示：确认重置 "+this.resetParam+" 的密码吗？")
                    console.log('密码弹框状态',confirmStatus)
                    switch(confirmStatus) {
                        case true:
                        $.get(serverPath.page1 + "/senduserconf/passwordReset"+"?"+"county="+this.resetParam,function(result){
                            console.log("重置的结果",result)
                            alert("温馨提示：密码重置成功！")
                        })
                        this.isreset = false
                        this.resetParam = ""
                        break
                    }
                }
            },
            //获取检定时间数据
            getCheck(){
                let self = this   
                $.get(serverPath.page1 + "/deviceDetail/checkDate/",function(result){
                    self.checkMes = JSON.parse(result)
                })
            },
            //检定时间设置
            saveCheck(){
                let self = this;
                console.log('putCheck的数组是否变化',self.putCheck,self.checkMes)
                if(self.putCheck.length == 0){
                    alert("温馨提示：您未做任何更改")
                }else{
                    const confirmStatus = confirm("提示：确定保存吗？")
                    switch(confirmStatus){
                        case true:
                        self.putCheck = JSON.stringify(self.putCheck)
                        $.get(serverPath.page1 + "/deviceDetail/updateCheckDate?"+"checkDates="+self.putCheck,function(result){
                            console.log("发送数据",result)
                            if(result){
                                self.ischeck = false
                                setTimeout(function(){
                                    alert("温馨提示：保存成功！")
                                },500)
                                self.getCheck()
                            }
                        })
                        break
                    }
                    this.putCheck = []
                    this.getCheck()
                }
            },
            showCheck(){
                this.ischeck = true
            },
            checkCancel(){
                this.ischeck = false
            }
        }
    })
});