(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.serverPath = factory();
    }
})(this, function () {
    return {
//        page: 'ws://localhost:8082',
//        page1: 'http://localhost:8082',
//        pageChanging: 'ws://localhost:8082/reverse'
    	 page: 'ws://192.168.0.148:8082',
         page1: 'http://192.168.0.119:8082',
         pageChanging: 'ws://10.208.6.223:8082/reverse'
    }
})
