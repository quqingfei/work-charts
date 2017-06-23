var sting = '';
var id = getUrlParam('id');
//    id = '1455675291207847401';
var image_url = "../file/FileCenter!showImage2.zk?name=";
var formatdata = '';
var desidory = '';
    //获取板块banner，描述和参加人数
 


$('.itemer').css('height',$('.itemer').width()+'px');
$.ajax({
       type: 'post',
        url: '../actionlist/ActionlistAction!getById.zk?id='+id,
    success: function(data){
        data = $.parseJSON(data);
        if(data.STATUS){
            $('title').text(data.actionlist.name);
            if(data.actionlist){                
                formatdata = data.actionlist;
                if(formatdata.adImg){
                   $('#bannerimg').attr('src',image_url+formatdata.adImg);
                   $('.adlink').attr('href',formatdata.adUrl);
                }else{                    
                    $('#bannerimg').attr('src',image_url+formatdata.cover);
                }
                $('#peple').text(formatdata.totleUser);
                desidory = formatdata.introduction;
                if(formatdata.introduction.length>48){
                    var s = formatdata.introduction.substring(0,48)+'...';                    
                    $('.description').html(s.replace(/#([^#]+?)#/g, function(m, g1){//给#号之间的文字加span标签
                    return "<span>#"+ g1 +"#</span>"
                    }))
                    $('.more').show();
                }else{
                    $('.description').html(formatdata.introduction.replace(/#([^#]+?)#/g, function(m, g1){//给#号之间的文字加span标签
                    return "<span>#"+ g1 +"#</span>"
                    }));
                    $('.description').css('paddingBottom','1rem');
                }
            }else{
                console.log('data.actionlist  无此对象')
            }
        }else{
            console.log(data.INFO);
        }
    },
    error: function(err){
        console.log(err+'请求失败');
    }
})
$.ajax({
    type: 'post',
    url: '../actionlist/ActionlistAction!getNotes.zk?actionlistId='+id,
    success: function(data){
        data = $.parseJSON(data);
        if(data.STATUS) {
            var notes = data.notes;
            if(notes.length>0){
                $.each(notes,function(index,item){
                   if(!item.likes){
                       item.likes = 0;
                   }if(!item.replySize){
                       item.replySize = 0;
                   } $('.moreAticle').append(inputArticle(image_url+item.cover,item.likes,item.replySize,image_url+item.userIcon,item.userName,item.noteContent))
                $($('.article')[index]).on('click',function(){
                    toNoteDetail(item);
//                    alert(JSON.stringify(item));
                })
                if(!item.likes){
                     $($('.article')[index]).find('.tsan a').text(0);
                }
                if(!item.likes){
                     $($('.discuss')[index]).find('.tsan a').text(0);
                }
                if(item.userSex=='F'){
                     $($('.article')[index]).find('.headimg').addClass('faman');
                }
                if(item.userSex=='M'){
                     $($('.article')[index]).find('.headimg').addClass('man');
                }
                $('.articleImgOne').css('height',$('.articleImgOne').width());
                })
            }else{
                console.log('data.notes无数据');
            }
        }else{
            console.log(data.INFO);
        }
    },
    error: function(err){
        console.log(err+'请求失败');
    }
})
$('.discussBtn').click(function(){
    if(formatdata){
        participateTopic(JSON.stringify(formatdata));
    }else{
            alert('发帖失败,无有效数据');
    }
})
function inputArticle(a,b,c,d,e,f){
    var n = parseNoteContent(f);
    var html = "<div class='article'>"
    +"<div class='articleImg'>"
    +"<div class='articleImgOne' style='background:url("+a+") no-repeat center center;background-size: cover;'>"
    +"</div>"
    +"<div class='tsan'>"
    +"<a href='javascript:;'>"+b+"</a>"
    +"</div>"
    +"<div class='discuss'>"
    +"<a href='javascript:;'>"+c+"</a>"
    +"</div>"
    +"</div>"
    +"<div class='userInfo'>"
    +"<div class='headimg'>"
    +"<img src="+d+">"
    +"</div>"
    +"<div class='userDetile'>"
    +"<div class='username'>"+e+"</div>"
    +"<div class='userdescription'>"+n+"</div>"
    +"</div>"
    +"</div>"
    +"</div> "
    return html;
}
       // 获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; // 返回参数值
}
    $('.description').html(
        sting.replace(/#([^#]+?)#/g, function(m, g1){//给#号之间的文字加span标签
          return "<span>#"+ g1 +"#</span>"
        })
    )
    $('.userDetile').css('width',$('.article').width()-40+'px');
//点击更多按钮
$('.more').click(function(){
    $('.description').html(desidory.replace(/#([^#]+?)#/g, function(m, g1){//给#号之间的文字加span标签
        return "<span>#"+ g1 +"#</span>"
    }))
    $('.more').hide();
    $('.description').css('paddingBottom','1rem');
})
//查看帖子详情
function toNoteDetail(note){
	if(!window.WebViewJavascriptBridge){
		return false;
	}
	//note = eval('('+note+')');
    //call native method
	window.WebViewJavascriptBridge.callHandler('toNoteDetail',{'note':note},function(response){
		//console.log('JS got response', response);
	});
}
//参与发送贴子
function participateTopic(note){
	if(!window.WebViewJavascriptBridge){
		return false;
	}
	//note = eval('('+note+')');
    //call native method
	window.WebViewJavascriptBridge.callHandler('participateTopic',{'action':note},function(response){
		//console.log('JS got response', response);
	});
}
if(navigator.userAgent.indexOf("fatburn") <= -1){
        $('.discussBtn').hide();
        $('#downloadBox').show();
}
function connectWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) {
		callback(WebViewJavascriptBridge);
	} else {
		document.addEventListener('WebViewJavascriptBridgeReady', function() {
			callback(WebViewJavascriptBridge);
		}, false);
	}
}

connectWebViewJavascriptBridge(function(bridge) {
	//初始化
	bridge.init(function(message, responseCallback) {
		//console.log('JS got a message', message);
		var data = { 'Javascript Responds':'Wee!' };
		//console.log('JS responding with', data);
		responseCallback(data);
	});
	// oc调用js方法
	bridge.registerHandler('test', function(data, responseCallback) {
		//console.log('ObjC called testJavascriptHandler with', data);
		var responseData = { 'Javascript Says':'Right back atcha!' };
		//console.log('JS responding with', responseData);
		responseCallback(responseData);
	});
}); 
var sw = $(window).width();
if(sw>640){
    sw = 640;
}
$("html").css("font-size",sw/1080*32.8125+"px");