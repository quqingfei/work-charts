<style scoped>
  
</style>
<template>
     <div class="menu">
        <ul>
            <li class="item" ><a v-link="{path: '/index'}">赛事活动</a></li>
            <li><a v-link="{path: '/choca'}">行业培训</a></li>
            <li><a v-link="{path: '/news'}">行业资讯</a></li>
            <li><a v-link="{path: '/join'}">我参与的</a></li>
        </ul>
    </div>
  <div class="hsduo" ref="index">
            <ul>
                <li v-link="{path: '/detial', query:{id: todo.matchId,type:'game'}}" v-for="todo in todos">
                    <div  v-if="todo.isShowApp=='y'" class="bg" v-bind:style="{ background:'url(../file/FileCenter!showImage2.zk?name='+todo.cover+') no-repeat center', backgroundSize: 'cover' }">
                        <div class="bga" v-text="todo.name">-</div>
                        <div class="bgb">主办方：{{todo.organizers}}</div>
                        <div class="bgc">报名人数：{{todo.totalUser}}</div>
                        <div class="ealy" v-show="todo.isJoin=='y'"><img src="../img/elay.png" alt=""></div>
                        <div class="hot" v-show="todo.isHot=='y'"><img src="../img/ishot.png" alt=""></div>
                        <div class="price">{{todo.price}}元</div>
                    </div>
                </li>
            </ul>
        </div>
</template>
<script>
    module.exports = {
        data: function() {
            return {
                todos:[]
            }
        },
        ready: function() {
        document.title = '湖北省健身健美运动协会';
            var self = this;
           var s=setInterval(function(){
               console.log(getSignData())
                if(getSignData()){
                     self.$http.post('../fatburn/ScoreAction!checkSign.zk',{sign:getSignData()}).then((res) => {
                        //server success show info
                        let result = JSON.parse(res.body);
                        if(result.STATUS){
                            self.$http.post('../AssociationAction!matchList.zk').then((res) => {
                                //server success show info
                                let result = JSON.parse(res.body);
                                if(result.STATUS){
                                    self.todos = result.rows;
                                }

                            }, (err) => { //server err show info!!!
                                console.log(err);
                            });
                        }
                    }, (err) => { //server err show info!!!
                        console.log(err);
                    });
                    clearInterval(s);
                }
            },100) 
        },
        beforeDestroy: function() {
            
        },
        methods: {
                
        }
    }
</script>
