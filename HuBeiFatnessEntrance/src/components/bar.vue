<style scoped>

</style>
<template>
     <div class="menu">
        <ul>
            <li :class="{ item: isItem==1 }" @click="itemClick(1)"><a v-link="{path: '/index'}">赛事活动</a></li>
            <li :class="{ item: isItem==2 }" @click="itemClick(2)"><a v-link="{path: '/choca'}">行业培训</a></li>
            <li :class="{ item: isItem==3 }" @click="itemClick(3)"><a v-link="{path: '/news'}">行业资讯</a></li>
            <li :class="{ item: isItem==4 }" @click="itemClick(4)"><a v-link="{path: '/join'}">我参与的</a></li>
        </ul>
    </div>
</template>
<script>
  module.exports = {
        data: function() {
            return {
                isItem:1
            }
        },
        ready: function() {
            
        },
        beforeDestroy: function() {
            
        },
        methods: {
            itemClick: function(index){
                console.log(index)
                switch(index){
                    case 1: this.isItem = 1;break;
                    case 2: this.isItem = 2;break;
                    case 3: this.isItem = 3;break;
                    case 4: this.isItem = 4;break;
                    default: this.isItem = 1;
                }
            }
        }
    }
</script>
