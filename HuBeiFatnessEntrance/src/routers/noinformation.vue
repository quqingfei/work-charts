<style scoped>
.center {
  position: fixed;
  top: 50%;
  left: 50%;
  width:50%;
  margin-top: -3rem;
  margin-left: -3rem;
}
    .center img{width: 6rem;}
</style>
<template>

    <div class="center" v-if="message==1"><img :src="hy" alt=""></div>
    <div class="center" v-if="message==0"><img :src="ss" alt=""></div>

</template>
<script>
    module.exports = {
        data: function() {
            return {
                hy:'./img/hyerrer.png',
                ss:'./img/sserrer.png',
                message:0
            }
        },
        ready: function() {
            document.title = '未报名';
            if(this.$route.query.message==0){
                this.message = 1
            }else{
                this.message = 0
            }
        },
        beforeDestroy: function() {
            
        },
        methods: {
            
        }
    }
</script>
