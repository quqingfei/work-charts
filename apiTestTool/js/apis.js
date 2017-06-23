/**
*
*/
zkAPI = {

	/**********APP APIS *******/
	zkapis :[
	        /*****loginAction*****/
			{
			 apis : [
			            {	"url" : 'loginAction!login.zk',
			            	"name":"login",
			            	"desc":"用户登录",
			            	"paras" : [{"field":"user_id","desc":"手机号"},{"field":"user_pwd","desc":"密码"}]
			            },			            
			            {	"url" : 'loginAction!login2.zk',
			            	"name":"login2",
			            	"desc":"用户登录,使用数据加密",
			            	"paras" : [{"field":"data","desc":"(AES加密,base64编码){\"userId\":\"admin\",\"userPwd\":\"admin\",\"appversion\":\"a103/i103\",\"t\":\"140000000000\"}"},{"field":"key","desc":"(RSA加密,base64编码)AES密钥"}]
			            },
			            {	"url" : 'loginAction!logout.zk',
			            	"name":"logout",
			            	"desc":"用户注销",
			            	"paras" : []
			            },
			            {	"url" : 'loginAction!time.zk',
			            	"name":"time",
			            	"desc":"同步服务器时间",
			            	"paras" : []
			            },
			            {	"url" : 'loginAction!register.zk',
			            	"name":"register",
			            	"desc":"用户注册",
			            	"paras" : [{"field":"user_id","desc":"手机号"},
			            	           {"field":"user_pwd","desc":"密码"},
			            	           {"field":"user_name","desc":"昵称"},
			            	           {"field":"user_sex","desc":"性别"},
			            	           {"field":"user_age","desc":"年龄"},
			            	           {"field":"user_height","desc":"身高"},
			            	           {"field":"user_weight","desc":"体重"},
			            	           {"field":"user_bmi","desc":"BMI"},
			            	           {"field":"head_icon","desc":"头像"},
			            	           {"field":"user_gps_x","desc":"GPSX"},
			            	           {"field":"user_gps_y","desc":"GPSY"},
			            	           {"field":"user_address","desc":"地址"},
			            			   {"field":"sms_code","desc":"短信验证码"}]
			            },
			            {	"url" : 'loginAction!exist.zk',
			            	"name":"exist",
			            	"desc":"用户是否已经注册",
			            	"paras" : [{"field":"userId","desc":"手机号"}]
			            },
			            {	"url" : 'loginAction!smsCode.zk',
			            	"name":"smsCode",
			            	"desc":"获取短信验证码",
			            	"paras" : [{"field":"phone","desc":"手机号"}]
			            },
			            {	"url" : 'loginAction!resetPwd.zk',
			            	"name":"resetPwd",
			            	"desc":"重置用户密码",
			            	"paras" : [{"field":"userId","desc":"手机号"},{"field":"newPwd","desc":"新密码"},
			            	           {"field":"newPwdConfirm","desc":"新密码确认"},{"field":"smsCode","desc":"短信验证码"}]
			            },
			            {	"url" : 'loginAction!avatar.zk',
			            	"name":"avatar",
			            	"desc":"获取用户头像",
			            	"paras" : [{"field":"userId","desc":"手机号"}]
			            },
			            {	"url" : 'PushAction.zk',
			            	"name":"avatar",
			            	"desc":"发送环信CMD消息",
			            	"paras" : [{"field":"userIds","desc":"用户id,用逗号分隔"},
			            	           {"field":"ext","desc":"ext"},
			            	           {"field":"action","desc":"action"}]
			            }
			        ]
		   },
	        /*****userAction*****/
		   {
			 apis : [
			            {	"url" : 'userAction!newRelationUser.zk',
			            	"name":"newRelationUser",
			            	"desc":"创建关系用户",
			            	"paras" : [{"field":"userId","desc":"手机号"},{"field":"userRelation","desc":"关系"},
			            	           {"field":"sex","desc":"性别"},{"field":"age","desc":"年龄"},
			            	           {"field":"height","desc":"身高"},{"field":"weight","desc":"体重"},
			            	           {"field":"bmi","desc":"BMI"},{"field":"remark","desc":"昵称"},
			            	           {"field":"headIcon","desc":"头像"}]
			            },
			            {	"url" : 'userAction!updateRelationalUser.zk',
			            	"name":"updateRelationalUser",
			            	"desc":"更新关系用户",
			            	"paras" : [{"field":"id","desc":"关系用户ID"},{"field":"userRelation","desc":"关系"},
			            	           {"field":"remark","desc":"昵称"},{"field":"headIcon","desc":"头像"},
			            	           {"field":"sex","desc":"性别"},{"field":"age","desc":"年龄"},
			            	           {"field":"height","desc":"身高"}]
			            },
			            {	"url" : 'userAction!getRelationalUser.zk',
			            	"name":"getRelationalUser",
			            	"desc":"获取关系用户",
			            	"paras" : []
			            },
			            {	"url" : 'userAction!delRelationUser.zk',
			            	"name":"delRelationUser",
			            	"desc":"删除关系用户",
			            	"paras" : [{"field":"id","desc":"关系用户ID"}]
			            },
			            {	"url" : 'userAction!uploadHealthData.zk',
			            	"name":"uploadHealthData",
			            	"desc":"上传健康数据,单个上传，旧版本APP使用（已过时，）",
			            	"paras" : [{"field":"userId","desc":"用户ID"},{"field":"weight","desc":"体重"},
			            	           {"field":"bmi","desc":"BMI"},{"field":"steps","desc":"踏步数"},
			            	           {"field":"usedTime","desc":"使用时长"},{"field":"calorie","desc":"消耗卡路里"},
			            	           {"field":"uploadTime","desc":"上传时间"},{"field":"userRelationId","desc":"关系用户ID"},
			            	           ]
			            },
			            {	"url" : 'userAction!uploadHealthData2.zk',
			            	"name":"uploadHealthData2",
			            	"desc":"上传健康数据,批量上传",
			            	"paras" : [{"field":"data","desc":"详情参考旧版本，健康数据集合,示例:[{\"bmi\":20,\"calorie\":30,\"steps\":200,\"uploadTime\":20140918105024,\"usedTime\":10,\"userId\":\"13036149029\",\"weight\":89.5}]"}]
			            },
			            {	"url" : 'userAction!levelAndRank.zk',
			            	"name":"levelAndRank",
			            	"desc":"查看等级和排名等用户信息(等级和排名只针对主用户）",
			            	"paras" : [{"field":"relationId","desc":"关系用户ID"}]
			            },
			            {	"url" : 'userAction!updateUser.zk',
			            	"name":"updateUser",
			            	"desc":"更新用户信息",
			            	"paras" : [{"field":"userId","desc":"手机号"},{"field":"oldPwd","desc":"密码"},
			            	           {"field":"newPwd","desc":"新密码"},{"field":"userName","desc":"昵称"},
			            	           {"field":"headIcon","desc":"头像"},{"field":"sex","desc":"性别"},
			            	           {"field":"age","desc":"年龄"},{"field":"height","desc":"身高"}]
			            },
			            {	"url" : 'userAction!updatePwd.zk',
			            	"name":"updatePwd",
			            	"desc":"修改用户密码",
			            	"paras" : [{"field":"oldPwd","desc":"密码"},{"field":"newPwd","desc":"新密码"},
			            	           {"field":"newPwdConfirm","desc":"密码确认"}]
			            },
			            {	"url" : 'userAction!updateUserInfo.zk',
			            	"name":"updateUserInfo",
			            	"desc":"更新用户信息",
			            	"paras" : [{"field":"userName","desc":"昵称"},{"field":"headIcon","desc":"头像"},
			            	           {"field":"sex","desc":"性别"},{"field":"birthYear","desc":"出生年"},
			            	           {"field":"height","desc":"身高"}]
			            },
			            {	"url" : 'userAction!sportsRank2.zk',
			            	"name":"sportsRank2",
			            	"desc":"查询运动排行（根据总踏步数）",
			            	"paras" : [{"field":"pageIndex","desc":"页码"},{"field":"pageSize","desc":"每页大小"},
			            	           {"field":"type","desc":"talent:达人 lazy:懒人"}]
			            },
			            {	"url" : 'userAction!sportsRankOfMonth.zk',
			            	"name":"sportsRankOfMonth",
			            	"desc":"查询月度(近30天)运动排行",
			            	"paras" : [{"field":"pageIndex","desc":"页码"},{"field":"pageSize","desc":"每页大小"},
			            	           {"field":"type","desc":"talent:达人 lazy:懒人"}]
			            },
			            {	"url" : 'userAction!dataAnalyze.zk',
			            	"name":"dataAnalyze",
			            	"desc":"用户数据分析",
			            	"paras" : [{"field":"pageIndex","desc":"页码"},{"field":"userId","desc":"(关系)用户ID"},
			            	           {"field":"isRelationUser","desc":"是否为关系用户: n:否(默认值);y:是"},{"field":"type","desc":"d:天(默认值);m:月"}]
			            },
			            {	"url" : 'userAction!userData.zk',
			            	"name":"userData",
			            	"desc":"获取用户信息",
			            	"paras" : [{"field":"userRelationId","desc":"关系用户ID"}]
			            }
			        ]
		   },	
	        /*****noteAction*****/
		   {
			 apis : [
			            {	"url" : 'noteAction!newNote.zk',
			            	"name":"newNote",
			            	"desc":"发帖",
			            	"paras" : [{"field":"noteContent","desc":"帖子内容"},{"field":"noteImages","desc":"图片 字符串，多个图片使用JSON数组"},
			            	           {"field":"GPSX","desc":"GPSX"},{"field":"GPSY","desc":"GPSY"},
			            	           {"field":"address","desc":"地理位置"}]
			            },
			            {	"url" : 'noteAction!complaint.zk',
			            	"name":"complaint",
			            	"desc":"举报帖子",
			            	"paras" : [{"field":"noteId","desc":"帖子ID"},{"field":"reason","desc":"投诉理由	<ul><li>e : 色情</li><li>f : 欺诈</li><li>h : 骚扰</li><li>t : 侵权</li><li>o : 其他</li></ul>"},
			            	          ]
			            },
			            {	"url" : 'noteAction!newNoteReply.zk',
			            	"name":"newNoteReply",
			            	"desc":"回帖",
			            	"paras" : [{"field":"noteId","desc":"帖子ID"},{"field":"replyContent","desc":"回帖内容"},
			            	           {"field":"toUserId","desc":"回复给某用户ID"},{"field":"toUserName","desc":"回复给用户昵称"},
			            	           {"field":"GPSX","desc":"GPSX"},{"field":"GPSY","desc":"GPSY"},
			            	           {"field":"address","desc":"地理位置"}]
			            },
			            {	"url" : 'noteAction!delete.zk',
			            	"name":"delete",
			            	"desc":"删（回）帖子",
			            	"paras" : [{"field":"id","desc":"帖子ID"},{"field":"isReply","desc":"是否为回帖 y:是 n:否"}]
			            },
			            {	"url" : 'noteAction!list.zk',
			            	"name":"list",
			            	"desc":"拉取帖子,只限APP使用",
			            	"paras" : [{"field":"pageIndex","desc":"页码"},{"field":"pageSize","desc":"每页大小"}]
			            },
			            {	"url" : 'noteAction!list4.zk',
			            	"name":"list4",
			            	"desc":"拉取帖子（包含点赞）,只限APP使用",
			            	"paras" : [{"field":"pageIndex","desc":"页码"},{"field":"pageSize","desc":"每页大小"}]
			            },
			            {	"url" : 'noteAction!list5.zk',
			            	"name":"list5",
			            	"desc":"拉取帖子（包含点赞）,只限APP使用将noteImages改为对象数组，之前为字符串数组，增加网页链接显示 modify @ 2014年11月13日11:24:32",
			            	"paras" : [{"field":"pageIndex","desc":"页码"},{"field":"pageSize","desc":"每页大小"}]
			            },		
			            {	"url" : 'noteAction!unreadMessage.zk',
			            	"name":"unreadMessage",
			            	"desc":"获取未读消息条数",
			            	"paras" : []
			            },	
			            {	"url" : 'noteAction!viewUnreadMessage.zk',
			            	"name":"viewUnreadMessage",
			            	"desc":"查看未读消息",
			            	"paras" : []
			            },	
			            {	"url" : 'noteAction!viewUnreadMessage1.zk',
			            	"name":"viewUnreadMessage1",
			            	"desc":"查看未读消息,noteImages对象数组",
			            	"paras" : []
			            },	
			            {	"url" : 'noteAction!like.zk',
			            	"name":"like",
			            	"desc":"帖子点赞",
			            	"paras" : [{"field":"noteId","desc":"帖子ID"}]
			            },	
			            {	"url" : 'noteAction!dislike.zk',
			            	"name":"dislike",
			            	"desc":"取消帖子点赞",
			            	"paras" : [{"field":"noteId","desc":"帖子ID"}]
			            }
			        ]
		   },	
	        /*****FriendAction*****/
		   {
			 apis : [
			            {	"url" : 'FriendAction!request.zk',
			            	"name":"request",
			            	"desc":"请求加好友",
			            	"paras" : [{"field":"toUserId","desc":"对方ID"},{"field":"content","desc":"备注"}]
			            },
			            {	"url" : 'FriendAction!handleRequest.zk',
			            	"name":"handleRequest",
			            	"desc":"处理加好友",
			            	"paras" : [{"field":"id","desc":"加好友请求ID"},{"field":"state","desc":"<ul><li>3:同意</li><li>2拒绝</li></ul>"},
			            	           {"field":"content","desc":"备注"}
			            	          ]
			            },
			            {	"url" : 'FriendAction!getRequest.zk',
			            	"name":"getRequest",
			            	"desc":"获取加好友请求",
			            	"paras" : []
			            },
			            {	"url" : 'FriendAction!handleResult.zk',
			            	"name":"handleResult",
			            	"desc":"获取加好友请求结果",
			            	"paras" : []
			            },
			            {	"url" : 'FriendAction!get.zk',
			            	"name":"get",
			            	"desc":"获取好友",
			            	"paras" : []
			            },
			            {	"url" : 'FriendAction!delete.zk',
			            	"name":"delete",
			            	"desc":"删除好友",
			            	"paras" : [{"field":"friendId","desc":"好友ID"}]
			            }
			        ]
		   },	
		],
	get	: function(index){
		return this.zkapis[index].apis;
	},
	/*getURL	: function(index){
		return this.zkapis[index].url;
	}*/

};