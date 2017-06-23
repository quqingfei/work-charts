<style scoped>
  
</style>
<template>

</template>
<script>
    module.exports = {
        data: function() {
            
        },
        ready: function() {
            alert(getSignData());
             if(getSignData()){
                const router = this.$router;
                router.go({path:'/index'});
             }
        },
        beforeDestroy: function() {

        },
        methods: {
            
        }
    }
     function getSignData() {
        if (!window.WebViewJavascriptBridge) {
            return false;
        }
        window.WebViewJavascriptBridge.callHandler('getSign', {},
            function(responseData) {
                deviceData = responseData;
            });
            return deviceData;
    }
    function connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge);
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function() {
                callback(WebViewJavascriptBridge);
            }, false);
        }
    }
    connectWebViewJavascriptBridge(function(bridge) {
        // 初始化
        bridge.init(function(message, responseCallback) {
            var data = {
                'Javascript Responds': 'backApp'
            };
            responseCallback(data);
        });
        // oc调用js方法
        bridge.registerHandler('zkBackEvent',function(data, responseCallback) {
            var responseData = '';
            responseCallback(responseData);
        }); 
        bridge.registerHandler('readyBack',function(data, responseCallback) {
            readyBack();
            var responseData = {
                'Javascript Says': 'readBack!'
            };
            responseCallback(responseData);
        });    

    });
</script>
