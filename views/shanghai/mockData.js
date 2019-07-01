
define(function() {
  let station = [{
		station_name: '闵行',
		station_id: '58361',
		status: 'normal',
		transfer_status: 'normal',
		net_status: 'normal',
		device_status: 'normal',
		check_date_rate: '40',
		line_one_status: 'normal',
		line_two_status: 'normal',
		product_time: '2018-12-14 17时',
		cts_arrive_time: '2018-12-14 17:01:32',
		cts_send_time: '2018-12-14 17:01:32',
		station_ip: '10.228.128.7',
		cts_status: 'not_received',
		// 新增字段
		router_conty: "normal", //区局路由器状态
		router_city : "normal", //市局路由器状态
		cts_des : "及时-考核时段:【17:00,17:07】", //cts考核信息
		nation_des : "及时-考核时段:【17:00,17:07】", //国家局考核信息

		device: {
			newstation: {
				air_pressure: 'normal',
				wind_direction: 'normal',
				wind_speed: 'normal',
				rain_fan: 'normal',
				rain_chen: 'normal',
				rain_wei: 'normal', collector: "normal",  temperature: "normal", humidity: "normal" 
			},
			pc: {
				status: 'normal',
				error_list: [
					'内存总量: 12285',
					'当前使用内存(MB) 3499',
					'当前CPU使用率2810',
					'当前盘总量(MB) 434176',
					'当前盘剩余容量(MB) 425984',
				]
			},
			
			visibility: {
				status: 'normal',
				error_list: [
					'接收机',
					'窗口污染',
					'发射机'
				]
			},
			weather: {
				status: 'normal',
				error_list: [
					'天气发射机',
					'窗口污染',
					'发射机'
				]
			},
			temp: { //地温观测
				"status": "normal",
				"error_list": [
					"地温分采集器运行状态",
					"地温分采集器供电电压",
					"地温分采集器供电类型",
					"地温分采集器主板温度",
					"地温分采集器AD模块状态",
					"地温分采集器计数器模块状态"
				]
			}
		}
	}, {
		station_name: '宝山',
		station_id: '58362',
		status: 'normal',
		transfer_status: 'normal',
		net_status: 'normal',
		device_status: 'normal',
		check_date_rate: '50',
		line_one_status: 'normal',
		line_two_status: 'normal',
		product_time: '2018-11-09 09时',
		cts_arrive_time: '2018-11-09 09:10:32',
		cts_send_time: '2018-11-09 09:11:32',
		station_ip: '10.228.12.34',
		cts_status: 'not_received',

		// 新增字段
		router_conty: "normal", //区局路由器状态
		router_city : "normal", //市局路由器状态
		cts_des : "及时-考核时段:【12:00,12:07】", //cts考核信息
		nation_des : "及时-考核时段:【12:00,12:07】", //国家局考核信息


		device: {
			newstation: {
				air_pressure: 'normal',
				wind_direction: 'normal',
				wind_speed: 'normal',
				rain_fan: 'normal',
				rain_chen: 'normal',
				evaporation: 'normal',
				newstation_visibility: 'normal',
				rain_wei: 'normal', 
				collector: "normal",  
				temperature: "normal", 
				humidity: "normal" 
			},
			pc: {
				status: 'normal',
				error_list: [
					'CPU使用率：100%'
				]
			},
			radiation: {
				status: 'normal'
			},
			visibility: {
				status: 'normal',
				error_list: [
					'接收机',
					'窗口污染',
					'发射机'
				]
			},
			weather: {
				status: 'normal'
			},
			temp: { //地温观测
				"status": "normal",
				"error_list": [
					"地温分采集器运行状态",
					"地温分采集器供电电压",
					"地温分采集器供电类型",
					"地温分采集器主板温度",
					"地温分采集器AD模块状态",
					"地温分采集器计数器模块状态"
				]
			}
		}
	},{
		station_name: '嘉定',
		station_id: '58365',
		status: 'normal',
		transfer_status: 'normal',
		net_status: 'normal',
		device_status: 'normal',
		check_date_rate: '100',
		line_one_status: 'normal',
		line_two_status: 'normal',
		product_time: '2018-11-09 09时',
		cts_arrive_time: '2018-11-09 09:10:32',
		cts_send_time: '2018-11-09 09:11:32',
		station_ip: '10.228.12.34',
		cts_status: 'normal',

		// 新增字段
		router_conty: "normal", //区局路由器状态
		router_city : "normal", //市局路由器状态
		cts_des : "及时-考核时段:【12:00,12:07】", //cts考核信息
		nation_des : "及时-考核时段:【12:00,12:07】", //国家局考核信息


		device: {
			newstation: {
				air_pressure: 'normal',
				wind_direction: 'normal',
				wind_speed: 'normal',
				rain_fan: 'normal',
				rain_chen: 'normal',
				evaporation: 'normal',
				newstation_visibility: 'normal',
				rain_wei: 'normal',
				collector: "normal",  
				temperature: "normal", 
				humidity: "normal" 
			},
			pc: {
				status: 'normal',
				error_list: [
					'CPU使用率：100%'
				]
			},
			radiation: {
				status: 'normal'
			},
			visibility: {
				status: 'normal',
				error_list: [
					'接收机',
					'窗口污染',
					'发射机'
				]
			},
			weather: {
				status: 'normal'
			},
			temp: { //地温观测
				"status": "normal",
				"error_list": [
					"地温分采集器运行状态",
					"地温分采集器供电电压",
					"地温分采集器供电类型",
					"地温分采集器主板温度",
					"地温分采集器AD模块状态",
					"地温分采集器计数器模块状态"
				]
			}
		}
	}, {
		station_name: '崇明',
		station_id: '58366',
		status: 'normal',
		transfer_status: 'normal',
		net_status: 'normal',
		device_status: 'normal',
		check_date_rate: '94',
		line_one_status: 'normal',
		line_two_status: 'normal',
		product_time: '2018-11-09 09时',
		cts_arrive_time: '2018-11-09 09:10:32',
		cts_send_time: '2018-11-09 09:11:32',
		station_ip: '10.228.12.34',
		cts_status: 'normal',

		// 新增字段
		router_conty: "normal", //区局路由器状态
		router_city : "normal", //市局路由器状态
		cts_des : "及时-考核时段:【12:00,12:07】", //cts考核信息
		nation_des : "及时-考核时段:【12:00,12:07】", //国家局考核信息


		device: {
			newstation: {
				air_pressure: 'normal',
				wind_direction: 'normal',
				wind_speed: 'normal',
				rain_fan: 'normal',
				rain_chen: 'normal',
				evaporation: 'normal',
				newstation_visibility: 'normal',
				rain_wei: 'normal', 
				collector: "normal",  
				temperature: "normal", 
				humidity: "normal" 
			},
			pc: {
				status: 'normal',
				error_list: [
					'CPU使用率：100%'
				]
			},
			radiation: {
				status: 'normal'
			},
			visibility: {
				status: 'normal',
				error_list: [
					'接收机',
					'窗口污染',
					'发射机'
				]
			},
			weather: {
				status: 'normal'
			},
			temp: { //地温观测
				"status": "normal",
				"error_list": [
					"地温分采集器运行状态",
					"地温分采集器供电电压",
					"地温分采集器供电类型",
					"地温分采集器主板温度",
					"地温分采集器AD模块状态",
					"地温分采集器计数器模块状态"
				]
			}
		}
	},{
		station_name: '徐家汇',
		station_id: '58367',
		status: 'normal',
		transfer_status: 'normal',
		net_status: 'normal',
		device_status: 'normal',
		check_date_rate: '94',
		line_one_status: 'normal',
		line_two_status: 'normal',
		product_time: '2018-11-09 09时',
		cts_arrive_time: '2018-11-09 09:10:32',
		cts_send_time: '2018-11-09 09:11:32',
		station_ip: '10.228.12.34',
		cts_status: 'normal',

		// 新增字段
		router_conty: "normal", //区局路由器状态
		router_city : "normal", //市局路由器状态
		cts_des : "及时-考核时段:【12:00,12:07】", //cts考核信息
		nation_des : "及时-考核时段:【12:00,12:07】", //国家局考核信息


		device: {
			newstation: {
				air_pressure: 'normal',
				wind_direction: 'normal',
				wind_speed: 'normal',
				rain_fan: 'normal',
				rain_chen: 'normal',
				evaporation: 'normal',
				newstation_visibility: 'normal',
				rain_wei: 'normal', collector: "normal",  temperature: "normal", humidity: "normal" 
			},
			pc: {
				status: 'normal',
				error_list: [
					'CPU使用率：100%'
				]
			},
			radiation: {
				status: 'normal'
			},
			visibility: {
				status: 'normal',
				error_list: [
					'接收机',
					'窗口污染',
					'发射机'
				]
			},
			weather: {
				status: 'normal'
			},
			temp: { //地温观测
				"status": "normal",
				"error_list": [
					"地温分采集器运行状态",
					"地温分采集器供电电压",
					"地温分采集器供电类型",
					"地温分采集器主板温度",
					"地温分采集器AD模块状态",
					"地温分采集器计数器模块状态"
				]
			}
		}
	}, {
		station_name: '惠南',
		station_id: '58369',
		status: 'normal',
		transfer_status: 'normal',
		net_status: 'normal',
		device_status: 'normal',
		check_date_rate: '94',
		line_one_status: 'normal',
		line_two_status: 'normal',
		product_time: '2018-11-09 09时',
		cts_arrive_time: '2018-11-09 09:10:32',
		cts_send_time: '2018-11-09 09:11:32',
		station_ip: '10.228.12.34',
		cts_status: 'normal',

		// 新增字段
		router_conty: "normal", //区局路由器状态
		router_city : "normal", //市局路由器状态
		cts_des : "及时-考核时段:【12:00,12:07】", //cts考核信息
		nation_des : "及时-考核时段:【12:00,12:07】", //国家局考核信息


		device: {
			newstation: {
				air_pressure: 'normal',
				wind_direction: 'normal',
				wind_speed: 'normal',
				rain_fan: 'normal',
				rain_chen: 'normal',
				evaporation: 'normal',
				newstation_visibility: 'normal',
				rain_wei: 'normal', collector: "normal",  temperature: "normal", humidity: "normal" 
			},
			pc: {
				status: 'normal',
				error_list: [
					'CPU使用率：100%'
				]
			},
			radiation: {
				status: 'normal'
			},
			visibility: {
				status: 'normal',
				error_list: [
					'接收机',
					'窗口污染',
					'发射机'
				]
			},
			weather: {
				status: 'normal'
			},
			temp: { //地温观测
				"status": "normal",
				"error_list": [
					"地温分采集器运行状态",
					"地温分采集器供电电压",
					"地温分采集器供电类型",
					"地温分采集器主板温度",
					"地温分采集器AD模块状态",
					"地温分采集器计数器模块状态"
				]
			}
		}
	},{
		station_name: '浦东',
		station_id: '58370',
		status: 'normal',
		transfer_status: 'normal',
		net_status: 'normal',
		device_status: 'normal',
		check_date_rate: '94',
		line_one_status: 'normal',
		line_two_status: 'normal',
		product_time: '2018-11-09 09时',
		cts_arrive_time: '2018-11-09 09:10:32',
		cts_send_time: '2018-11-09 09:11:32',
		station_ip: '10.228.12.34',
		cts_status: 'normal',

		// 新增字段
		router_conty: "normal", //区局路由器状态
		router_city : "normal", //市局路由器状态
		cts_des : "及时-考核时段:【12:00,12:07】", //cts考核信息
		nation_des : "及时-考核时段:【12:00,12:07】", //国家局考核信息


		device: {
			newstation: {
				air_pressure: 'normal',
				wind_direction: 'normal',
				wind_speed: 'normal',
				rain_fan: 'normal',
				rain_chen: 'normal',
				evaporation: 'normal',
				newstation_visibility: 'normal',
				rain_wei: 'normal', collector: "normal",  temperature: "normal", humidity: "normal" 
			},
			pc: {
				status: 'normal',
				error_list: [
					'CPU使用率：100%'
				]
			},
			radiation: {
				status: 'normal'
			},
			visibility: {
				status: 'normal',
				error_list: [
					'接收机',
					'窗口污染',
					'发射机'
				]
			},
			weather: {
				status: 'normal'
			},
			temp: { //地温观测
				"status": "normal",
				"error_list": [
					"地温分采集器运行状态",
					"地温分采集器供电电压",
					"地温分采集器供电类型",
					"地温分采集器主板温度",
					"地温分采集器AD模块状态",
					"地温分采集器计数器模块状态"
				]
			}
		}
	}, {
		station_name: '金山',
		station_id: '58460',
		status: 'normal',
		transfer_status: 'normal',
		net_status: 'normal',
		device_status: 'normal',
		check_date_rate: '94',
		line_one_status: 'normal',
		line_two_status: 'normal',
		product_time: '2018-11-09 09时',
		cts_arrive_time: '2018-11-09 09:10:32',
		cts_send_time: '2018-11-09 09:11:32',
		station_ip: '10.228.12.34',
		cts_status: 'normal',

		// 新增字段
		router_conty: "normal", //区局路由器状态
		router_city : "normal", //市局路由器状态
		cts_des : "及时-考核时段:【12:00,12:07】", //cts考核信息
		nation_des : "及时-考核时段:【12:00,12:07】", //国家局考核信息


		device: {
			newstation: {
				air_pressure: 'normal',
				wind_direction: 'normal',
				wind_speed: 'normal',
				rain_fan: 'normal',
				rain_chen: 'normal',
				evaporation: 'normal',
				newstation_visibility: 'normal',
				rain_wei: 'normal', collector: "normal",  temperature: "normal", humidity: "normal" 
			},
			pc: {
				status: 'normal',
				error_list: [
					'CPU使用率：100%'
				]
			},
			radiation: {
				status: 'normal'
			},
			visibility: {
				status: 'normal',
				error_list: [
					'接收机',
					'窗口污染',
					'发射机'
				]
			},
			weather: {
				status: 'normal'
			},
			temp: { //地温观测
				"status": "normal",
				"error_list": [
					"地温分采集器运行状态",
					"地温分采集器供电电压",
					"地温分采集器供电类型",
					"地温分采集器主板温度",
					"地温分采集器AD模块状态",
					"地温分采集器计数器模块状态"
				]
			}
		}
	},{
		station_name: '青浦',
		station_id: '58461',
		status: 'normal',
		transfer_status: 'normal',
		net_status: 'normal',
		device_status: 'normal',
		check_date_rate: '94',
		line_one_status: 'normal',
		line_two_status: 'normal',
		product_time: '2018-11-09 09时',
		cts_arrive_time: '2018-11-09 09:10:32',
		cts_send_time: '2018-11-09 09:11:32',
		station_ip: '10.228.12.34',
		cts_status: 'normal',

		// 新增字段
		router_conty: "normal", //区局路由器状态
		router_city : "normal", //市局路由器状态
		cts_des : "及时-考核时段:【12:00,12:07】", //cts考核信息
		nation_des : "及时-考核时段:【12:00,12:07】", //国家局考核信息


		device: {
			newstation: {
				air_pressure: 'normal',
				wind_direction: 'normal',
				wind_speed: 'normal',
				rain_fan: 'normal',
				rain_chen: 'normal',
				evaporation: 'normal',
				newstation_visibility: 'normal',
				rain_wei: 'normal', collector: "normal",  temperature: "normal", humidity: "normal" 
			},
			pc: {
				status: 'normal',
				error_list: [
					'CPU使用率：100%'
				]
			},
			radiation: {
				status: 'normal'
			},
			visibility: {
				status: 'normal',
				error_list: [
					'接收机',
					'窗口污染',
					'发射机'
				]
			},
			weather: {
				status: 'normal'
			},
			temp: { //地温观测
				"status": "normal",
				"error_list": [
					"地温分采集器运行状态",
					"地温分采集器供电电压",
					"地温分采集器供电类型",
					"地温分采集器主板温度",
					"地温分采集器AD模块状态",
					"地温分采集器计数器模块状态"
				]
			}
		}
	},{
		station_name: '松江',
		station_id: '58462',
		status: 'normal',
		transfer_status: 'normal',
		net_status: 'normal',
		device_status: 'normal',
		check_date_rate: '94',
		line_one_status: 'normal',
		line_two_status: 'normal',
		product_time: '2018-11-09 09时',
		cts_arrive_time: '2018-11-09 09:10:32',
		cts_send_time: '2018-11-09 09:11:32',
		station_ip: '10.228.12.34',
		cts_status: 'normal',

		// 新增字段
		router_conty: "normal", //区局路由器状态
		router_city : "normal", //市局路由器状态
		cts_des : "及时-考核时段:【12:00,12:07】", //cts考核信息
		nation_des : "及时-考核时段:【12:00,12:07】", //国家局考核信息


		device: {
			newstation: {
				air_pressure: 'normal',
				wind_direction: 'normal',
				wind_speed: 'normal',
				rain_fan: 'normal',
				rain_chen: 'normal',
				evaporation: 'normal',
				newstation_visibility: 'normal',
				rain_wei: 'normal', collector: "normal",  temperature: "normal", humidity: "normal" 
			},
			pc: {
				status: 'normal',
				error_list: [
					'CPU使用率：100%'
				],
				detail: []
			},
			radiation: {
				status: 'normal'
			},
			visibility: { 
				status: 'normal',
				error_list: [
					'接收机',
					'窗口污染',
					'发射机'
				],
				detail: []

			},
			weather: {
				status: 'normal',
				detail: []

			},
			temp: { //地温观测
				"status": "normal",
				"error_list": [
					"地温分采集器运行状态",
					"地温分采集器供电电压",
					"地温分采集器供电类型",
					"地温分采集器主板温度",
					"地温分采集器AD模块状态",
					"地温分采集器计数器模块状态"
				]
			}
		}
	},{
		station_name: '奉贤',
		station_id: '58463',
		status: 'normal',
		transfer_status: 'normal',
		net_status: 'normal',
		device_status: 'normal',
		check_date_rate: '94',
		line_one_status: 'normal',
		line_two_status: 'normal',
		product_time: '2018-11-09 09时',
		cts_arrive_time: '2018-11-09 09:10:32',
		cts_send_time: '2018-11-09 09:11:32',
		station_ip: '10.228.12.34',
		cts_status: 'normal',

		// 新增字段
		router_conty: "normal", //区局路由器状态
		router_city : "normal", //市局路由器状态
		cts_des : "及时-考核时段:【12:00,12:07】", //cts考核信息
		nation_des : "及时-考核时段:【12:00,12:07】", //国家局考核信息


		device: {
			newstation: {
				air_pressure: 'normal',
				wind_direction: 'normal',
				wind_speed: 'normal',
				rain_fan: 'normal',
				rain_chen: 'normal',
				evaporation: 'normal',
				newstation_visibility: 'normal',
				rain_wei: 'normal', collector: "normal",  temperature: "normal", humidity: "normal" 
			},
			pc: {
				status: 'normal',
				error_list: [
					'CPU使用率：100%'
				]
			},
			radiation: {
				status: 'normal'
			},
			visibility: {
				status: 'normal',
				error_list: [
					'接收机',
					'窗口污染',
					'发射机'
				]
			},
			weather: {
				status: 'normal'
			},
			temp: { //地温观测
				"status": "normal",
				"error_list": [
					"地温分采集器运行状态",
					"地温分采集器供电电压",
					"地温分采集器供电类型",
					"地温分采集器主板温度",
					"地温分采集器AD模块状态",
					"地温分采集器计数器模块状态"
				]
			}
		}
	},{
		station_name: '小洋山',
		station_id: '58474',
		status: 'normal',
		transfer_status: 'normal',
		net_status: 'normal',
		device_status: 'normal',
		check_date_rate: '94',
		line_one_status: 'normal',
		line_two_status: 'normal',
		product_time: '2018-11-09 09时',
		cts_arrive_time: '2018-11-09 09:10:32',
		cts_send_time: '2018-11-09 09:11:32',
		station_ip: '10.228.12.34',
		cts_status: 'normal',

		// 新增字段
		router_conty: "normal", //区局路由器状态
		router_city : "normal", //市局路由器状态
		cts_des : "及时-考核时段:【12:00,12:07】", //cts考核信息
		nation_des : "及时-考核时段:【12:00,12:07】", //国家局考核信息


		device: {
			newstation: {
				air_pressure: 'normal',
				wind_direction: 'normal',
				wind_speed: 'normal',
				rain_fan: 'normal',
				rain_chen: 'normal',
				evaporation: 'normal',
				newstation_visibility: 'normal',
				rain_wei: 'normal', collector: "normal",  temperature: "normal", humidity: "normal" 
			},
			pc: {
				status: 'normal',
				error_list: [
					'CPU使用率：100%'
				]
			},
			radiation: {
				status: 'normal'
			},
			visibility: {
				status: 'normal',
				error_list: [
					'接收机',
					'窗口污染',
					'发射机'
				]
			},
			weather: {
				status: 'normal'
			},
			temp: { //地温观测
				"status": "normal",
				"error_list": [
					"地温分采集器运行状态",
					"地温分采集器供电电压",
					"地温分采集器供电类型",
					"地温分采集器主板温度",
					"地温分采集器AD模块状态",
					"地温分采集器计数器模块状态"
				]
			}
		}
	}]
  let report = {
    in_time: 100,
    over_time: 0,
    not_send: 0,
    not_arrive: 0
  }

  return {
    station,
    report,
  };
});
