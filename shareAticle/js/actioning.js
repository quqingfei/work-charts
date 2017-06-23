$(function(){
	//$('.addFriendDiv').ontouchstart = function(e) { e.preventDefault(); };//禁用长按事件
	$("#allNotesDiv").empty();
	var curUrl = window.location.href;
	actionId = curUrl.split('?')[1].split('&')[0].split('=')[1];
	//actionId = $.getUrlVar('id');//'1456300298214040801';
	getChooseNotes(1);
	/*
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		slidesPerView: 3,
		paginationClickable: true,
		spaceBetween: '2%'
	});
	changePhoto('swiper-wrapper');
	*/
	$(window).scroll(function(){
        var pageH = $('#actionDiv').height();//document.body
        var scrollT = $(window).scrollTop();//滚动条top
        var winH = $(window).height();
        if((pageH-scrollT)==winH){
        	getNotes();
        }
	});
});
//手机适配
var sUserAgent = navigator.userAgent.toLowerCase();
var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
var bIsAndroid = sUserAgent.match(/android/i) == "android";
var bIswindow = sUserAgent.match(/window/i) == "window";
var spt = document.createElement('script');
if(bIsIpad || bIsAndroid || bIsIphoneOs){
			
} else {
	document.write("<script src='js/jquery.scrollify.min.js'><\/script>"); 
}

function changePhoto(id){
	var imgs = $('#'+id).children();
	//LoadImage(adjustPhoto,$(imgs[1]).children().children());
	for(var i=0;i<imgs.length;i++){
		LoadImage(adjustPhoto,$(imgs[i]).children().children(),id);
	}
}
function adjustPhoto(image,show,id){
	
	var w = image.width;
	var h = image.height;
	var div = $($('#'+id).children()[0]);
	var w1 = w/div.width();
	var h1 = h/div.height();
	if(w1>h1){
		/*//显示全图
		var h2 = div.width()/w*h;
		var top=(div.height()-h2)/2;
		show.css({'width':'100%','height':h2,'margin-top':top});
		*/
		var w2 = div.height()/h*w;
		var left = -((w2 - div.width())/2);
		show.css({'width':w2,'height':'100%','left':left,'top':0});
	}else{
		/*//显示全图
		var w2 = div.height()/h*w;
		var left=(div.width()-w2)/2;
		show.css({'width':w2,'height':'100%','margin-left':left});*/
		var h2 = div.width()/w*h;
		var top = -((h2-div.height())/2);
		show.css({'width':'100%','height':h2,'top':top,'left':0});
	}
}


function LoadImage(callback,showImg,id){
	  var image = new Image();
	  image.src = showImg.attr("src");
	  if (image.complete) {
	    callback(image,showImg,id);
	    image.onload=function(){
	    	//alert(showImg.css('id'));
	    };
	  } else {
	    image.onload = function() {
	      callback(image,showImg,id);
	      // clear onLoad, IE behaves erratically with animated gifs otherwise
	      image.onload=function(){
	    	  //alert(showImg.css('id'));
	      };
	    };
	    image.onerror = function() {
	        //alert("Could not load image.");
	    };
	 }
}

//图片加载错误时，显示
function showDefaultImage(id){
	$('#'+id).attr('src','images/head.png');
	$('#'+id).onerror = null;
}
//图片加载完成时
function showImage(id){
	$('#'+id+'_d').css('display','none');
	//$('#'+id).attr('src','images/head.png');
	$('#'+id).css('display','block');
}
function getNotes(){
	getChooseNotes(pageIndex);
}
var actionId;
var pageIndex = 1;
var pageSize = 30;
function getChooseNotes(page){
    pageIndex = page ;
    $.post('../manage/ActionlistAction!getNotes.zk',{pageIndex:pageIndex,pageSize:pageSize,actionlistId:actionId},function(data){
        if(data.STATUS){
        	 //清空
            //$("#chooseNoteDiv").empty();
            var notes = data.notes;
            var noteSize = notes.length ;
            var noteIds = [];
            if(noteSize > 0 ){
                for(var i = 0 ;i< noteSize;i++){
                    var note = notes[i];
                    var oldNote;
                    noteIds[i] = note.id;
                    //note.userIcon = "../file/FileCenter!showImage2.zk?type=mdm&name=" + note.userIcon;
                    if(note.noteImages){
                        note.noteImages = eval("("+note.noteImages +")"); 
                    }
                    if(note.userMedal){
                    	note.userMedal = eval("("+ note.userMedal +")");
                    }
                    if(note.complaint){
                        note.complaint = formatComplaint(note.complaint);
                    }else{
                        note.complaint = null ;
                    }
                    if(note.gmtModify > note.gmtCreate){
                        var now = new Date().getTime();
                        if(note.gmtModify > now){
                            note.isTop = 'y';
                        }
                    }
                    if(note.likeUsers)
                    	note.likeUsers = eval("("+ note.likeUsers +")");
                    //note.gmtCreate = getTimeAgo(note.gmtCreate);
                    oldNote = jQuery.extend(true, {}, note);
                    note.noteContentNew = parseNoteContent(note.noteContent);
                    /*
                    if(note.noteContent.length>10)
                    	note.noteContentNew = note.noteContent.substr(0,10)+'...';
                    else
                    	note.noteContentNew = note.noteContent;
                    */
                    note.oldNote = JSON.stringify(oldNote);
                }
                $.tmpl($("#chooseNoteTmpl").html(), data.notes).appendTo("#allNotesDiv");
                $('#noteIds').val(JSON.stringify(noteIds));
                //$("#getNotesDiv").before($.tmpl($("#chooseNoteTmpl").html(), data.notes));
                //$("#actionDiv").animate({scrollTop:$("#actionDiv").offset().bottom},500);
                $('#pageIndex').val(parseInt($('#pageIndex').val())+1);
            }else{
                //$("#chooseNoteDiv").html('很抱歉，还没有选择的帖子！');
            }
            $('#loadDiv').hide();
        	$('#actionDiv').show();
     }
    },'json').complete(function(data){
    	var swiper = new Swiper('.swiper-container', {
    		pagination: '.swiper-pagination',
    		slidesPerView: 3,
    		paginationClickable: true,
    		spaceBetween: '2%'
    	});
    	var noteIds = eval('('+$('#noteIds').val()+')');
    	//changePhoto(noteIds[3]);
    	for(var i=0;i<noteIds.length;i++){
    		changePhoto(noteIds[i]);
    	}
    	pageIndex = parseInt($('#pageIndex').val());
    });
}

//格式化时间显示
function getTimeAgo(time){
    var date = new Date();
    var today = date.setHours(0, 0, 0, 0);
    var yesterday =  date.setDate(date.getDate()-1);
    var beforeYesterday = date.setDate(date.getDate()-1);
    var i = time ;
    if(i <= beforeYesterday){
        return new Date(time).format("MM月dd日 hh:mm");
    }else if(i <= yesterday){
        return "前天  "+new Date(time).format("hh:mm");
    }else if(i <= today){
        return "昨天 "+new Date(time).format("hh:mm");
    }else {
        var now = new Date().getTime();
        var deltaSeconds = (now - i ) / 1000 ;
        if(deltaSeconds < 60){//不超过一分钟
            return '刚刚';
        }else{//不超过一天
             return "今天 " + new Date(time).format("hh:mm");
        }
    }
}


//js调用java
function sendData(data){
	// 向oc发消息
	window.WebViewJavascriptBridge.send('Hello from the javascript');
	window.WebViewJavascriptBridge.send('response to xxx', function(responseData) {
        //console.log("Javascript got its response", responseData);
    });
}

//添加好友
function addFriend(userId){//userId
	if(!window.WebViewJavascriptBridge){
		return false;
	}
    //call native method
	window.WebViewJavascriptBridge.callHandler('addFriend',{'userId':userId},function(response){
		//console.log('JS got response', response);
	});
}

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
	$('#getNotesDiv').show();
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
