<style scoped>
    .tb1 img{width:100%;}
</style>
<template>
   <div class="baomin">
       <div class="list">
          <div class="bax"><img :src="cover" alt=""></div>
            <div class="baxa">
                <div class="baxb">{{name}}</div>
                <div class="baxc">活动地点：{{address}}</div>
                <div class="baxc">活动类型：{{type}}</div>
                <div class="baxc">活动时间：{{time}}</div>
            </div> 
       </div>
        <div class="list tb1" v-html="introduce">
            
       
        </div>
    <div class="gobm">
           <div class="gobml">赛事价格：<span class="fisi">￥{{price}}</span>元</div>
           <div class="gobmr pass" v-link="{path: '/form',query:data}" v-if="isJoin=='n'">我要报名</div>
           <div class="gobmr unpass" v-if="isJoin=='y'">已报名</div>
           <div class="gobmr unpass" v-if="isJoin=='s'">我要报名</div>
    </div>
</template>
<script>
    module.exports = {
        data: function() {
            return {
                introduce:null,
                cover:'',
                address:'-',
                name:'-',
                organizers:'-',
                time:'-',
                type:'-',
                price:'-',
                isJoin:'',
                id:'',
                data:{}
            }
        },
        ready: function() {
            if(typeof(this.$route.query.id) == "undefined"){
                this.isJoin = "s";
                return false;
            }
            var url = null;
            if(this.$route.query.type == "game"){
                url = "../AssociationAction!matchInfo.zk?id=";
                this.data.subtype = "game";
                document.title = '赛事详情';
            }
            if(this.$route.query.type == "choca"){
                url = "../AssociationAction!trainingInfo.zk?id=";
                this.data.subtype = "choca";
                document.title = '培训详情';
            }
            this.$http.post(url+this.$route.query.id).then((res) => {
                //server success show info
                let result = JSON.parse(res.body);
                if(result.STATUS){
                    let results = result.rows;
                    this.isJoin = result.isJoin;
                    this.introduce = results.introduce;
                    this.cover = "../file/FileCenter!showImage2.zk?name="+results.cover;
                    this.address = results.address;
                    this.name = results.name;
                    this.organizers = results.organizers;
//                    this.time = results.time;
                    this.time = results.time.substr(0,10);
                    this.type = results.type;
                    this.price = results.price;
                    this.id = results.id;
                    //xincan
                        this.data.cover = this.cover
                        this.data.address=this.address
                        this.data.name=this.name
                        this.data.organizers=this.organizers
                        this.data.time=this.time
                        this.data.type=this.type
                        this.data.price=this.price
                        this.data.id=this.id

                }else{
                    alert(result.INFO);
                }
            }, (err) => { //server err show info!!!
                console.log(err);
            });  
        },
        beforeDestroy: function() {

        },
        methods: {
            
        }
    }
</script>
