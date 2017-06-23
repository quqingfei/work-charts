<style scoped>
    small{color: crimson;}
</style>
<template>
    <div class="serred">
        <div class="truess">
            <div class="truessn">真实姓名：</div>
            <div class="truessinput"><input v-model.trim="name" class="input" type="text" placeholder="请输入您的真实姓名"></div>
        </div>
        <div class="truess">
            <div class="truessn">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</div>
            <div class="truessinput">
                <select name="" id="" v-model="sex">
                    <option value="M">男</option>
                    <option value="F">女</option>
                </select>
            </div>
        </div>
        <div class="truess">
            <div class="truessn">出生年月：</div>
            <div class="truessinput">
            <input v-model.trim="year" class="inpu wid30" type="number" placeholder="" @keyup="testYear"><span>年</span>
            <input v-model.trim="month" class="inpu wid20" type="number" placeholder="" @keyup="testMonth"><span>月</span>
            <input v-model.trim="day" class="inpu wid20" type="number" placeholder="" @keyup="testDay"><span>日</span>
            <small v-text="title"></small>
            </div>
        </div>
        <div class="truess">
            <div class="truessn">身份证号：</div>
            <div class="truessinput"><input v-model.trim="idCard" class="input" type="text" placeholder="请输入您的身份证"></div>
        </div>
        <div class="truess">
            <div class="truessn">手机号码：</div>
            <div class="truessinput"><input v-model.trim="phone" class="input" type="text" placeholder="请输入您的手机号码"></div>
        </div>
    </div>
    <div class="formbtn" @click="submit">确定</div>
</template>
<script>
    module.exports = {
        data: function() {
            return {
                matchId: this.$route.query.id,
                name:"",
                year:"",
                month:"",
                day:"",
                sex:"M",
                idCard:"",
                phone:"",
                title:"",
                zhengshu:/^[1-9]\d*$/,
                phoneRegex : /^1[34578]\d{9}$/,
                idCardRegex : /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|[X,x,Y,y,Z,z])$/,
                datas:this.$route.query
            }
        },
        computed: {
            birth: function(){
                let month = Number(this.month)>=10?this.month:'0'+Number(this.month);
                let day = Number(this.day)>=10?this.day:'0'+Number(this.day);
                return this.year+"-"+month+"-"+day;
            }
        },
        ready: function() {
            document.title = '填写报名信息';
            console.log(this.$route.query.id);
        },
        beforeDestroy: function() {

        },
        methods: {
            submit: function(){
                if(this.name==""){
                    alert("请输入姓名！");
                    return false;
                }
                if(this.year==""){
                    alert("请输入出生年！");
                    return false;
                }
                if(this.month==""){
                    alert("请输入出生月！");
                    return false;
                }
                if(this.day==""){
                    alert("请输入出生日！");
                    return false;
                }
                if(!this.idCardRegex.test(this.idCard)){
                    alert("请输入正确的身份证号码！");
                    return false;
                }
                if(!this.phoneRegex.test(this.phone)){
                    alert("请输入正确的手机号码！");
                    return false;
                }
                if(this.idCard.substr(6,4) != this.year){
                    alert("所填年份与身份证号码不符！");
                    return false;
                }
                var c = Number(this.idCard.substr(10,2));
                if(Number(c) != this.month){
                    alert("所填月份与身份证号码不符！");
                    return false;
                }
                var s = Number(this.idCard.substr(12,2));
                if(s != this.day){
                    alert("所填日期与身份证号码不符！");
                    return false;
                }
/*                let data = {
                    matchId:this.matchId,
                    name:this.name,
                    birth:this.birth,
                    sex:this.sex,
                    idCard:this.idCard,
                    phone:this.phone
                }; */
                    this.datas.matchId=this.matchId,
                    this.datas.username=this.name,
                    this.datas.birth=this.birth,
                    this.datas.sex=this.sex,
                    this.datas.idCard=this.idCard,
                    this.datas.phone=this.phone
                
                const router = this.$router;
                router.go({path:'/goods',query:this.datas});
            },
            testYear: function(){                
                if(this.year.length>4){
                    this.title = "年份长度不得超过4位！";
                    return false;
                }
                if(this.year.length<=4){
                    this.title = "";
                    return false;
                }              
            },
            testMonth: function(){
                
                if(this.month.length>2){
                    this.title = "月份长度不得超过2位！";
                    return false;
                }
                if(this.month>12 || this.month<0){
                    this.title = "请输入正确月份！";
                    return false;
                }                
                if(this.month.length<=2){
                    this.title = "";
                    return false;
                }
            },
            testDay: function(){
                if(this.day.length>2){
                    this.title = "日期长度不得超过2位！";
                    return false;
                }
                if(this.day>31 || this.day<0){
                    this.title = "请输入正确日期！";
                    return false;
                }
                if(this.day.length<=2){
                    this.title = "";
                    return false;
                }
            }
        }
    }
</script>
