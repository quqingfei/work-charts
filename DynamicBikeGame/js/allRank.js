var rankList;
var deviceData;
var updateData = null;
var jishiData = null;
$(function() {
	var userid = getUrlParam("userId");
//	 var userid = '1448865883744987001';
	var gameid = getUrlParam("gameId");
//	 var gameid = '1462347398136984401';
	var record_id = null; // 主用户点赞id
	var likes_num = 0; // 默认点赞人数
	var record_sets = "";
	var curTime = new Date().getTime();
	var game_start_time = null; // 比赛开始时间
	var game_end_time = null; // 比赛结束时间
	var image_url = "../file/FileCenter!showImage2.zk?name=";

	var sportType = null;
    var pageNumber = 1;
	// 请求选手排名，渲染排名列表
	rankList = function(pageNumber) {
	
		$.ajax({
					type : 'get',
					url : './FatburnGameAction!listRank.zk',
					// url: 'json/rank.json',
					data : {
						userId : userid,
						gameId : gameid,
						 isHot : 'n',
                       pageSize: 20,
                      pageIndex: pageNumber
					},
                    beforeSend: function(){
                        $('#load').show()
                    },
					success : function(data) {
						data = $.parseJSON(data);
						if (data && data.STATUS) {
							if (data.fatburnGameData) {
								record_id = data.fatburnGameData.id + "";
								$('.fav_btn').text(
										data.fatburnGameData.likes + "人")
							} else
								console.log('无个人比赛ID，即没参加比赛！');
							if (data.fatburnGameDatas.length > 0) {
								switch (data.fatburnGameDatas[0].compareUnit) {
								case 'calorie':
									loadRank(image_url, data.fatburnGameDatas,'大卡',pageNumber);
									break;// 排名列表
								case 'distance':
									loadRank(image_url, data.fatburnGameDatas,'米',pageNumber);
									break;// 排名列表
								case 'speed':
									loadRank(image_url, data.fatburnGameDatas,'Km/h',pageNumber);
									break;// 排名列表
								case 'time':
									loadRank(image_url, data.fatburnGameDatas,'秒',pageNumber);
									break;// 排名列表
								}

							} else{
                                $('#moreInfo').text('没有更多数据');
								console.log('没有比赛人参加比赛，比赛还未开始！');
                            }
							if (data.rank) {
								if (data.rank < 10)// 排名小于10，补两个00
									$('#rank_num').text('00' + data.rank);
								else if (data.rank < 100)// 排名小于100，补两个0
									$('#rank_num').text('0' + data.rank);
								else if (data.rank >= 100)// 排名100以上，全显示
									$('#rank_num').text(data.rank);
							} else {
								$('#rank_num').text('-');
							}
							if (data.fatburnGameData) {
								var s = data.fatburnGameData;
								var n = s.currentCompareData
										- s.startCompareData <= 0 ? 0.0
										: (s.currentCompareData - s.startCompareData)
												.toFixed(1);// 获取运动消耗能量、时长、速度
							} else {
								console.log('无个人比赛ID，即没参加比赛！!!!！');
							}
							if (s) {
								$('#sport_sell').text(n == 0.0 ? '000' : n);
								switch (s.compareUnit) {
								case 'calorie':
									$('#sport_unit').text('燃烧热量(大卡)');
									break;
								case 'distance':
									$('#sport_unit').text('运动里程(米)');
									break;
								case 'speed':
									$('#sport_unit').text('运动速度(Km/h)');
									break;
								case 'time':
									$('#sport_unit').text('运动时长(秒)');
									break;
								default:
									$('#sport_unit').text('未知运动');
								}
							} else {
								$('#sport_unit').text('-');
							}
						}
					},
            complete: function(){
                $('#load').hide()
            }
				})
	}
	rankList(pageNumber);
	// 个人点赞
	$('.fav_btn').click(function() {
		addLike(record_id, this);
	})
	// 判断是否在APP内
	/**
	 * 刷新每隔1秒获取一次数据
	 */

	// var deviceSportTime = deviceData.data.data[7];// 记录设备运行时间
 $('#moreInfo').click(function(){     
      pageNumber+=1;
      rankList(pageNumber);
 })

});

// 点赞
function addLike(userid, obj) {

	if (userid == null) {
		alert("他都没参赛呢!");
		return;
	}
	var rs = checkLikes(userid);
	if (rs) {
		alert("您已点过赞啦！");
		return;
	}
	$.ajax({
		type : 'post',
		url : './FatburnGameAction!like.zk',
		data : {
			id : userid
		},
		cache : false,
		dataType : 'json',
		success : function(dt) {
			if (dt.STATUS) {
				var curLikePeople = parseInt($(obj).text().split('人')[0]);
				$(obj).text(curLikePeople + 1 + "人")
				$.cookie('record_sets', record_sets + "," + userid, {});
				console.log(dt.INFO);
			} else {
				console.log(dt.INFO);
			}
		}
	});
}
// 获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; // 返回参数值
}

// 渲染排名函数
function loadRank(image_url, rankArray, nuit, pageNumber) {
	var tb_html = "<tr class=\"\"><th width=\"15%\" height=\"0px\"></th><th width=\"40%\" height=\"0px\"></th><th width=\"20%\" height=\"0px\"></th><th width=\"25%\" height=\"0px\"></th></tr>";
	if (rankArray && rankArray.length > 0) {
		for (var i = 0; i < rankArray.length; i++) {
            var numbers = (i + 1)+(pageNumber-1)*20;
			tb_html += " <tr class=\"gtb_td\">"
					+ "<td class=\"gtb_td_1\">"
					+ numbers
					+ "</td>"
					+ "<td class=\"gtb_td_2\"><img src=\""
					+ (image_url + rankArray[i].userIcon)
					+ "\" class=\""
					+ (rankArray[i].userSex == "M" ? "gtb_td_2_man"
							: "gtb_td_2_women")
					+ "\"/><span>"
					+ rankArray[i].userName
					+ "</span></td>"
					+ "<td class=\"gtb_td_3\" onclick=\"addLike(\'"
					+ rankArray[i].id
					+ "\',this)\">"
					+ rankArray[i].likes
					+ "人"
					+ "</td>"
					+ "<td class=\"gtb_td_4\">"
					+ (rankArray[i].currentCompareData - rankArray[i].startCompareData)
							.toFixed(1) + "<span>" + nuit + "</span></td>"
					+ "</tr>";
		}
		$("#game_rank_tb").append(tb_html);
//		$(".gtb_td").fadeOut(300, function() {
//			$(".gtb_td").fadeIn(300);
//		});
	}
}

// 判断是否点赞
function checkLikes(record_id) {
	record_sets = $.cookie('record_sets') + "";
	/*
	 * 判断是否点赞
	 */
	if (record_sets.indexOf(record_id + "") > -1) {
		$(".fav_btn").css("background-image",
				"url('./css/images/love_red.png')");
		return true;
	} else {
		$(".fav_btn").css("background-image",
				"url('./css/images/love_gray.png')");
	}
	return false;
}


/**
 * 获取数据
 * 
 * @returns {Boolean}
 */

function refreshSportData() {
	if (!window.WebViewJavascriptBridge) {
		return false;
	}
	window.WebViewJavascriptBridge.callHandler('ArenaPushDeviceData', {},
			function(responseData) {
				deviceData = responseData;
			});
	return deviceData;
}
/**
 * 与app交互
 * 
 * @param callback
 */
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
	// 初始化
	bridge.init(function(message, responseCallback) {
		var data = {
			'Javascript Responds' : 'Wee!'
		};
		responseCallback(data);
	});
	// oc调用js方法
	bridge.registerHandler('test', function(data, responseCallback) {
		var responseData = {
			'Javascript Says' : 'Right back atcha!'
		};
		responseCallback(responseData);
	});
});