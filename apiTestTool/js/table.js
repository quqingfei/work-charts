/**
 * 
 */

	String.prototype.replaceAll = function(s1, s2) {
	    return this.replace(new RegExp(s1, "gm"), s2)
	}
	function newRequest(){
		$("#Canvas").hide();
		var data = [];
		var $paras = $("#paras");
		$paras.children('div').each(function(){
			var paraName = $(this).find(":input[name='paraName']").val();
			var paraVal = $(this).find(":input[name='paraVal']").val();
			var para = '"'+paraName + '"' +':' + '"' + paraVal + '"';
			data.push(para);
		});
		//console.log(data.join(','));
		//var url = '../noteAction!list22.zk?pageIndex=1&pageSize=6';
		var $url = $("#url");
		var $method = $("#method");
		var url = $.trim($url.val());
		if(url=='' || url.lastIndexOf('.zk') < 1){
			$url.focus();
			return ;
		}
		var method = $method.val();
		//alert('url:'+url+',method:'+method+',data:');
		var dataStr = '{'+data.join(',')+'}';
		//dataStr = dataStr.replaceAll("\"", '\\"');
		//console.log(dataStr);
		console.log(JSON.parse(dataStr));
		var $state = $("#state");
		$.ajax({
			url  : '../' +	url, 
			type : method ,
			data : JSON.parse(dataStr) ,
			success: function(data){
				//console.log('response data:'+data);
				$("#Canvas").show();
				$('#RawJson').val(data);
				Process();
	      	},
	      	beforeSend: function (){
	      		$("#btnSubmit").attr('disabled',true);
	      		$state.html('<img src=\"css/loading.gif\" >正在处理中...');
	      	},
	      	error: function (){
	      		$state.html('<span class="label label-warning">连接超时，无法处理请求</span>');
	      	},
	      	complete: function (){
	      		$("#btnSubmit").attr('disabled',false);
	      		$state.html('<span class="label label-success">已经完成请求，响应结果如下:</span>');
	      	}
		});
	}
	
	function addParas(){
		var paras = "<div class=\"para\"><input type=\"text\" name=\"paraName\" placeholder=\"名称\" style=\"width:230px;\" /> "+
		"<input type=\"text\" name=\"paraVal\" placeholder=\"值\" style=\"width:230px;\" /> "+
		"<a href=\"javascript:void(0)\" title=\"添加\" onclick=\"addParas()\">+</a> "+
		"<a href=\"javascript:void(0)\" title=\"删除\" onclick=\"delParas(this)\">-</a> </div> ";
		$(paras).appendTo("#paras");
	}
	function delParas(e){
		var $para = $(e).parent();
		$parent = $para.parent();
		var len = $parent.children('div').length;
		if(len > 1){
			$para.remove();
		}
	}
	
	$(function(){
		$('#uploader').uploadify({
			'buttonText' : '选择文件',
			'buttonImage' : 'js/uploadify/browse-btn.png',
			//'buttonClass' : 'btn btn-primary',
			//'height' : 40 ,
			//'width' : 80 ,
			'swf'      : 'js/uploadify/uploadify.swf',
			'uploader' : '../file/FileCenter!upload.zk' ,
			'onUploadSuccess' : function(file, data, response) {
				data = $.parseJSON(data);
				var uploadFile = {
					"name": data.Filedata,
					"original": file.name,
					"type": file.type.toLowerCase()
				};
				var tr = "<tr><td>"+file.name+"</td><td>"+data.Filedata+"</td></tr>";
				$("#files").show();
				$("#files").append(tr);
		    } 
		});
	});
	
	function parseParaHTML(paras){
		var result = [];
		var paranames = [];
		var lis = [];
		var ul = '';
		if(paras.length > 0){
			for(var i = 0 ;i<paras.length;i++){
				var li = "<li><code>"+paras[i].field+"</code> "+paras[i].desc+"</li>";
				paranames.push(paras[i].field);
				lis.push(li);
			}
			ul = "<ul>"+lis.join('')+"</ul>";
		}
		result.push(paranames);
		result.push(ul);
		return result;
	}
	//显示API
	function showAPI(api){
		var $apis = $('#apis');
		//var url = zkAPI.getURL(api);
		var apis = zkAPI.get(api);
		//var apis = [{"name":"logout","desc":"用户注销"},{"name":"login2","desc":"用户登录,使用数据加密"},{"name":"time","desc":"同步服务器时间"}];
		
		var trs = [];
		for(var i = 0 ;i<apis.length;i++){
			var parseResult = parseParaHTML(apis[i].paras);
			var paras = parseResult[0];
			var ul = parseResult[1];
			var tr = "<tr><td><a href=\"javascript:void(0)\" onclick=\"fillForm('"+apis[i].url+"','"+paras.join(',')+"')\">"+apis[i].name+"</a></td><td>"+apis[i].desc+"</td><td>"+ul+"</td></tr>";
			trs.push(tr);
		}
		$apis.find('tr').not(':first').empty();
		$apis.append(trs.join(''));
		$apis.show();
		$('html,body').animate({scrollTop:$apis.offset().top-105},500);
	}
	
	function fillForm(url,data){
		$('#url').val(url);
		// data = name,age,sex
		// data =[{"field":"name","desc":"姓名"}，{"field":"age","desc":"年龄"}]
		//var paras = [{"field":"name","desc":"姓名"},{"field":"age","desc":"年龄"}];
		var paras = data.split(',');
		if(paras.length > 0 ){
			$('#paras').empty();
			for(var i = 0 ;i<paras.length;i++){
				var parasHTML = "<div class=\"para\"><input type=\"text\" name=\"paraName\" placeholder=\"名称\" style=\"width:230px;\" value=\""+paras[i]+"\"/> "+
				"<input type=\"text\" name=\"paraVal\" placeholder=\"值\" style=\"width:230px;\" /> "+
				"<a href=\"javascript:void(0)\" title=\"添加\" onclick=\"addParas()\">+</a> "+
				"<a href=\"javascript:void(0)\" title=\"删除\" onclick=\"delParas(this)\">-</a> </div> ";
				$(parasHTML).appendTo("#paras");
			}
		}
		$('html,body').animate({scrollTop:$(document).height()},500);
	}
	
	$(function(){
		$.post('../userAction!userData.zk',{},function(data){
			var userId = data.user.userId;
			$('#uid').text(userId);
		},'json');
	});