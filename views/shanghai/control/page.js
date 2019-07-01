define(function(require) {
  let $ = require("jquery"),
    Vue = require("vue"),
    echarts = require("echarts");
  let shanghaiMap = require("../shanghai");
  // let yunnanGeo = require("utils/yunnanGeo");

  let baseOption = require("../baseOption");

  let mockData = require("../mockData");

  let serverPath = require("utils/serverPath");
  
  Vue.component("status-tag", {
    props: {
      position: {
        type: String,
        default: 'right'
      },
      active: {
        type: Boolean,
        default: false,
      },
      status: {
        type: Object,
        default () {
          return {
            station_name: '',
            transfer_status: "normal",
            net_status: "unnormal",
            device_status: "unnormal",
            check_date_rate: '0' // 计量鉴定计时
          }
        }
      },
    },
    template: `
      <div class="state_wrapper" :class="[{active: active}, position]">
        <div class="state upload_state" :class="{error: status.transfer_status !== 'normal'}"></div>
        <div class="state communication_state" :class="{error: status.net_status !== 'normal'}"></div>
        <div class="state device_state" :class="{error: status.device_status !== 'normal'}"></div>
        <div class="measurement_time">
            <div :style="{ width: status.check_date_rate > 100 ? '100' : status.check_date_rate + '%' }"></div>
        </div>
        <div class="status_detail">
            <h5>{{ status.station_name }}国家气象站</h5>
            <p>站号：<span>{{ status.station_id }}</span></p>
            <p>状态：<span :style="{ color: status.status === 'normal' ? 'white' : '#ff321c' }">{{ status.status === 'normal' ? '正常' : '异常' }}</span></p>
        </div>
      </div>
      `,
  });

  Vue.component("lame-bar", {
    props: {
      label: {
        type: String,
        default: ''
      },
      barColor: {
        type: String,
        default: 'rgb(63, 157, 255)'
      },
      baseColor: {
        type: String,
        default: 'rgb(63, 157, 255, 0.3)'
      },
      value: {
        type: String,
        default: '0%'
      }
    },
    template: `
      <div class="chart_item">
        <div class="label">{{ label }}</div>
        <div class="bar" :style="{background: baseColor}">
            <div :style="{background: barColor, width: value}"></div>
        </div>
        <div class="value">{{ value }}</div>
      </div>
      `,
  });
      // <div class="info_tag_item"><div><img :src="\`./img/${type}${ isNormal ? '' : '-error' }.png\`" alt="icon"></div> <slot /></div>

  Vue.component("simple-info-tag", {
    props: {
      icon: {
        type: String,
        default: 'evaporate',
      },
      isNormal: {
        type: Boolean,
        default: true,
      },
      position: {
        type: String,
        default: 'right',
      },
      text: {
        type: String,
        default: '',
      }
    },
    template: `
    <div class="simple_info_tag_wrapper" :class="[{error: !isNormal}, position]">
      <div class="simple_info_tag_item"><div><img :src="'./img/' + icon + (isNormal ? '' : '-error') + '.png'" alt="icon"></div> {{ text }}</div>
    </div>
      `,
  });

  Vue.component("complex-info-tag", {
    props: {
      data: {
        type: Object,
        default () {
          return {
            status: 'normal',
            error_list: []
          }
        },
      },
      text: {
        type: String,
        default: '',
      },
      icon: {
        type: String,
        default: '',
      },
      position: {
        type: String,
        default: 'right'
      }
    },
    data () {
      return {
        index: 0,
        interval: null,
      }
    },
    computed: {
      errorInfo () {
        if (this.data['error_list'] && this.data['error_list'].length > 0) {
          return this.data['error_list'][this.index]
        } else {
          return ''
        }
      },
      isNormal () {
        return this.data.status === 'normal'
      }
    },
    watch: {
      data (newVal) {
        if (newVal['error_list']) {
          let length  = newVal['error_list'].length
          if (length >= 1) {
            if (this.interval) {
              clearInterval(this.interval)
            }
            this.interval = setInterval (() => {
              this.index = (this.index >= length - 1) ? 0 : ++this.index
            }, 1000)
          }
        }
      }
    },
    template: `
    <div class="complex_info_tag_wrapper" :class="[{error: !isNormal}, position]">
      <div v-if="!isNormal && errorInfo" class="complex_info_tag complex_info_tag_max">
        <p class="complex_info_tag_item">{{ errorInfo }}</p>
      </div>
      <br />
      <div class="complex_info_tag complex_info_tag_min">
        <img :src="'./img/' + icon + (isNormal ? '' : '-error') + '.png'" />
        <p class="complex_info_tag_item">{{ text }}</p>
      </div>
    </div>
      `,
  });

  let vm = new Vue({
    el: "#app",
    data: {
      mapData: [],
      mapActiveIndex: 1,
      barChartData: [],
      barColor: ['rgba(63, 157, 255)', 'rgba(184, 137, 44)', 'rgba(184, 39, 44)', 'rgba(141, 39, 184)'],
      baseColor: ['rgba(63, 157, 255, 0.2)', 'rgba(184, 137, 44, 0.2)', 'rgba(184, 39, 44, 0.2)', 'rgba(141, 39, 184, 0.2)'],
      barLabel: {
        in_time: '及时',
        over_time: '逾限',
        not_send: '缺报',
        not_arrive: '未到',
      },
      mapDialogVisible: false,
      mapInterval: null,
      mapChangeStopped: false,
      deviceDict: {
        temp: {
          icon: 'temperature',
          text: '地温观测',
        },
        air_pressure: {
          icon: 'pressure',
          text: '气压',
        },
        wind_direction: {
          icon: 'wind_direction',
          text: '风向观测',
        },
        wind_speed: {
          icon: 'wind_speed',
          text: '风速观测',
        },
        rain_fan: {
          icon: 'rainfall',
          text: '翻斗式降水量',
        },
        rain_chen: {
          icon: 'rainfall',
          text: '称重式降水量',
        },
        evaporation: {
          icon: 'evaporation',
          text: '蒸发量观测',
        },
        newstation_visibility: {
          icon: 'visibility',
          text: '能见度观测',
        },
        rain_wei: {
          icon: 'water-level',
          text: '量水位',
        },
        pc: {
          icon: 'host',
          text: '主机',
        },
        radiation: {
          icon: 'radiation',
          text: '辐射观测',
        },
        visibility: {
          icon: 'visibility',
          text: '能见度观测',
        },
        weather: {
          icon: 'weather',
          text: '天气现象',
        },
        collector: {
          icon: 'host',
          text: '主采集器',
        },
        temperature: {
          icon: 'temperature',
          text: '温度',
        },
        humidity: {
          icon: 'humidity',
          text: '湿度',
        },
        serial_server: {
          icon: 'host',
          text: '串口服务器'
        }
      },
      detailDialogVisible: false,
      detailData: {
        deviceName: '',
        station: '',
        time: '',
        detail: []
      }
    },
    computed: {
      deviceData () {
        return this.mapData.length > 0 ? this.mapData[this.mapActiveIndex]['device'] : {
          newstation: {
            air_pressure: 'normal',
            wind_direction: 'normal',
            wind_speed: 'normal',
            rain_fan: 'normal',
            rain_chen: 'normal',
            evaporation: 'normal',
            newstation_visibility: 'normal',
            rain_wei: 'normal'
          },
          pc: {
            status: 'normal',
          },
          radiation: {
            status: 'normal'
          },
          visibility: {
            status: 'normal',
          },
          weather: {
            status: 'normal'
          },
          temp: {
            status: 'normal'
          }
        }
      },
      currentInfo () {
        if (this.mapData.length > 0) {
          return this.mapData[this.mapActiveIndex]
        } else {
          return {
            station_name: '',
            station_id: '',
            status: 'normal',
            transfer_status: 'normal',
            net_status: 'normal',
            device_status: 'normal',
            check_date_rate: '0',
            line_one_status: 'normal',
            line_two_status: 'normal',
            product_time: '',
            cts_arrive_time: '',
            cts_send_time: '',
            cts_ip: '',
            cts_status: 'normal',
          }
        }
      }
    },
    mounted() {
      echarts.registerMap("shanghai", shanghaiMap);
      echarts.init(this.$refs['map']).setOption(baseOption.mapOption);
      
      this.startChangeMap()
      window.onkeyup = (event) => {
        if (event.keyCode === 13 && !this.mapDialogVisible) {
          this.mapDialogVisible = true
        }
      }
    },
    methods: {
      startChangeMap () {
        this.mapChangeStopped = false
        if (this.mapInterval) {
          clearInterval(this.mapInterval)
        }
        this.mapInterval = setInterval(() => {
          if (!this.mapDialogVisible && !this.detailDialogVisible) {
            this.mapActiveIndex = (this.mapActiveIndex >= this.mapData.length - 1) ? 0 : ++this.mapActiveIndex
          }
        }, 3000)
      },
      stopChangeMap () {
        clearInterval(this.mapInterval)
        this.mapChangeStopped = true
      },
      handleAction () {
        if (this.mapChangeStopped) {
          this.startChangeMap()
        } else {
          this.stopChangeMap()
        }
        this.mapDialogVisible = false
      },
      updateData(data) {
        if (data.station) {
          console.log(data.station)
          this.mapData = data.station
        }
        if (data.report) {
          this.barChartData = data.report
        }
      },
      showMapDialog () {
        if (!this.mapDialogVisible) this.mapDialogVisible = true
      },
      getDetail (deviceType, status) {
        //if (status === 'normal') return 
        // 设备类型为deviceType
        // 站名: this.currentInfo['station_name']
        // 站id: this.currentInfo['station_id']
        let self = this;
        
        
        $.get(serverPath.page1 + "/deviceDetail/" + this.currentInfo['station_id'] + "/" + deviceType, function(result){
		    self.detailData = JSON.parse(result);
		    self.detailDialogVisible = true;
    }
    );
		
		
      //   self.detailData = {
      //   		"deviceName": "主机",
      //   		"station": "闵行(58361)",
      //   		"time": "2018-12-14 17:25",
				
      //   		"detail": [{
      //   			"name": "内存总量: 12285",
      //   			"state": "normal"
      //   		}, {
      //   			"name": "当前使用内存(MB) 3499",
      //   			"state": "normal"
      //   		}, {
      //   			"name": "当前CPU使用率2810",
      //   			"state": "normal"
      //   		}, {
      //   			"name": "当前盘总量(MB) 434176",
      //   			"state": "normal"
      //   		}, {
      //   			"name": "当前盘剩余容量(MB) 425984",
      //   			"state": "normal"
      //   		}]
      //   	};
	    // self.detailDialogVisible = true;
      }
    }
  });


   let WS = require("utils/WS2");
   let ws = new WS(serverPath.page1 + "/shqx-wrzs-ws");
   ws.stompClient.connect(
     {},
     function(frame) {
       ws.stompClient.subscribe("/topic/info", function(message) {
    	   	console.log("==========收到定时发送的消息 start=============");
    	   	var msg = JSON.parse(message.body);
    	   	console.log(JSON.stringify(msg.data));
    	   	console.log("==========收到定时发送的消息 end=============");
         var dataBody = JSON.parse(message.body);
         //console.log(JSON.stringify(mockData));
         updatePage(msg.data);
       });
       
       ws.stompClient.subscribe("/shqx/info_server", function(message) {
   	   	console.log("==========连接成功 start=============");
   	   	var msg = JSON.parse(message.body);
   	   	console.log(JSON.stringify(msg.data));
   	   	console.log("==========连接成功 end=============");
        var dataBody = JSON.parse(message.body);
        //console.log(JSON.stringify(mockData));
        updatePage(msg.data);
      });
       
     }
  );
  

  updatePage(mockData); // 请调用这个函数@后端
   
  // setInterval(() => {
  //   updatePage(mockData); // 请调用这个函数@后端
  // }, 3000);
  

  function updatePage(data) {
    if (data) {
      vm.updateData(data);
    } else {
      alert("error!");
    }
  }
});
