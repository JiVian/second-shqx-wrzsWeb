define(function(require) {
    let $ = require("jquery"),
      Vue = require("vue");
    let laydate = require("laydate");
    let serverPath = require("utils/serverPath");
    

        let vm = new Vue({
            el: "#app",
            data: {

            },
            created() {
                $.get(serverPath.page1 + "/faultStatistics/", function(result){
                    console.log(111)
                    console.log(JSON.parse(result))
                });
                
            },
            computed: {
            },
            mounted() {
                // this.getStart();
            },
            methods: {
                
            }
          });
        
  });
  