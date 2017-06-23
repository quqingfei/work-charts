$(function() {
	// var now = new Date();
	// var years = [];
	// for (var i = 1949; i <= now.getFullYear(); i++) {
	// 	years.push(i);
	// }
	// $('#birth').mdatetimer({
	// 	mode: 1, //时间选择器模式 
	// 	format: 2, //时间格式化方式 
	// 	years: years, //年份数组 
	// 	nowbtn: true //是否显示现在按钮 
	// });
	// refreshView();
});

$('#codeGet').on('click', function() {
	getCode();
})

function getCode() {
	if ($.trim($('#phone').val()) != '') {
		$.ajax({
			type: 'POST',
			url: '../sender/CardSenderAction!getSmsCode.zk',
			data: {
				phone: $('#phone').val()
			},
			success: function(data) {
				$('#codeGet').off('click');
				data = eval('(' + data + ')');
				if (data.STATUS) {
					var count = 60;
					var a = setInterval(function() {
						$('#codeGet').css({
							'background': 'rgba(0,0,0,0)',
							'color': '#3fc371',
							'border': '1px solid #3fc371'
						})
						$('#codeGet').text('重新获取 ' + count);
						if (count == 0) {
							$('#codeGet').css({
								'background': '#3fc371',
								'color': '#fff',
								'border': 0
							})
							$('#codeGet').text('获取验证码');
							$('#codeGet').on('click', function() {
								getCode();
							})
							clearInterval(a);
						} else {
							count--;
						}
					}, 1000)
				} else {
					$('#codeGet').on('click', function() {
						getCode();
					})
					alert(data.INFO)
				}
			}
		})
	} else {
		alert('请完善信息！');
	}
}

$('#next1').on('click', function() {
	if ($.trim($('#phone').val()) != '' && $.trim($('#code').val()) != '') {
		$.ajax({
			type: 'POST',
			url: '../sender/CardSenderAction!checkPhone.zk',
			data: {
				phone: $('#phone').val(),
				smsCode: $('#code').val()
			},
			success: function(data) {
				data = eval('(' + data + ')');
				if (data.STATUS) {
					$('.step-1').hide();
					$('.step-2').show();
				} else {
					alert(data.INFO)
				}
			}
		})
	} else {
		alert('请完善信息！');
	}
})

$('#next2').on('click', function() {
	if ($.trim($('#name').val()) != '') {
		$.ajax({
			type: 'POST',
			url: '../sender/CardSenderAction!getCard.zk',
			data: {
				phone: $('#phone').val(),
				smsCode: $('#code').val(),
				realName: $('#name').val(),
				sex: $('#sex').val(),
				birthday: '1970-01-01'
			},
			success: function(data) {
				data = eval('(' + data + ')');
				if (data.STATUS) {
					$('.step-2').hide();
					$('.step-3').show();
				} else {
					alert(data.INFO)
				}
			}
		})
	} else {
		alert('请完善信息！');
	}
})

/**
 * 获取数据
 * 
 * @returns {Boolean}
 */
// var countShow = 0;
// var refresh_count = 0;
function refreshView() {
	var deviceData = refreshSportData();
	// countShow++;
	alert(deviceData)
	if (deviceData) { // 在app里面
		// $('.operationDiv').show();
		// $('#operationBtn').show();
		$('header').hide();
		// alert(deviceData);
	} else { // 不是在app里面
		// $('.operationDiv').hide();
		// $('#operationBtn').hide();
		// if (countShow == 3) {
		$('header').show();
		// alert(deviceData);
		// }
	}
	// if (refresh_count % 5 == 0) {
	// 	rankList();
	// }
	// refresh_count++;
	// setTimeout("refreshView()", 1000);
}

function refreshSportData() {
	// if (!window.WebViewJavascriptBridge) {
	// 	return false;
	// }
	window.WebViewJavascriptBridge.callHandler('ArenaPushDeviceData', {},
		function(responseData) {
			var deviceData = responseData;
		});
	return deviceData;
}