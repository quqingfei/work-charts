<style scoped>
  
</style>
<template>
    <div class="menu">
        <ul>
            <li><a v-link="{path: '/index'}">赛事活动</a></li>
            <li><a v-link="{path: '/choca'}">行业培训</a></li>
            <li><a v-link="{path: '/news'}">行业资讯</a></li>
            <li class="item"><a v-link="{path: '/join'}">我参与的</a></li>
        </ul>
    </div>
    <div class="hsduo">
        <ul class="msis">
            <li v-if="matchCount!=0" v-link="{path: '/xhlist', query:{message:1}}">
                <div class="canyu">
                    <div class="serd">赛事活动 <span class="seur" v-if="matchCount!=0">({{matchCount}})</span></div>
                </div>
            </li>
            <li v-if="matchCount==0" v-link="{path: '/noinformation', query:{message:1}}">
                <div class="canyu">
                    <div class="serd">赛事活动 <span class="seur" v-if="matchCount!=0">({{matchCount}})</span></div>
                </div>
            </li> 
             <li v-if="trainingCount!=0" v-link="{path: '/xhlist', query:{message:0}}">
                <div class="canyu">
                    <div class="serd">行业培训 <span class="seur" v-if="trainingCount!=0">({{trainingCount}})</span></div>
                </div>
            </li>
            <li v-if="trainingCount==0" v-link="{path: '/noinformation', query:{message:0}}">
                <div class="canyu">
                    <div class="serd">行业培训 <span class="seur" v-if="trainingCount!=0">({{trainingCount}})</span></div>
                </div>
            </li>              
        </ul>
    </div>
</template>
<script>
    module.exports = {
        data: function() {
            return {
                matchCount:0,
                trainingCount:0
            }
        },
        ready: function() {
            document.title = '湖北省健身健美运动协会';
            this.$http.post('../AssociationAction!myJoin.zk').then((res) => {
                //server success show info
                let result = JSON.parse(res.body);
                if(result.STATUS){
                    this.matchCount = result.rows.matchCount;
                    this.trainingCount = result.rows.trainingCount;
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
