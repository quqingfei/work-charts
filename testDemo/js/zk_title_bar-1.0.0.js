/**
 * @ren.shi
 */
var zk_isFS = false; // �����Ƿ�ȫ��
var zk_x, zk_y, zk_winX, zk_winY;
var zk_drag = false;
function TitleBar(id, color, text, icon) {
	document.body.onselectstart = function() {
		document.body.style.cursor = "default";
		return false;
	};
	var zk_a = "display:block;text-decoration:none;width:30px;height:30px;line-height:30px;text-align:center;margin:0px;";
	var zk_ul = "float:right;width:93px;height:30px;list-style:none;margin:0px;";
	var zk_li = "float:left;text-align:center;line-height:30px;width:30px;";
	var zk_span = "display:inline-block;margin-top:7px;filter:alpha(opacity=30);width:14px;height:14px;";
	var zk_p = "margin-top:0px;float:left;height:100%;line-height:30px;padding-left:35px;font-family:'STHei','Microsoft YaHei','WenQuanYi Micro Hei',sans-serif;font-weight:normal;font:14px;background:url('"
			+ icon + "') no-repeat 10px center;cursor:default;font-size:13px;";

	var zk_minb = "background:url('./css/images/windowicon.png') no-repeat 0px center";
	var zk_maxb = "background:url('./css/images/windowicon.png') no-repeat -46px center";
	var zk_closeb = "background:url('./css/images/windowicon.png') no-repeat -66px center";

	var zk_html = "<p style=\""
			+ zk_p
			+ "\">"
			+ text
			+ "</p>"
			+ "<ul style=\""
			+ zk_ul
			+ "\"><li style=\""
			+ zk_li
			+ "\"><a id=\"min\" style=\""
			+ zk_a
			+ "\" href=\"#\" onclick=\"zk_win_action('min')\" onmouseover=\"zk_mouse_over('min','in')\" onmouseout=\"zk_mouse_over('min','out')\"><span style=\""
			+ zk_span
			+ zk_minb
			+ "\"></span></a></li>"
			+ "<li style=\""
			+ zk_li
			+ "\"><a id=\"max\" style=\""
			+ zk_a
			+ "\" href=\"#\" onclick=\"zk_win_action('max')\" onmouseover=\"zk_mouse_over('max','in')\" onmouseout=\"zk_mouse_over('max','out')\"><span style=\""
			+ zk_span
			+ zk_maxb
			+ "\"></span></a></li>"
			+ "<li style=\""
			+ zk_li
			+ "\"><a id=\"close\" style=\""
			+ zk_a
			+ "\" href=\"#\" onclick=\"zk_win_action('close')\" onmouseover=\"zk_mouse_over('close','in')\" onmouseout=\"zk_mouse_over('close','out')\"><span style=\""
			+ zk_span + zk_closeb + "\"></span></a></li></ul>";

	var zk_target = document.getElementById(id);
	zk_target.style.cssText = "position:fixed;width:100%;top:0px;z-index:100000;height:30px;background:"
			+ color
			+ ";margin:0px;color:#ffffff;padding:0px;cursor:default;border-bottom:1px #333 solid;";
	zk_target.innerHTML = zk_html;
	zk_target.onselectstart = function() {
		return false;
	};
	zk_target.ondblclick = function() {
		if (zk_isFS) {
			window.zk_setNormal();
			zk_isFS = false;
		} else {
			window.zk_setMax();
			zk_isFS = true;
		}
	};

	zk_target.onmousedown = function(e) {
		zk_drag = true;
		zk_x = e.pageX;
		zk_y = e.pageY;
	};

	zk_target.onmouseup = function(e) {
		zk_drag = false;
	};
	zk_target.onmouseout = function(e) {
		zk_drag = false;
	};
	zk_target.onmousemove = function(e) {
		if (!zk_drag || zk_isFS)
			return true;
		var offx = e.pageX - zk_x;
		var offy = e.pageY - zk_y;
		window.zk_setPosition(window.zk_Win_X() + offx, window.zk_Win_Y()
				+ offy);
	}
};

/**
 * 窗口事件
 * 
 * @param id
 */
function zk_win_action(id) {
	if (id == "min") {
		window.zk_setMin();
	} else if (id == "max") {
		if (zk_isFS) {
			window.zk_setNormal();
			zk_isFS = false;
		} else {
			window.zk_setMax();
			zk_isFS = true;
		}
	} else if (id == "close") {
		window.zk_Exit();
	}
}

/**
 * 鼠标事件
 * 
 * @param id
 * @param isin
 */
function zk_mouse_over(id, isin) {
	if (isin == "in")
		document.getElementById(id).style.backgroundColor = "#222222";
	else
		document.getElementById(id).style.backgroundColor = "";
}