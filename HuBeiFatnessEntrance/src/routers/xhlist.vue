<style scoped>
    .xh_list{background:white;border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;margin-bottom: 8px;}
 .xh_img{overflow: hidden;padding: 10px 0;
    margin: 0 auto;width: 92%;background: url(../img/right.png) no-repeat center right;background-size: 12px;}
    .xh_img_l{float: left;width: 1.4rem;height: 1.4rem;}
    .xh_img_l img{display: block;width: 100%;height: 100%;}
    .xh_img_r{overflow: hidden;padding-left: 5px;}
    .xh_img_r_t{font-size: 0.34rem;color: #333;line-height: 0.7rem;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
    .xh_img_r_b{font-size: 0.34rem;color: #666;line-height: 0.7rem;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
    .xh_ealyed{color: #3fc371;}
    .xh_ealying{color: #6bc3f3;}    
    .xh_ealyerr{color: #ff4d40;}
</style>
<template>
   <div v-for="todo in todos" class="xh_list" v-link="{path: todo.checkStatus==2?'/faild':'/detial', query:{id:type=='game'?todo.matchId:todo.trainingId,type:type}}">
    <div class="xh_img">
        <div class="xh_img_l"><img :src="imgurl+todo.cover" alt=""></div>
        <div class="xh_img_r">
            <div class="xh_img_r_t" v-text="todo.name">-</div>
            <div class="xh_img_r_b" >{{todo.type}}
            <span class="xh_ealyed" v-if="todo.checkStatus==1">&nbsp;&nbsp;(已审核)</span>
            <span class="xh_ealying" v-if="todo.checkStatus==0">&nbsp;&nbsp;(审核中)</span>
            <span class="xh_ealyerr" v-if="todo.checkStatus==2">&nbsp;&nbsp;(未通过)</span>
            </div>
        </div>
    </div>
    </div>

</template>
<script>
    module.exports = {
        data: function() {
            return {
                todos:[],
                imgurl:"../file/FileCenter!showImage2.zk?name=",
                type:this.$route.query.message==1?"game":"choca"
            }
        },
        ready: function() {
            console.log(this.$route.query.message)//message:1  => 赛事活动; 0 => 行业培训
            var url = null;
            if(this.$route.query.message == 1){
                url = "../AssociationAction!myJoinMatchInfo.zk";
                document.title = '赛事活动(已报名)';
            }
            if(this.$route.query.message == 0){
                url = "../AssociationAction!myJoinTrainingInfo.zk"; 
                document.title = '行业培训(已报名)';
            }
            this.$http.post(url).then((res) => {
                //server success show info
                let result = JSON.parse(res.body);
                if(result.STATUS){
                    console.log(result);
                    this.todos = result.rows;
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
