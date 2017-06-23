$(document).ready(function(){ 
$(window).resize(function () {  
    htmlfont();
})
function htmlfont(){
    var sw = $(window).width();
                if(sw>640){
                    sw = 640;
                }
    $("html").css("font-size",sw/1080*32.8125+"px");
}
htmlfont();
    
     // 获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); // 匹配目标参数
    if (r != null)
        return unescape(r[2]);
    return null; // 返回参数值
}
    //保留两位小数，有小数时保留。没小数是就显示原数字
function toDecimal(x) { 
  var f = parseFloat(x); 
  if (isNaN(f)) { 
    return; 
  } 
  f = Math.round(x*100)/100; 
  return f; 
} 
function geturl(url){
     return "http://"+window.location.host+'/fatburn/bodyExam/employeePhoneRecord.html?id='+url;
}    
    
$('.ranktopmune .ranktopmune_item').click(function(){
    $('.swiper-slide').hide().show(200);
   /* $('.rankitem').removeClass('rankitem');
    $(this).addClass('rankitem');*/
})

var vm = new Vue({
    el: '#rakl',
    data:{
        baseUrl: '../file/FileCenter!showImage2.zk?name=',
        fatburnData: '',
        sign: '',
        pop: '',
        firstName:'',
        firstImg:'',
        firstKcal:'',
        firstSex: '',
        secondName:'',
        secondImg:'',
        secondKcal:'',
        secondSex: '',
        thridName:'',
        thridImg:'',
        thridKcal:'',
        thridSex: '',
        meName:'',
        meImg:'',
        meKcal:'',
        meSex: '',
        merank:'',
        todos: []
    },
    methods:{
         ajaxs: function(type,unit,userid){
            $.ajax({
                type: 'post',
                data: {userId:userid,type: type,pageSize:100,pageIndex:1},
                dataType: 'json',
                url:'../fatburn/RankListAction!list.zk',
                success: function(data){
                    if(data.STATUS){
//                    vm.$data.todos = [];
                    /*$('.swiper-container').html("");
                    $('.swiper-container').append('<div class="swiper-wrapper"><div class="swiper-slide">\
                        <ul class="ukl" id="lis">\
                            <li v-for="todo in todos">\
                                <div class="muns" v-text="todo.rank"></div>\
                                <div class="imgs"><img v-if="todo.sex=="F"" class="nv_border" :src="todo.headIcon"><img v-else class="nan_border" :src="todo.headIcon"></div>\
                                <div class="niname" v-text="todo.userName">-</div>\
                                <div class="xiaoh"><span v-text="todo.rankValue"></span></div>\
                            </li></ul>\
                    </div></div>')*/
                    if(userid){
                        if(data.rankLists.length==0){
                            vm.$data.meName = "";
                        }else{
                            vm.$data.meName = data.rankLists[0].userName;
                            vm.$data.meImg = vm.$data.baseUrl+data.rankLists[0].headIcon;
                            vm.$data.meKcal = toDecimal(data.rankLists[0].rankValue)+unit;
                            vm.$data.meSex = data.rankLists[0].sex;
                            vm.$data.merank = data.rankLists[0].rank;
                        }
//                        return false;
                        
                    }else{  

                            $.each(data.rankLists, function(index,item){
                                if(item.rank>3){                            
                                    vm.$data.todos.push({
                                        rank:item.rank,
                                        sex: item.sex,
                                        rankValue: toDecimal(item.rankValue)+unit,
                                        userName: item.userName,
                                        headIcon: vm.$data.baseUrl+item.headIcon
                                    });
                                }
                                if(item.rank == 1){
                                        vm.$data.firstName = item.userName;
                                        vm.$data.firstImg = vm.$data.baseUrl+item.headIcon;
                                        vm.$data.firstKcal = toDecimal(item.rankValue)+unit;
                                        vm.$data.firstSex = item.sex;
                                }
                                if(item.rank == 2){
                                        vm.$data.secondName = item.userName;
                                        vm.$data.secondImg = vm.$data.baseUrl+item.headIcon;
                                        vm.$data.secondKcal = toDecimal(item.rankValue)+unit;
                                        vm.$data.secondSex = item.sex;
                                }
                                if(item.rank == 3){
                                        vm.$data.thridName = item.userName;
                                        vm.$data.thridImg = vm.$data.baseUrl+item.headIcon;
                                        vm.$data.thridKcal = toDecimal(item.rankValue)+unit;
                                        vm.$data.thridSex = item.sex;
                                }

                                /*$('#lis').append('<li>\
                                    <div class="muns">'+item.rank+'</div>\
                                    <div class="imgs"><img class="nv_border" src='+vm.$data.baseUrl+item.headIcon+'></div>\
                                    <div class="niname">'+item.userName+'</div>\
                                    <div class="xiaoh"><span>'+item.rankValue.toFixed(2)+'</span>大卡</div>\
                                </li>') */
                            }) 
                    }
                    //DOM树渲染完成后执行
                    vm.$nextTick(function () {
                        var swiper = new Swiper('.swiper-container', {
//                            scrollbar: '.swiper-scrollbar',
                            direction: 'vertical',
                            slidesPerView: 'auto',
                            mousewheelControl: true,
                            freeMode: true
                        });

                        
                    })
                    $('.swiper-wrapper').css({transform:"translate3d(0px, 0px, 0px)","transition-duration": "100ms"});
                    $('.swiper-scrollbar').css({opacity: 0, display: "block"});    
                    }else{
                        alert(data.INFO)
                    }
                }
            })
        },
        fatburnView: function(){
              return false;           
        },
        signView: function(){
              window.location.href = 'ranklistsign.html?userId='+getUrlParam('userId')        
        },
        hotView: function(){
              window.location.href = 'ranklisthot.html?userId='+getUrlParam('userId')        
        },
        view: function(){
            setTimeout(function(){
                vm.$root.ajaxs("fatburn_week","大卡");
//                vm.$root.ajaxs("fatburn_week","大卡","1473671641187310300");
                vm.$root.ajaxs("fatburn_week","大卡",getUrlParam('userId'));
            },10)
        }()
    }
})   

   
})