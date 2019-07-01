(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.WSFactory = factory();
    }
})(this, function() {
    var pageList = [
        ['detect','ctsCmacast','infoFlow','netAndAlarm'],
        ['sod','cimissSum','resourcePool1','resourcePool2'],
        ['machineRoom','ups','netMain','netSecurity'],
    ]

    function getCurrentPageIndex() {
        var currentPage = window.location.pathname.split('/').reverse()[1];
        for (var i = 0; i < pageList.length; i++) {
            for (var j = 0; j < pageList[i].length; j++) {
                if (pageList[i][j].indexOf(currentPage) !== -1) {
                    return j;
                }
            }
        }
    }

    function WS(target) {
        this.target = target;
        this.connect = null;
        this.retryTimeLeft = 3;
        this.startup();
    }
    WS.prototype.startup = function () {
        this.connect = new WebSocket(this.target);

        this.connect.addEventListener('open', e => {
            console.log(e);
            this.retryTimeLeft = 3;
        })
        /* this.connect.addEventListener('message', e => {
        		console.log("ws-message:" + e);
            if (e.data) {
                var res = JSON.parse(e.data).data;
				if(res!=null){
					if (res.changePage && (typeof res.page === 'number') && (res.page % 1 === 0) && (res.page <= pageList.length)) {
						window.location.href = '../' + pageList[res.page - 1][getCurrentPageIndex()] + '/page.html'
					}
				}
                
            }
        }) */
        this.connect.addEventListener('close', e => {
            console.log(e);
            //设置断线重连时间间隔
            setTimeout(() => {
                this.reconnect()
            }, 1 * 1000 * 60)
        })
        this.connect.addEventListener('error', e => {
            console.log(e);
        })
    }

    WS.prototype.reconnect = function () {
        this.retryTimeLeft--;
        if (this.retryTimeLeft > 0) {
            this.startup();
        } else {
            console.log('网络连接失败，请检查服务是否异常');
            this.connect = null;
        }
    }
    WS.prototype.send = function (data) {
        this.connect.send(data)
    }

    return WS;
});