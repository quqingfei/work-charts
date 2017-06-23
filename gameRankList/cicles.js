         // 获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); // 匹配目标参数
    if (r != null)
        return unescape(r[2]);
    return null; // 返回参数值
}
    //url = "/game/FatburnGameAction!listGameRank.zk";
    var svgLayer = document.getElementById("svgLayer");
    var circles = [];
    var width = document.documentElement.clientWidth-$('.left').offset().left;
    var height = document.documentElement.clientHeight-$('.right').offset().top;
    var max_radius = 0;
    var min_radius = 0;
    svgLayer.setAttribute("width", width);
    svgLayer.setAttribute("height", height);
    var chavalue = 0;
    var count = 0,le = 0;
    var allleng = 0;
    var allrankdiff = [];
    var sido = null;
    window.onload = function () {
        loade();
       sido = setInterval(function(){
           loade();
        },3000);   
    }
    function loade(){
        $.ajax({
            type: 'get',
            url: '../FatburnGameAction!getById.zk?id=' + getUrlParam('gameId'),
            dataType:'json',
            success: function(data) {
                var s = data.fatburnGame;
                var game_start_time = data.fatburnGame.gmtStart; // 出入比赛开始时间用于用户点击开始比赛判断是否为热身赛
                var game_end_time = data.fatburnGame.gmtEnd; // 出入比赛开始时间用于用户点击开始比赛判断是否为热身赛
                var sportType = data.fatburnGame.gameSportType; //运动类型
                var targetCount = data.fatburnGame.targetCount;//记录比赛时间
                var gameTime = targetCount;
                var gameTimeTwo = gameTime;
                var curTime = new Date().getTime();
                if (curTime < game_start_time){ //比赛前
                    ishot = 'y'}
                else if (curTime < game_end_time) { //比赛中
                    ishot = 'n';
                    init();                    
                }
                else {
                    clearInterval(sido);
//                    alert('比赛已经结束！');
                    $('#gamaname').trigger('click');
                    return false;
                }
                
            }
        })
    }
    function init(){
         $.ajax({
                type:'get',
                url:'../game/FatburnGameAction!listGameRank.zk',
//                url:'test.json',
                data:{gameId:getUrlParam('gameId')},
                dataType:'json',
                success: function(res){
                    if(res.fatBurnGame.length==0){
                        $('.nomessage').show();
                    }else{
                        $('.nomessage').hide();
                        var didoe = res.fatBurnGame[0].compareUnit;
                        var unit = '';
                        if(didoe == "calorie"){
                            unit = '大卡';
                            $('#gamaname').text('疯狂燃脂赛');
                        }
                        if(didoe == 'speed'){
                            unit = 'km/h';
                            $('#gamaname').text('极限竞速赛');
                        }
                        if(didoe == 'distance'){
                            unit = '米';
                            $('#gamaname').text('超级耐力王');
                        }
                        var ranklist = res.fatBurnGame.length;
                        var chang = 10;
                        if(ranklist<5){
                            chang = 3;
                        }else if(ranklist<11){
                            chang = 5;
                        }else if(ranklist<16){
                            chang = 8;
                        }else if(ranklist<21){
                            chang = 10;
                        }else if(ranklist<26){
                            chang = 13;
                        }else{
                            chang = 15;
                        }
                        max_radius = document.documentElement.clientWidth/30*chang;
                        min_radius = document.documentElement.clientWidth/30;
                        chavalue = max_radius-min_radius;
                        if(allleng==ranklist){
                            for(var q=0;q<allrankdiff.length;q++){
                                if(allrankdiff[q]!=res.fatBurnGame[q].userId){
                                    location.reload();
                                }
                            }
                        }else{
                            $.each(res.fatBurnGame,function(i,e){
                                if(i<10){
                                    allrankdiff.push(e.userId);
                                }
                            });
                            clearInterval();
                            allleng = ranklist;
                            $("#svgLayer").find('g').remove();
                            var total = ranklist+(ranklist*(ranklist-1))/2;
                            for(var i=0;i<=ranklist-1;i++){
                                var r = chavalue/total;
                                var di = r*(ranklist-i); 
                                var name = res.fatBurnGame[i].userName;
                                var image = "../file/FileCenter!showImage2.zk?name="+res.fatBurnGame[i].userIcon+"&style=30Q_100h_100w_1e";
                                make_circle(di,i,name,image);
                            }
                            var glist = $("#svgLayer").find('g');
                            if(glist.length<allleng){
                                location.reload();
                            }
                            setInterval(function(){
                                $.each(glist, function(i,e){
                                    $(e).css('transform','translate('+Math.floor(Math.random() *100-50)+'px,'+Math.floor(Math.random() *100-50 )+'px)');
                                })
                            },2000);               
                        }
                        $('#liset').html('');
                        $('#rankList').html('');
                        $.each(res.fatBurnGame,function(i,e){
                            if(i<3){                      
                                if(i==0){
                                    eleappden('first',1,e.userName,(e.currentCompareData-e.startCompareData).toFixed(1)+unit,e.userIcon,'#liset');
                                    eleappden('first',1,e.userName,(e.currentCompareData-e.startCompareData).toFixed(1)+unit,e.userIcon,'#rankList');
                                }
                                if(i==1){
                                    eleappden('second',2,e.userName,(e.currentCompareData-e.startCompareData).toFixed(1)+unit,e.userIcon,'#liset');
                                    eleappden('second',2,e.userName,(e.currentCompareData-e.startCompareData).toFixed(1)+unit,e.userIcon,'#rankList');
                                }
                                if(i==2){
                                    eleappden('thred',3,e.userName,(e.currentCompareData-e.startCompareData).toFixed(1)+unit,e.userIcon,'#liset');
                                    eleappden('thred',3,e.userName,(e.currentCompareData-e.startCompareData).toFixed(1)+unit,e.userIcon,'#rankList');
                                }
                            }else if(i<10){                        
                                eleappden('',i+1,e.userName,(e.currentCompareData-e.startCompareData).toFixed(1)+unit,e.userIcon,'#liset');
                                eleappden('',i+1,e.userName,(e.currentCompareData-e.startCompareData).toFixed(1)+unit,e.userIcon,'#rankList');
                            }
                        });  
                    }
                                            
                }
            });
    }
    function eleappden(classname,num,name,value,img,ele){
        var nde = name.length>5?name.slice(0,5)+"...":name;
        var lis = '<li class='+classname+'><span class="num">'+num+'</span><span class="head"><img src="../file/FileCenter!showImage2.zk?name='+img+'&style=20Q_100h_100w_1e" alt=""></span><span class="name">'+nde+'</span><span class="vla">'+value+'</span></li>';        
        $(ele).append(lis);
        $('#liset').show();
    }
    function Circle(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }
    var data = [10,15,20,25,30,15,12];
    function make_circle(ri,i,name,img) {      
        var x = Math.floor(Math.random() * width) + 1;
        var y = Math.floor(Math.random() * height) + 1;
//        var r = Math.floor(Math.random() * (max_radius - min_radius)) + min_radius;
        var r = min_radius+ri;
      
        var color = 'rgb(61,109,130)';
//        var color = "rgb(" + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + ")"; //make different color
        if(i==0){
            color = 'rgb(212,47,47)';
        }
        if(i==1){
            color = 'rgb(255,188,58)';
        }
        if(i==2){
            color = 'rgb(73,220,191)';
            
        }
        
        var circle = new Circle(x, y, r, color);
        if (test1(circle) && test2(circle)) {
            le++;
            circles.push(circle);
            setCicle(x,y,r,color,'none','none',i,name,img);
            count = 0;
        }
        else {
            count++;
            if (count > 10000) { //if it loops too many times,we can assume that there is no space for new circle
                console.log("no more circle");
                return false;
            }
            make_circle(ri,i,name,img);
        }
    }

    function test1(circle) { //判断圆与圆之间是否相交
        var len = circles.length;
        for (var i = 0; i < len; i++) {
            var x1 = circles[i].x;
            var y1 = circles[i].y;
            var r1 = circles[i].r;
            var x2 = circle.x;
            var y2 = circle.y;
            var r2 = circle.r;
            if ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) < (r2 + r1) * (r2 + r1)) {
                return false;
            }
        }
        return true;
    }

    function test2(circle) { //test if the new circle touchs the border 
        if ((circle.x + circle.r) > width || (circle.y + circle.r) > height || (circle.x - circle.r) < 0 || (circle.y - circle.r) < 0) {
            return false;
        }
        else {
            return true;
        }
    }
    function setCicle(cx,cy,r,fill,stroke,strokeWidth,i,name,img){
        var svgNS="http://www.w3.org/2000/svg";
        var g = document.createElementNS(svgNS,"g");
        g.setAttribute("id",'x'+i);
        var di = i/10+0.5;
        var nodeRect = document.createElementNS(svgNS,"circle");
        nodeRect.setAttribute("cx",cx);
        nodeRect.setAttribute("cy",cy);
        nodeRect.setAttribute("r",r*0.8);
        nodeRect.setAttribute("opacity",0.8);
        nodeRect.setAttribute("fill",fill);
        nodeRect.setAttribute("stroke-width",strokeWidth);
        nodeRect.innerHTML = '<animate attributeType="xml" attributeName="r" values='+r*0.8+';'+r*1+';'+r*0.8+' dur="'+di+'s" repeatCount="indefinite" />';
        g.appendChild(nodeRect);
        var nodeRect2 = document.createElementNS(svgNS,"circle");
        nodeRect2.setAttribute("cx",cx);
        nodeRect2.setAttribute("cy",cy);
        nodeRect2.setAttribute("r",r*0.9);
        nodeRect2.setAttribute("opacity",0.2);
        nodeRect2.setAttribute("fill",fill);
//        if(le<10){
            nodeRect2.innerHTML = '<animate attributeType="xml" attributeName="r" values='+r+';'+r*1.1+';'+r+' dur="'+di+'s" repeatCount="indefinite" />';
//        }
        g.appendChild(nodeRect2);
        var nodeRect3 = document.createElementNS(svgNS,"circle");
        nodeRect3.setAttribute("cx",cx);
        nodeRect3.setAttribute("cy",cy);
        nodeRect3.setAttribute("r",25);
        nodeRect3.setAttribute("opacity",1);
        nodeRect3.setAttribute("fill","url(#avatar"+i+")");
        var didp = document.getElementById('avatar'+i);
        didp.children[0].href.baseVal = img;
        g.appendChild(nodeRect3);    
        var nodeRect4 = document.createElementNS(svgNS,"text");
        var nde = name.length>4?name.slice(0,4):name;
        nodeRect4.innerHTML = name;
        nodeRect4.setAttribute("x",cx);
        nodeRect4.setAttribute("y",cy+40);
        nodeRect4.setAttribute("fill",'#fff');
        g.appendChild(nodeRect4); 
        svgLayer.appendChild(g);
    }
    
    $('#gamaname').click(function(){
       var val = $(this).attr('val');
        if(val == 0){
            $('#rankListFather').slideDown();
            $(this).attr('val',1);
        }else{
            $('#rankListFather').fadeOut(200);
            $(this).attr('val',0);
        }
    });