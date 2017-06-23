/**
 * 
 */
$(function(){
	var t = $('#phone');
	t.blur(function(){
		var v = $(this).val();
		alert(v);
	});
	
});

function phoneChange(newV,oldV){
	var url = '../manage/QueryAction!getRelation.zk?phone='+newV;
	$('#relations').combobox('reload', url);
}

/**
 * 时间对象的格式化
 */
Date.prototype.format = function(format) {
	/*
	 * format="yyyy-MM-dd hh:mm:ss";
	 */
	var o = {
		"M+" : this.getMonth() + 1,
		"d+" : this.getDate(),
		"h+" : this.getHours(),
		"m+" : this.getMinutes(),
		"s+" : this.getSeconds(),
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		"S" : this.getMilliseconds()
	};

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}

	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};

function formatDate(value){
    var d = new Date(value);   
    return  d.format("yyyy-MM-dd hh:mm:ss");  
}

function formatUploadTime(value){
    var date = '20'+value;   
    var y = date.substring(0,4);
    var m = date.substring(4,6);
    var d = date.substring(6,8);
    var h = date.substring(8,10);
    var mm = date.substring(10,12);
    var s = date.substring(12,14);
    var format = y+"-"+m+"-"+d+" "+h+":"+mm+":"+s;
    console.log(date + ">>"+format);
    return format;  
}

function searchData(){
	var phone = $('#phone').textbox('getValue');
	var dateType = $('#dateType').combobox('getValue');
	var relationId = $('#relations').combobox('getValue');
	var startDate = $('#startDate').textbox('getValue');
	var endDate = $('#endDate').textbox('getValue');
	if(!phone){
		alert('电话号码不能为空!');
		return ;
	}
	if(!startDate&&!endDate){
		alert('至少要填写一个日期!');
		return ;
	}
	$("#dg").datagrid({
			url:'../manage/QueryAction!query.zk',
			queryParams:{
				phone:phone,
				relationId:relationId,
				dateType:dateType,
				startDate:startDate,
				endDate: endDate
			}
	});
}