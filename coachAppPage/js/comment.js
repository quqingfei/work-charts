var _viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var _viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var pageStart = 1;
var freshing = false;
var coachGet = false;
var freshEnd = false;

$(function() {
	connectWebViewJavascriptBridge(function(bridge) {
		// 初始化
		bridge.init(function(message, responseCallback) {
			var data = {
				'Javascript Responds': 'backBefore'
			};
			responseCallback(data);
		});
		// oc调用js方法
		bridge.registerHandler('zkBackEvent', function(data, responseCallback) {
			history.back();
			var responseData = 'success';
			responseCallback(responseData);
		});
		bridge.registerHandler('readyBack', function(data, responseCallback) {
			readyBack();
			var responseData = {
				'Javascript Says': 'readBack!'
			};
			responseCallback(responseData);
		});
	});
	moreComment();
})

function connectWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) {
		callback(WebViewJavascriptBridge);
	} else {
		document.addEventListener('WebViewJavascriptBridgeReady', function() {
			callback(WebViewJavascriptBridge);
		}, false);
	}
}
//判断元素是否出现在视窗范围内
function isOnVerticalViewPort(ele) {
	var rect = ele.getBoundingClientRect(); // 获取距离视窗的位置信息 
	return rect.top > 0 && rect.top <= _viewPortHeight;
};
//监听滚动，到底部触发事件
window.addEventListener("scroll", function(e) {
	var ele = document.getElementById('footer');
	if (!freshEnd) {
		if (!freshing) {
			freshing = true;
			// $('#footer').show();
			moreComment();
		}
	}
}, false);

function coachLevel(level) {
	switch (level) {
		case 0:
			$('#coachLogo').css('background-image', 'url(\'img/mingxing.png\')');
			break;
		case 1:
			$('#coachLogo').css('background-image', 'url(\'img/koubei.png\')');
			break;
		case 2:
			$('#coachLogo').css('background-image', 'url()');
			break;
		case 3:
			$('#coachLogo').css('background-image', 'url()');
			break;
	}
}
//图片预览
function picShow(src) {
	// console.log(src);
	var img = new Image();
	img.src = '../file/FileCenter!showImage2.zk?name=' + src;
	img.onload = function() {
		// 打印
		// alert('width:' + img.width + ',height:' + img.height);
		// var mtop = $('#picShow img').css('width') * img.height / img.width / 2;
		// $('#picShow img').css('margin-top', '-' + mtop);
		var top = _viewPortHeight - _viewPortWidth * img.height / img.width;
		top = top < 0 ? 0 : top;
		$('#picShow img').css('top', top / 2 + 'px');
		$('#picShow img').attr('src', img.src);
	};
	$('body').css('overflow-y', 'hidden');
	$('#picShow').show();
}
$('#picShow').on('click', function() {
	$('#picShow img').css('top', '0px');
	$('#picShow img').attr('src', '');
	$('body').css('overflow-y', 'auto');
	$('#picShow').hide();
})

function moreComment() {
	var cid = getUrlParam("cid");
	var eid = getUrlParam("eid");
	if (!!eid) {
		$('#commentCount').hide();
	}
	$.ajax({
		type: 'POST',
		url: '../GymGroupCourseAction!getAllEvaluate.zk',
		data: {
			id: cid,
			evaluateId: eid,
			pageIndex: pageStart,
			pageSize: 4
		},
		success: function(data) {
			data = eval('(' + data + ')');

			if (!coachGet) {
				$('#commentCount h3').text(data.eCount + '条评论');

				var coachInfo = data.coachInfoList[0];
				$('#coachHead').css({
					'background': '#ccc url(\'../file/FileCenter!showImage2.zk?name=' + coachInfo.coachIcon + '\')',
					'background-repeat': 'no-repeat',
					'background-size': 'cover',
					'background-position': 'center'
				});
				coachLevel(coachInfo.coachLevel);
				$($('#coachInfo h3')[1]).text(coachInfo.coachName);

				//性别判断
				var coachSex = coachInfo.coachSex == 'M' ? 'img/male.png' : 'img/female.png';
				$('#coachInfo img').attr('src', coachSex);

				var avgEvaluate = data.avgEvaluate[0];
				var major = parseInt(avgEvaluate.avgMajorEvaluate);
				$($('#majorEx h3')[1]).text(avgEvaluate.avgMajorEvaluate.toFixed(1));
				for (var i = 0; i < major; i++) {
					$($('#majorEx .star-total img')[i]).attr('src', 'img/xing.png');
				}
				if (avgEvaluate.avgMajorEvaluate > major) {
					$($('#majorEx .star-total img')[major]).attr('src', 'img/xing1.png');
				}
				var service = parseInt(avgEvaluate.avgServiceEvaluate)
				$($('#serviceEx h3')[1]).text(avgEvaluate.avgServiceEvaluate.toFixed(1));
				for (var i = 0; i < service; i++) {
					$($('#serviceEx .star-total img')[i]).attr('src', 'img/xing.png');
				}
				if (avgEvaluate.avgServiceEvaluate > service) {
					$($('#serviceEx .star-total img')[service]).attr('src', 'img/xing1.png');
				}
				coachGet = true;
			}

			var evaList = data.allEvaluateList;
			pageStart++;
			if (evaList.length > 0) {
				for (var n = 0; n < evaList.length; n++) {
					var eva = evaList[n];
					var comment = $('<div>').attr({
						'class': 'comment'
					});

					//会员头像
					if (eva.anonymous == 'n') {
						var commentHead = $('<div>').attr('class', 'comment-head').css({
							'background': '#ccc url(\'../file/FileCenter!showImage2.zk?name=' + eva.userIcon + '\')',
							'background-repeat': 'no-repeat',
							'background-size': 'cover',
							'background-position': 'center'
						});
					} else {
						var commentHead = $('<div>').attr('class', 'comment-head').css({
							'background': '#ccc url(\'img/demo.jpg\')',
							'background-repeat': 'no-repeat',
							'background-size': 'cover',
							'background-position': 'center'
						});
					}


					//VIP图标
					var vip = eva.isMember == 'y' ? 'img/vip.png' : '';
					var commentLogo = $('<div>').attr('class', 'comment-logo').css('background-image', 'url(\'' + vip + '\')');

					commentHead.append(commentLogo);
					//性别图标
					var sex = eva.userSex == 'M' ? 'img/male.png' : 'img/female.png';
					var commentInfo = '<div class="comment-info"><p>' + eva.userName + '<img class="comment-sex" src="' + sex + '" alt=""></p><p>' + eva.commentTime.replace(/-/g, '.') + '</p></div>';
					//评星
					var major = '';
					for (var i = 0; i < 5; i++) {
						if (i < eva.majorEvaluate) {
							major += '<img src="img/xing.png" alt="">';
						} else {
							major += '<img src="img/xing0.png" alt="">';
						}
					}
					var service = '';
					for (var i = 0; i < 5; i++) {
						if (i < eva.serviceEvaluate) {
							service += '<img src="img/xing.png" alt="">';
						} else {
							service += '<img src="img/xing0.png" alt="">';
						}
					}
					var commentStar = '<div class="comment-star"><span>专业评价</span><div class="star">' + major + '</div><br><span>服务评价</span><div class="star">' + service + '</div></div>';
					var commentCont = '<div class="comment-cont"><p>' + (eva.userComment != undefined ? eva.userComment.replace(/\n/g, "<br>") : '无') + '</p></div>';
					//添加图片
					var commentPics = $('<div>').attr('class', 'comment-pics');
					if (!!eva.images) {
						var pics = eval('(' + eva.images + ')');
						// console.log(commentPics);
						for (var i = 0; i < pics.length; i++) {
							var pic = $('<div>').attr({
								'class': 'comm-pic',
								'data-src': pics[i]
							}).css({
								'background': '#ccc url(\'../file/FileCenter!showImage2.zk?name=' + pics[i] + '\')',
								'background-repeat': 'no-repeat',
								'background-size': 'cover',
								'background-position': 'center'
							}).on('click', function() {
								picShow($(this).attr('data-src'));
							});
							commentPics.append(pic);
						}
					}

					comment.append(commentHead);
					comment.append(commentInfo);
					comment.append(commentStar);
					comment.append(commentCont);
					comment.append(commentPics);
					$('#contant').append(comment);
				}
				$('#cover').hide();
				freshing = false;
			} else {
				freshEnd = true;
				// $('#footer').hide();
			}

		}
	})
}