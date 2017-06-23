var rankList;
var deviceData;
var updateData = null;
var jishiData = null;
$(function() {
	var userid = getUrlParam("userId");
//	 var userid = '1448865883744987001';
	var gameid = getUrlParam("gameId");
//	 var gameid = '1462347398136984401';
    var gameing = false;
	var record_id = null; // 主用户点赞id
	var likes_num = 0; // 默认点赞人数
	var record_sets = "";
	var ishot = 'y';
	var curTime = new Date().getTime();
	var game_start_time = null; // 比赛开始时间
	var game_end_time = null; // 比赛结束时间
	var image_url = "../file/FileCenter!showImage2.zk?name=";

	var sportType = null;
	// 获取比赛信息
	$.ajax({
		type : 'get',
		url : './FatburnGameAction!getById.zk?id=' + gameid,
		// url: 'json/getByID.json',
		success : function(data) {
			data = $.parseJSON(data);
			var s = data.fatburnGame;
			game_start_time = data.fatburnGame.gmtStart; // 出入比赛开始时间用于用户点击开始比赛判断是否为热身赛
			game_end_time = data.fatburnGame.gmtEnd; // 出入比赛开始时间用于用户点击开始比赛判断是否为热身赛
			sportType = data.fatburnGame.gameSportType;
			$('title').text(s.name);
			$('#g_gym a').text("主办方： " + s.organizersName);
			$('#g_time').text(getLocalTime(s.gmtStart, s.gmtEnd));
			$('#g_rule a').attr('href', s.gameUrl);
		}
	})
	// 请求用户信息头像
	$.ajax({
		type : 'get',
		url : './FatburnGameAction!userInfo.zk?userId=' + userid,
		// url: 'json/userinfo.json',
		success : function(data) {
			data = $.parseJSON(data);
			if (data.STATUS && data.userInfo) {
				$('#user_head_icon').attr('src',
						image_url + data.userInfo.headIcon);
				if (data.userInfo.sex == "M")
					$("#user_head_icon").css("border-color", "#20deff");
				else
					$("#user_head_icon").css("border-color", "#ff6f94");
			} else {
				console.log('用户信息/头像获取失败！');
			}
		}
	})
	// 请求选手排名，渲染排名列表
	rankList = function() {
		if (curTime < game_start_time)
			ishot = 'y'
		else
			ishot = 'n'
		$
				.ajax({
					type : 'get',
					url : './FatburnGameAction!listRank.zk',
					// url: 'json/rank.json',
					data : {
						userId : userid,
						gameId : gameid,
						isHot : ishot
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
									loadRank(image_url, data.fatburnGameDatas,
											'大卡');
									break;// 排名列表
								case 'distance':
									loadRank(image_url, data.fatburnGameDatas,
											'米');
									break;// 排名列表
								case 'speed':
									loadRank(image_url, data.fatburnGameDatas,
											'Km/h');
									break;// 排名列表
								case 'time':
									loadRank(image_url, data.fatburnGameDatas,
											'秒');
									break;// 排名列表
								}

							} else
								console.log('没有比赛人参加比赛，比赛还未开始！');
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
					}
				})
	}
	rankList()
	// 个人点赞
	$('.fav_btn').click(function() {
		addLike(record_id, this);
	})
	// 判断是否在APP内
	/**
	 * 刷新每隔1秒获取一次数据
	 */

	refreshView();
	// var deviceSportTime = deviceData.data.data[7];// 记录设备运行时间

	// 点击开始比赛按钮
	$('#operationBtn').click(
					function() {
						deviceData = refreshSportData();
						var devData = eval("(" + deviceData + ")");
						if (!devData.data.isConnect) {
							alert('设备未连接！');
							return false;
						}
						curTime = new Date().getTime();
						if (curTime < game_start_time)
							ishot = 'y';
						else if (curTime < game_end_time)
							ishot = 'n';
						else {
							alert('比赛已经结束！');
							return false;
						}
						if ($('#operationBtn').attr('value') == '0') {
							$
									.ajax({ // 调用开始比赛接口
										type : 'post',
										url : './FatburnGameAction!start.zk',
										data : {
											userId : userid,
											gameId : gameid,
											data : deviceData,
											isHot : ishot
										},
										success : function(data) {
											// alert(data);
											data = $.parseJSON(data);
											if (data.STATUS) {
												showCountDiv(true, 3);
                                                gameing = true;
												$('#operationBtn')
														.css('background',
																'#43C026');
												$('.operationDiv')
														.css('background',
																'#43C026');
												updateData = setInterval(
														function() {
															var itemData = refreshSportData();
															var devDatar = eval("("
																	+ itemData
																	+ ")");
															if (!devDatar.data.isConnect) {
																clearInterval(updateData);
																alert('设备未连接！');
																return false;
															}
															$
																	.ajax({
																		type : 'post',
																		url : './FatburnGameAction!upload.zk',
																		data : {
																			id : record_id
																					+ "",
																			data : itemData
																		},
																		cache : false,
																		dataType : 'json',
																		success : function(
																				dt) { // 数据提交成功
																			$(
																					'#operationBtn')
																					.attr(
																							'value',
																							'1');
																			// alert(dt.INFO);
																			if (dt.STATUS) {
																				var s = dt.fatburnGameData;
																				// alert(deviceData);
																				var t = eval("("
																						+ deviceData
																						+ ")").data.data[7];// s.currentTargetData;
																				switch (s.targetUnit) {
																				case 'calorie':
																					$(
																							'#operationBtn')
																							.text(
																									(s.endTargetData - t)
																											.toString()
																											+ '大卡');
																					break;
																				case 'distance':
																					$(
																							'#operationBtn')
																							.text(
																									(s.endTargetData - t)
																											.toString()
																											+ 'm');
																					break;
																				case 'speed':
																					$(
																							'#operationBtn')
																							.text(
																									(s.endTargetData - t)
																											.toString()
																											+ 'km/h');
																					break;
																				case 'time':
																					if (s.endTargetData
																							- t > 0) {
																						var minu = Math
																								.floor((s.endTargetData - t) / 60);
																						var second = (s.endTargetData - t) % 60;
																						if (minu < 10) {
																							minu = '0'
																									+ minu;
																						}
																						if (second < 10) {
																							second = '0'
																									+ second;
																						}
																						$(
																								'#operationBtn')
																								.text(
																										minu
																												.toString()
																												+ ':'
																												+ second
																														.toString());
																					} else {
																						$(
																								'#operationBtn')
																								.text(
																										"即将结束");
																					}
																					break;
																				default:
																					$(
																							'#sport_unit')
																							.text(
																									'未知运动');
																				}
																			} else {
																				$(
																						'#operationBtn')
																						.attr(
																								'value',
																								'0');
																				$(
																						'#operationBtn')
																						.text(
																								'开始比赛');
																				$(
																						'#operationBtn')
																						.css(
																								'background',
																								'#ff9734');
																				$(
																						'.operationDiv')
																						.css(
																								'background',
																								'#ff9734');
																				clearInterval(updateData);
                                                                                gameing = false;
                                                                                alert('比赛结束');
																				console.log(dt.INFO);
																			}
																		}
																	});
														}, 3000);
												// setInterval('rankList()',5000);

											} else {
												alert(data.INFO);
											}
										}
									})
						}
					});
    $('#g_more').click(function(){
        if(gameing){
            alert('比赛正在进行！暂时不能查看比赛成绩！')
        }else{            
            window.location.href = './allRank.html?userId='+userid+'&gameId='+gameid
        }
    })

})

// 是否显示开始按钮，每5秒刷新一次视图
var refresh_count = 0;

function refreshView() {
	deviceData = refreshSportData();
	// alert(deviceData)
	if (deviceData) { // 在app里面
		$('.operationDiv').show();
		$('#operationBtn').show();
		$('.downloadBox').hide();
	} else { // 不是在app里面
		$('.operationDiv').hide();
		$('#operationBtn').hide();
		$('.downloadBox').show();
	}
	if (refresh_count % 5 == 0) {
		rankList();
	}
	refresh_count++;
	setTimeout("refreshView()", 1000);
}

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
// 返回比赛时间函数
function getLocalTime(nS, bS) {
	var now = new Date(nS);
	var end = new Date(bS);
	var year = now.getFullYear();
	var endyear = end.getFullYear();
	var month = now.getMonth() + 1;
	var endmonth = end.getMonth() + 1;
	var date = now.getDate();
	var enddate = end.getDate();
	var starhour = now.getHours();
	var endhour = end.getHours();
	var starminu = now.getMinutes();
	var endminu = end.getMinutes();
	if (starhour <= 9)
		starhour = '0' + starhour;
	if (starminu <= 9)
		starminu = '0' + starminu;
	if (endhour <= 9)
		endhour = '0' + endhour;
	if (endminu <= 9)
		endminu = '0' + endminu;
	if (year == endyear && month == endmonth && date == enddate) {
		return "比赛时间：  " + year + "年" + month + "月" + date + "日   " + starhour
				+ ":" + starminu + "~" + endhour + ":" + endminu;
	} else if (year == endyear && month == endmonth) {
		return "比赛时间：  " + year + "年" + month + "月" + date + "日   " + starhour
				+ ":" + starminu + "~" + enddate + "日   " + endhour + ":"
				+ endminu;
	} else if (year == endyear) {
		return "比赛时间：  " + year + "年" + month + "月" + date + "日   " + starhour
				+ ":" + starminu + "~" + endmonth + "月" + enddate + "日   "
				+ endhour + ":" + endminu;
	} else {
		return "比赛时间：  " + year + "年" + month + "月" + date + "日   " + starhour
				+ ":" + starminu + "~" + endyear + "年" + endmonth + "月"
				+ enddate + "日   " + endhour + ":" + endminu;
	}
}
// 渲染排名函数
function loadRank(image_url, rankArray, nuit) {
	var tb_html = "<tr class=\"gtb_th\"><th width=\"15%\">排名</th><th width=\"40%\">选手</th><th width=\"20%\">人气</th><th width=\"25%\">成绩</th></tr>";
	if (rankArray && rankArray.length > 0) {
		for (var i = 0; i < rankArray.length; i++) {
			tb_html += " <tr class=\"gtb_td\">"
					+ "<td class=\"gtb_td_1\">"
					+ (i + 1)
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
		$("#game_rank_tb").html(tb_html);
		$(".gtb_td").fadeOut(300, function() {
			$(".gtb_td").fadeIn(300);
		});
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
// 倒计时动画
function showCountDiv(isStart, time) {
	$(".countDiv").show();
	$(".countDiv").html("" + time);
	if (time == 0) {
		if (isStart) {
			$(".countDiv").html("开始");
		} else {
			$(".countDiv").html("结束");
		}
	}
	if (time < 0) {
		$(".countDiv").hide();
		return;
	}
	time--;
	setTimeout("showCountDiv(" + isStart + "," + time + ")", 1000)
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