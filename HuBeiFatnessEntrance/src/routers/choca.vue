<style scoped>
  
</style>
<template>
  <div class="menu">
        <ul>
            <li><a v-link="{path: '/index'}">赛事活动</a></li>
            <li class="item" ><a v-link="{path: '/choca'}">行业培训</a></li>
            <li><a v-link="{path: '/news'}">行业资讯</a></li>
            <li><a v-link="{path: '/join'}">我参与的</a></li>
        </ul>
    </div>
  <div class="hsduo">
            <ul>
               <!-- <li v-link="{path: '/detial'}">
                    <div class="bg" style="background:url(./img/back.png) no-repeat center;  background-size: cover;">
                        <div class="bga">健身健美大赛</div>
                        <div class="bgb">主办方：zk智能健身中心</div>
                        <div class="bgc">报名人数：107</div>
                        <div class="ealy"><img src="../img/elay.png" alt=""></div>
                        <div class="hot"><img src="../img/ishot.png" alt=""></div>
                        <div class="price">100元</div>
                    </div>
                </li>-->
              <li v-link="{path: '/detial', query:{id: todo.trainingId,type:'choca'}}" v-for="todo in todos">
                    <div v-if="todo.isShowApp=='y'" class="bg" v-bind:style="{ background:'url(../file/FileCenter!showImage2.zk?name='+todo.cover+') no-repeat center', backgroundSize: 'cover' }">
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
            this.$http.post('../AssociationAction!trainingList.zk').then((res) => {
                //server success show info
                let result = JSON.parse(res.body);
                console.log(result)
                if(result.STATUS){
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
