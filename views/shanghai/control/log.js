define(function(require) {
    let $ = require("jquery"),
      Vue = require("vue");
    
    //   echarts = require("echarts");
    // let shanghaiMap = require("./shanghai");
    // let yunnanGeo = require("utils/yunnanGeo");
  
    // let baseOption = require("./baseOption");
  
    // let mockData = require("./mockData");
    let laydate = require("laydate");
    let serverPath = require("utils/serverPath");
    
    let vm = new Vue({
            el: "#app",
            data: {
                stationName:[],
                type:[],
                detailMessage:[],
                stationParam:'',
                typeParam:'',
                faultParam:'',
                alarmParam:'',
                input1:'',
                input2:'',
                startTime:'',
                endTime:'',
                userpsd:'',
                alarmpsd:'',
                timeBox:false,
                isLogin:false,
                isAlarm:false,
            },
            created() {
                this.getStationName();
                this.getType();
                this.getMessage();
            },
            computed: {
                },
            mounted() {
              this.getStart();
              this.getEnd();
            },
            methods: {
                // 区县数据
                getStationName() {
                    let self = this;    
                    $.get(serverPath.page1 + "/stationNameDetail/", function(result){
                        self.stationName=JSON.parse(result)
                    });
                },
                //设备类型数据
                getType() {
                    let self = this;    
                    $.get(serverPath.page1 + "/typeDetail/", function(result){
                        self.type=JSON.parse(result)
                    });
                },
                //选择日期（引用插件）
                getStart() {
                  let self = this;
                    lay('#version').html('-v'+ laydate.v);
                    //时间选择器
                    laydate.render({
                      elem: '#test5'
                      ,type: 'datetime',
                      trigger:'click',
                      done: function(value){
                        // self.startTime = value;
                        self.startTime = encodeURI(value)
                      }
                    });
                },
                getEnd(){
                  let self = this;
                    lay('#version').html('-v'+ laydate.v);
                    //时间选择器
                    laydate.render({
                      elem: '#test6'
                      ,type: 'datetime',
                      trigger:'click',
                      done:function(value){
                        self.endTime = encodeURI(value)
                      }
                    });
                },
                stationSelect(event){
                　　this.stationParam=event.target.value;
                },
                typeSelect(event){
                    this.typeParam=event.target.value;
                },
                faultSelect(event){
                    // this.faultParam=event.target.value
                    if(event.target.value === "实时异常设备记录"){
                      this.faultParam = 'fault'
                      this.timeBox = false
                      console.log('实时',this.faultParam)
                    }else{
                      this.faultParam = 'fault_history'
                      this.timeBox = true
                    }

                    console.log('111',this.faultParam)
                },
                //点击查询
                getMessage() {
                    let self = this;
                    //默认显示全部数据
                    $.get(serverPath.page1 + "/currentFault"+'?'+ 'stationName='+self.stationParam + "&" + 'type='+ self.typeParam + "&" + 'faultType='+self.faultParam + "&" + 'startTime='+self.startTime + "&" + 'endTime='+self.endTime, function(result){
                        // console.log(JSON.parse(result))
                        self.detailMessage=JSON.parse(result)
                        console.log('self.detailMessage',self.detailMessage)
                    });
                    //点击条件查询
                    if(self.stationParam&&self.typeParam&&self.faultParam&&self.startTime&&self.endTime) {
                      $.get(serverPath.page1 + "/currentFault"+'?'+ 'stationName='+self.stationParam + "&" + 'type='+ self.typeParam + "&" + 'faultType='+self.faultParam+ "&" + 'startTime='+self.startTime + "&" + 'endTime='+self.endTime, function(result){
                          console.log("条件都被选择的情况")
                          // console.log(JSON.parse(result))
                          self.detailMessage=JSON.parse(result)
                          console.log('self.detailMessage',self.detailMessage)
                      });
                    }
                },
                //短信设置登录
                loginSms() {
                  let self = this;
                  this.isLogin = true
                },
                formSms(){
                  // console.log('点击弹出框的确认',this.userpsd)
                  if(this.userpsd === ""){
                    alert("温馨提示：密码不能为空")
                  }else{
                    $.get(serverPath.page1 + "/senduserconf/judgeSendPass"+'?'+'password='+this.userpsd, function(result){
                      if(result === true){
                        let alarmStatus = escape("成功")
                        window.open('./setting.html?status='+alarmStatus)
                      }else{
                        alert("温馨提示：密码错误！请再输入")
                      }
                    });
                    this.isLogin = false
                    this.userpsd = ""
                  }
                },
                hideSms(){
                  this.isLogin = false
                },
                //报警设置登录
                loginAlarm(){
                  this.isAlarm = true
                },
                alarmSelect(event){
                  this.alarmParam=encodeURI(event.target.value)
                  console.log('报警设置的区域选择',this.alarmParam)
                },
                formAlarm(){
                  let self = this
                  if(this.alarmParam === "" ){
                    alert("温馨提示：请先选择区县！")
                  }else if(this.alarmpsd === ""){
                    alert("温馨提示：登录密码不能为空！")
                  }else{
                    $.get(serverPath.page1 + "/senduserconf/judgeWarnPass"+'?'+'userName='+this.alarmParam +'&'+'password='+this.alarmpsd, function(result){
                      if(result != '密码错误'){
                        // window.open(result)
                        let alarmStatus = escape("成功")
                        window.open('./sms-control.html?area='+result+'&status='+alarmStatus)
                        console.log('传给后台的数据',result)
                      }else{
                        alert("温馨提示：密码错误！请再输入")
                      }
                    });
                    this.isAlarm = false;
                    this.alarmParam = ""
                    this.alarmpsd = ""
                  }
                },
                
                hideAlarm(){
                  this.isAlarm = false
                  this.alarmParam = ""
                  this.alarmpsd = ""
                },
                download(){
                  let self = this;
                  console.log("下载的参数",this.stationParam,this.typeParam,self.faultParam,self.startTime,self.endTime)
                  $("#exportForm").attr("action",serverPath.page1 + "/downloadexcel?"+ 'stationName='+this.stationParam + "&" + 'type='+this.typeParam + "&" + 'faultType='+self.faultParam+ "&" + 'startTime='+ self.startTime+ "&" + 'endTime='+self.endTime);
                  $("#exportForm").submit();
                }
            }
      });
    
  });
  