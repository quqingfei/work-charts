<style scoped>
  
</style>
<template>
   <div class="menu">
        <ul>
            <li><a v-link="{path: '/index'}">赛事活动</a></li>
            <li><a v-link="{path: '/choca'}">行业培训</a></li>
            <li class="item" ><a v-link="{path: '/news'}">行业资讯</a></li>
            <li><a v-link="{path: '/join'}">我参与的</a></li>
        </ul>
    </div>
  <div class="hsduo" id="hsduo">
                <div class="news" v-bind:style="{background:'url('+aticleItem[0].icon+') no-repeat center', backgroundSize: 'cover' }"  v-link="{path: '/aticle', query:{id: aticleItem[0].item}}">
                    <div class="sermer">{{aticleItem[0].subject}}</div>
                </div>  
                <div class="newstow">
                    <div class="newstow_a" v-link="{path: '/aticle', query:{id:aticleItem[1].item}}">
                        <div class="newsshow">{{aticleItem[1].subject}}<div class="date">{{aticleItem[1].gmtModify}}</div></div>
                    </div>
                    <div class="newstow_a" v-link="{path: '/aticle', query:{id:aticleItem[3].item}}">
                        <div class="newsshow">{{aticleItem[3].subject}}<div class="date">{{aticleItem[3].gmtModify}}</div></div>
                    </div>
                </div>
                <div class="newstow">
                    <div class="newstow_b" v-link="{path: '/aticle', query:{id:aticleItem[2].item}}">
                        <div class="newsshow">{{aticleItem[2].subject}}<div class="date">{{aticleItem[2].gmtModify}}</div></div>

                    </div>
                    <div class="newstow_b" v-link="{path: '/aticle', query:{id:aticleItem[4].item}}">
                        <div class="newsshow">{{aticleItem[4].subject}}<div class="date">{{aticleItem[4].gmtModify}}</div></div>
                    </div>
                </div>
                <div class="newsthree" v-link="{path: '/aticle', query:{id:aticleItem[5].item}}">
                    <div class="newsshow">{{aticleItem[5].subject}}<div class="date">{{aticleItem[5].gmtModify}}</div></div>
                </div>         
        </ul>
    </div>
</template>
<script>
    
    function newDate(time){
        var times = new Date(time);
        var year = times.getFullYear();
        var month = times.getMonth()+1>10?times.getMonth()+1:"0"+times.getMonth()+1;
        var day = times.getDate()>10?times.getDate():"0"+times.getDate();
       return year+"/"+month+"/"+day;
    }
    function stinge(string,length){
        return string.length>length? string.substr(0,length)+"..." : string;
    }
    var pageIndex = 1;
    module.exports = {
        data: function() {
            return {
                aticleItem:[],
                pageSize:6,
                pageIndex:1
            }
        },
        ready: function() {
            document.title = '湖北省健身健美运动协会';
            this.$nextTick(function () {
                this.touchUp(this);
                this.touch(this)
            })
        },
        beforeDestroy: function() {
                
        },
        methods: {
            touch: function(v){               
                    v.$http.post('../AssociationAction!activityList.zk',{pageSize:this.pageSize,pageIndex:pageIndex}).then((res) => {
                    //server success show info
                    let result = JSON.parse(res.body);
                    if(result.STATUS){
                        let results = result.rows;
                        if(results.length<=0){
                            pageIndex--;
                            console.log("dd！"+pageIndex)
                            return false;
                        }
                        this.aticleItem = [];
                        for(let i=0;i<results.length;i++){
                            this.aticleItem.push({
                                item:results[i].id,                        
                                icon:"../file/FileCenter!showImage2.zk?name="+results[i].icon,   
                                subject:stinge(results[i].subject,24),
                                gmtModify: newDate(results[i].gmtModify)
                            })
                        }
                    }else{
                        alert(result.INFO);
                    }
                }, (err) => { //server err show info!!!
                    console.log(err);
                });             
            },
            touchUp: function(v){
                
                var startx, starty;
                var el = document.getElementById('hsduo');
                //获得角度
                function getAngle(angx, angy) {
                    return Math.atan2(angy, angx) * 180 / Math.PI;
                };

                //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
                function getDirection(startx, starty, endx, endy) {
                    var angx = endx - startx;
                    var angy = endy - starty;
                    var result = 0;

                    //如果滑动距离太短
                    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
                        return result;
                    }

                    var angle = getAngle(angx, angy);
                    if (angle >= -135 && angle <= -45) {
                        result = 1;
                    } else if (angle > 45 && angle < 135) {
                        result = 2;
                    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                        result = 3;
                    } else if (angle >= -45 && angle <= 45) {
                        result = 4;
                    }

                    return result;
                }
                //手指接触屏幕
                el.addEventListener("touchstart", function(e) {
                    startx = e.touches[0].pageX;
                    starty = e.touches[0].pageY;
                }, false);
                //手指离开屏幕
                el.addEventListener("touchend", function(e) {
                    var endx, endy;
                    endx = e.changedTouches[0].pageX;
                    endy = e.changedTouches[0].pageY;
                    var direction = getDirection(startx, starty, endx, endy);
                    switch (direction) {
                        case 0:
                            console.log("未滑动！");
                            break;
                        case 1:
                            pageIndex++;
                            v.touch(v);
                            console.log("向上！"+pageIndex)
                            break;
                        case 2:
                            console.log("向下！"+pageIndex)
                            if(pageIndex<=1){
                                return false;
                            }else{
                                pageIndex--;
                                v.touch(v);
                            }                            
                            break;
                        case 3:
                            console.log("向左！")
                            break;
                        case 4:
                            console.log("向右！")
                            break;
                        default:
                    }
                }, false);
            }
        }        
    }
  
  
</script>
