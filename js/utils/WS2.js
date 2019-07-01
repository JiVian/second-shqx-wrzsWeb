define(function (require) {
    let SockJS = require('sockjs');
    let Stomp = require('stomp');

    function WS(url) {
        let stompClient = null;

        let socket = new SockJS(url);
        stompClient = Stomp.over(socket);
        stompClient.reconnect_delay = 5000;
        return {
            stompClient: stompClient
        };
    }

    return WS;
});