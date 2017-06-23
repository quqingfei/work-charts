<style scoped>
    #aticlepage{
        width:100vw;
        height:98vh;
    }
</style>
<template>
   <div class="baomin">
    <div v-show="!aticleId" style="font-size:0.4rem;line-height:100vh;text-align:center;color:#999;text-shadow: 1px 1px 0px #fff;"> 本文章没有任何内容 </div>
    <iframe v-show="aticleId" id="aticlepage" :src="aticleId" frameborder="0"></iframe>
</template>
<script>
    module.exports = {
        data: function() {
            return {
                
            }
        },
        computed: {
            aticleId: function(){
                if(typeof(this.$route.query.id) == "undefined"){
                    return false;
                }
                return "http://"+window.location.host+"/fatburn/articleAction!pullById.zk?id="+this.$route.query.id;
            }
        },
        ready: function() {
            document.title = '资讯详情';
        },
        beforeDestroy: function() {
            
        },
        methods: {
            
        }
    }
</script>
