<style scoped>
    .xh_top{
        border-bottom:1px solid #ccc;
        width:92%;
        font-size:0.32rem;
        background:white;
        padding:0.28rem 4%;
        margin-bottom:8px;
    }
    .xh_baom{
        color:#333;
        font-weight:600;
    }
    .xh_baom span{
        color:#666;
    }
    .xh_btoe{
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        background: white;
    }
    .xh_title{
        font-size: 0.36rem;
        color: #333;
        border-left: 3px solid #3fc371;
        width: 92%;
        margin: 10px auto;
    }
    .xh_img{overflow: hidden;padding: 10px 0;border-top: 1px solid #ccc;
    margin: 0 auto;width: 92%;border-bottom: 1px solid #ccc;}
    .xh_img_l{float: left;width: 1.6rem;height: 1.6rem;}
    .xh_img_l img{display: block;width: 100%;height: 100%;}
    .xh_img_r{overflow: hidden;padding-left: 5px;}
    .xh_img_r_t{font-size: 0.34rem;color: #333;line-height: 0.8rem;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
    .xh_img_r_b{font-size: 0.34rem;color: #666;line-height: 0.8rem;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
    .xh_img_m{overflow: hidden;font-size: 0.34rem;width: 92%;margin: 0 auto;line-height: 1rem;border-bottom: 1px solid #ccc;}
    .xh_img_m:last-child{border: none;}
    .xh_img_m_t{float: left;color: #333;width: 22%;  font-size: 0.32rem;}
    .xh_img_m_b{float: right; color: #666;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;width: 78%;text-align: right;font-size: 0.32rem;}
    .cg{color: #3fc371;font-weight: 600;}
    .marg{margin: 8px auto 1.2rem auto;}
    .bt1{border-bottom: 1px solid #ccc;}
    .wuto{width: auto;}
    .backzfb{background: url(../img/zfb.png) no-repeat center left;background-size: 0.8rem;padding-left: 1rem;}
    .backwx{background: url(../img/wx.png) no-repeat center left;background-size: 0.8rem;padding-left: 1rem;}
    .wy{  width: 0.56rem;
          height: 0.56rem;
          border: 1px solid #ccc;
          border-radius: 50%;
          display: block;
          margin-top: calc((1rem - 0.56rem)/2);
          box-sizing: border-box;}
    .ny{width: 0.36rem;height: 0.36rem;background: #3fc371;border-radius: 50%;display: block;position: relative;top: 0.08rem;left: 0.08rem;}
</style>
<template>
<div class="xh_top">
    <div class="xh_baom">报名人：<span v-text="data.username">-</span></div>
    <div class="xh_baom">电话：<span v-text="data.phone">-</span></div>
</div>
<div class="xh_btoe">
    <div class="xh_title">&nbsp;&nbsp;订单信息</div>
    <div class="xh_img">
        <div class="xh_img_l"><img :src="data.cover" alt=""></div>
        <div class="xh_img_r">
            <div class="xh_img_r_t" v-text="data.name">-</div>
            <div class="xh_img_r_b" v-text="data.type">-</div>
        </div>
    </div>
    <div class="xh_img_m">
        <div class="xh_img_m_t">活动地点</div>
        <div class="xh_img_m_b" v-text="data.address">-</div>
    </div>
    <div class="xh_img_m">
        <div class="xh_img_m_t">活动类型</div>
        <div class="xh_img_m_b" v-text="data.type">-</div>
    </div>
    <div class="xh_img_m">
        <div class="xh_img_m_t">活动时间</div>
        <div class="xh_img_m_b" v-text="data.time">-</div>
    </div>
    <div class="xh_img_m">
        <div class="xh_img_m_t">实际支付</div>
        <div class="xh_img_m_b"><span class="cg">{{data.price}}元</span></div>
    </div>
</div>
<div class="xh_btoe marg">
   <div class="bt1">       
        <div class="xh_title">&nbsp;&nbsp;选择支付方式</div>
   </div>
    <div class="xh_img_m" @click="toggle('alipay')">
        <div class="xh_img_m_t backzfb wuto">支付宝支付</div>
        <div class="xh_img_m_b wuto"><span class="wy"><i :class="{ny:isItem=='alipay'}"></i></span></div>
    </div>
    <div class="xh_img_m" @click="toggle('wxpay')">
        <div class="xh_img_m_t backwx wuto">微信支付</div>
        <div class="xh_img_m_b wuto"><span class="wy"><i :class="{ny:isItem=='wxpay'}"></i></span></div>
    </div>
</div>
<div class="formbtn" @click="goodsSubmit">确定</div>
</template>
<script>
    module.exports = {
        data: function() {
            return {
                isItem:'alipay',
                data:{
                    address: this.$route.query.address,
                    cover: this.$route.query.cover,
                    id: this.$route.query.id,
//                    name: this.$route.query.name,
                    name: this.$route.query.username,
                    organizers: this.$route.query.organizers,
                    phone: this.$route.query.phone,
                    price: this.$route.query.price,
                    time: this.$route.query.time,
                    type: this.$route.query.type,
                    username: this.$route.query.username,
                    matchId:this.$route.query.id,
                    trainingId:this.$route.query.id,
                    birth:this.$route.query.birth,
                    sex:this.$route.query.sex,
                    idCard:this.$route.query.idCard
                }
                
            }
        },
        ready: function() {
            document.title = '订单确认';
            console.log(this.$route)
        },
        beforeDestroy: function() {

        },
        methods: {
            toggle:function(i){
                this.isItem = i;
            },
            goodsSubmit: function(){
                let subtype = this.$route.query.subtype;
                var url = null;
                if(subtype == "game"){
                    url = "../AssociationAction!addMatchOrder.zk"
                }
                if(subtype == "choca"){
                    url = "../AssociationAction!addTrainingOrder.zk"
                }
                this.$http.post(url,this.data).then((res) => {
                    //server success show info
                    let result = JSON.parse(res.body);
                    if(result.STATUS){
                        var orderId = result.orderId;
                        zkPay(orderId,this.isItem)
                    }else{
                        alert(result.INFO)
                    }
                }, (err) => { //server err show info!!!
                    console.log(err);
                });
            }
        }
    }
    function zkPay(id,type) {
        if (!window.WebViewJavascriptBridge) {
            return false;
        }
        window.WebViewJavascriptBridge.callHandler('zkPay', {onLinePayId:id,payType:type},
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
                'Javascript Responds': 'backBefore'
            };
            responseCallback(data);
        });
         bridge.registerHandler('zkPaySuccess',function(data, responseCallback) { 
            if(data == "success"){
                window.location.href = "http://"+window.location.host+"/fatburn/entrance/index.html#!/success";
            }
            responseCallback(data);
        });    

    });
</script>
