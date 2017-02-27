var requestify = require('requestify');
var config = require('../config/config.js');
var db = require('../config/db.js');
var timeUtil = require('./timeUtil.js').TimeUtil;
var signUtil = require('./signUtil.js').SignUtil;
var HttpsUtil = require('./httpsUtil.js').HttpsUtil;
var mysql = require('mysql');
var resultJson = require('./message.js').resultJson;
var message = require('./message.js').message;
var baseUrl=config.engine.url;
var querystring = require("querystring");
var connection = mysql.createConnection(db.db);
var sms = require('./sms.js').sms;
connection.connect();
/**
*author:shenyhang
*date 2017-02-20
*description aip class
*/
var payMent = {
	//创建激活会员
	create_activate_member:function(user_id,client_ip,callback){
		var _this = payMent;
		var client_ips = client_ip.split(":");
		var nosign = {
				"_input_charset":config.baseData.charset,
				"client_ip":client_ips[client_ips.length-1],
				"identity_id":user_id,
				"identity_type":config.baseData.identity_type,
				"member_type":config.baseData.member_type,
				"partner_id":config.baseData.testshopId,
				"request_time":timeUtil.getRequestTime(),
				"service":"create_activate_member",
				"version":config.baseData.version
			};
		//rsa加密
		var signResult = signUtil.createSign(nosign);
			if(signResult.status!=0){
				//校验该用户是否激活过
				_this.checkMember(user_id,function(checkResult){
					if(checkResult){
						callback(new resultJson(0,"Err_userId_exist"));
					}else{
						var post_data = {
							service:'create_activate_member',
							version:config.baseData.version,
							request_time:timeUtil.getRequestTime(),
							partner_id:config.baseData.testshopId,
							_input_charset:config.baseData.charset,
							sign_type:config.baseData.sign_type,
							sign:encodeURIComponent(signResult.message),
							identity_id: user_id,
							identity_type:config.baseData.identity_type,
							member_type:config.baseData.member_type,
							client_ip:client_ips[client_ips.length-1]
						} 
						//请求新浪
						HttpsUtil.post(post_data,"member",function(rsdata){
							console.log(rsdata);
							var backData = rsdata;
							if(rsdata.status!=0){
								//保存到本地数据库
								_this.saveMemberInfo(user_id,function(saveResult){
									if(saveResult){
										callback(new resultJson(1,backData.message));
									}else{
										callback(new resultJson(0,backData.message));
									}
								});
							}else{
								callback(new resultJson(0,backData.message));
							}
						});		
					}
				});
			}
	},
	//本地数据库保存激活会员信息
	saveMemberInfo:function(user_id,callback){
		var sql = "INSERT INTO hft_sina_info(user_id,sina_uid,real_name,is_bind_identity_card,is_bind_card,is_set_paykey,is_create_member,create_date,update_date) VALUES(?,?,?,?,?,?,?,?,?)";
		var create_date = new Date().getTime();
		var sql_param = [user_id,user_id,user_id,'0','0','0','1',create_date,create_date];
		connection.query(sql,sql_param,function(error,result,feilds){
			console.log(error);
			if(error){
				callback(false);
			}else{
				callback(true);
			}
		});
	},
	//查询数据库该用户是否创建激活过新浪会员
	checkMember:function(user_id,callback){
		var sql = "select * from hft_sina_info where user_id=?";
		var sql_param = [user_id];
		connection.query(sql,sql_param,function(error,result,feilds){
			if(error){
				callback(false);
			}else if(result.length==0){
				callback(false);
			}else{
				callback(result);
			}
		});
	},
	//查询是否已经实名
	queryRealNameAuthentication:function(user_id,callback){
		var _this = payMent;
		_this.checkMember(user_id,function(result){
			if(result){
				 if(result[0].is_bind_identity_card==1){
					callback(new resultJson(1,"Suc_RealNameAuthentication"));
				}else if(result[0].is_bind_identity_card==0){
					callback(new resultJson(0,"ERR_No_RealNameAuthentication"));
				}
			}else{
				callback(new resultJson(0,"ERR_No_RealNameAuthentication"));
			}
		});
	},
	//设置支付密码
	set_pay_password:function(user_id,client_ip,callback){
		var _this = payMent;
		//查询新浪服务器是否设置支付密码
		_this.queryquerySetPayKeySina(user_id,client_ip,function(result){
			if(result.status!=0){
				if(result.message.is_set_paypass=='N'){
					var client_ips = client_ip.split(":");
					var nosign = {
							"client_ip":client_ips[client_ips.length-1],
							"_input_charset":config.baseData.charset,
							"identity_id":user_id,
							"identity_type":config.baseData.identity_type,
							"partner_id":config.baseData.testshopId,
							"request_time":timeUtil.getRequestTime(),
							"service":"set_pay_password",
							"version":config.baseData.version
						};
					//rsa加密
					var signResult = signUtil.createSign(nosign);
					if(signResult.status!=0){
						var post_data = {
								service:'set_pay_password',
								version:config.baseData.version,
								request_time:timeUtil.getRequestTime(),
								partner_id:config.baseData.testshopId,
								_input_charset:config.baseData.charset,
								sign_type:config.baseData.sign_type,
								sign:encodeURIComponent(signResult.message),
								identity_id: user_id,
								identity_type:config.baseData.identity_type,
								client_ip:client_ips[client_ips.length-1]
							}
						//请求新浪设置支付密码
						HttpsUtil.post(post_data,"member",function(rsdata){
							var backData = rsdata;
							if(rsdata.status!=0){
								callback(new resultJson(1,backData.message));
							}else{
								callback(new resultJson(0,backData.message));
							}
						});	
					}
				}else{
					//修改本地新浪表的是否支付密码字段
					_this.modifyIsSetPayKey(user_id,function(backRs){
						if(backRs){
							callback(new resultJson(0,"Suc_Had_SetPayKey"));
						}else{
							callback(new resultJson(0,"Suc_Had_SetPayKey"));
						}
					});
				}
			}
		});
	},
	//请求新浪查询是否设置过支付密码
	queryquerySetPayKeySina:function(user_id,client_ip,callback){
		var client_ips = client_ip.split(":");
		var nosign = {
				"client_ip":client_ips[client_ips.length-1],
				"_input_charset":config.baseData.charset,
				"identity_id":user_id,
				"identity_type":config.baseData.identity_type,
				"partner_id":config.baseData.testshopId,
				"request_time":timeUtil.getRequestTime(),
				"service":"query_is_set_pay_password",
				"version":config.baseData.version
			};
		//rsa加密
		var signResult = signUtil.createSign(nosign);
		if(signResult.status!=0){
			var post_data = {
					service:'query_is_set_pay_password',
					version:config.baseData.version,
					request_time:timeUtil.getRequestTime(),
					partner_id:config.baseData.testshopId,
					_input_charset:config.baseData.charset,
					sign_type:config.baseData.sign_type,
					sign:encodeURIComponent(signResult.message),
					identity_id: user_id,
					identity_type:config.baseData.identity_type,
					client_ip:client_ips[client_ips.length-1]
				} 
			//请求新浪
			HttpsUtil.post(post_data,"member",function(rsdata){
				var backData = rsdata;
				if(rsdata.status!=0){
					callback(new resultJson(1,backData.message));
				}else{
					callback(new resultJson(0,backData.message));
				}
			});	
		}
	},
	//查询是否设置支付密码(本地数据库查是否设置)
	querySetPayKey:function(user_id,client_ip,callback){
		var _this = payMent;
		//查询新浪服务器是否设置支付密码
		_this.queryquerySetPayKeySina(user_id,client_ip,function(result){
			console.log(result);
			if(result.status!=0){
				if(result.message.is_set_paypass=="Y"){
					//查询是否设置支付密码(本地数据库查是否设置)
					_this.querySetPayKeyLocal(user_id,function(issetRes){
						if(issetRes.status!=0){
							callback(new resultJson(1,"Suc_Had_SetPayKey"));
						}else{
							//修改本地新浪表的是否支付密码字段
							_this.modifyIsSetPayKey(user_id,function(backRs){
								if(backRs){
									callback(new resultJson(1,"Suc_Had_SetPayKey"));
								}else{
									callback(new resultJson(0,"Suc_Had_SetPayKey"));
								}
							});
						}
					});
				}else{
					callback(new resultJson(0,"Err_No_PayKey"));
				}
			}else{
				callback(new resultJson(0,"Err_No_PayKey"));
			}
		});
	},
	//查询是否设置支付密码(本地数据库查是否设置)
	querySetPayKeyLocal:function(user_id,callback){
		var sql = "select is_set_paykey from hft_sina_info where user_id=?";
		var sql_param = [user_id];
		connection.query(sql,sql_param,function(error,result,feilds){
			if(error){
				callback(new resultJson(0,"Err_QueryPayKey_Fail"));
			}else if(result.length==0){
				callback(new resultJson(0,"Err_No_PayKey"));
			}else{
				if(result[0].is_set_paykey==0){
					callback(new resultJson(0,"Suc_No_PayKey"));
				}else{
					callback(new resultJson(1,"Suc_PayKey_Exist"));
				}
			}
		});
	},
	//修改新浪信息表是否设置密码字段
	modifyIsSetPayKey:function(user_id,callback){
		var sql = "update hft_sina_info set is_set_paykey=1 where user_id=?";
		var sql_param = [user_id];
		connection.query(sql,sql_param,function(error,result,feilds){
			if(error){
				callback(false);
			}else if(result.affectedRows==0){
				callback(false);
			}else{
				callback(true);
			}
		});
	},
	//找回支付密码
	find_pay_password:function(user_id,client_ip,callback){
		var client_ips = client_ip.split(":");
		var nosign = {
				"client_ip":client_ips[client_ips.length-1],
				"_input_charset":config.baseData.charset,
				"identity_id":user_id,
				"identity_type":config.baseData.identity_type,
				"partner_id":config.baseData.testshopId,
				"request_time":timeUtil.getRequestTime(),
				"service":"find_pay_password",
				"version":config.baseData.version
			};
		//rsa加密
		var signResult = signUtil.createSign(nosign);
		if(signResult.status!=0){
			var post_data = {
					service:'find_pay_password',
					version:config.baseData.version,
					request_time:timeUtil.getRequestTime(),
					partner_id:config.baseData.testshopId,
					_input_charset:config.baseData.charset,
					sign_type:config.baseData.sign_type,
					sign:encodeURIComponent(signResult.message),
					identity_id: user_id,
					identity_type:config.baseData.identity_type,
					client_ip:client_ips[client_ips.length-1]
				} 
			//请求新浪
			HttpsUtil.post(post_data,"member",function(rsdata){
				var backData = rsdata;
				if(rsdata.status!=0){
					callback(new resultJson(1,backData.message));
				}else{
					callback(new resultJson(0,backData.message));
				}
			});	
		}
	},
	//修改支付密码
	modify_pay_password:function(user_id,client_ip,callback){
		var client_ips = client_ip.split(":");
		var nosign = {
				"client_ip":client_ips[client_ips.length-1],
				"_input_charset":config.baseData.charset,
				"identity_id":user_id,
				"identity_type":config.baseData.identity_type,
				"partner_id":config.baseData.testshopId,
				"request_time":timeUtil.getRequestTime(),
				"service":"modify_pay_password",
				"version":config.baseData.version
			};
		//rsa加密
		var signResult = signUtil.createSign(nosign);
		if(signResult.status!=0){
			var post_data = {
					service:'modify_pay_password',
					version:config.baseData.version,
					request_time:timeUtil.getRequestTime(),
					partner_id:config.baseData.testshopId,
					_input_charset:config.baseData.charset,
					sign_type:config.baseData.sign_type,
					sign:encodeURIComponent(signResult.message),
					identity_id: user_id,
					identity_type:config.baseData.identity_type,
					client_ip:client_ips[client_ips.length-1]
				} 
			//请求新浪
			HttpsUtil.post(post_data,"member",function(rsdata){
				var backData = rsdata;
				if(rsdata.status!=0){
					callback(new resultJson(1,backData.message));
				}else{
					callback(new resultJson(0,backData.message));
				}
			});	
		}
	},
	//发送手机验证码
	sendPhoneCode:function(mobile,callback){
		if(mobile!=undefined){
			var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
			var checkCode = "";
			for(var i = 0; i<6; i++){
				var round = Math.round(Math.random()*arr.length+1);
				checkCode = checkCode + arr[round];
			}
			sms.send_sms(mobile,checkCode,function(result){
				if(result!=undefined){
					var status = result.split(",")[1].substring(0,1);
					//如果成功，存入message表和log表中
					var create_time = new Date().getTime();
					if(status=='0'){
						var sqlString = 'INSERT INTO hft_message(mobile,verify,alias,type,create_time,status) VALUES(?,?,?,?,?,?)';
						var sql_Params = [mobile,checkCode,"create_user",'mobile',create_time,1];
						connection.query(sqlString,sql_Params, function (error, results) {
							if(error){
								console.log(error);
							}else{
								console.log(results);				
							}
						});
						var sqlsmslogString = 'INSERT INTO hft_sms_log(telephone,uid,item_type,back_info,sendmessage_ip,create_time) VALUES(?,?,?,?,?,?)';
						var sql_smslogParams = [mobile,0,'create_user',"发送成功",0,create_time];
						connection.query(sqlsmslogString,sql_smslogParams, function (error, results) {
							if(error){
								console.log(error);
							}else{
								console.log(results);				
							}
						});
						callback(new message(1,checkCode));
					}else{
						//发送失败，存入log表中
						var sqlsmslogString = 'INSERT INTO hft_sms_log(telephone,uid,item_type,back_info,sendmessage_ip,create_time) VALUES(?,?,?,?,?,?)';
						var sql_smslogParams = [mobile,0,'create_user',"发送失败",0,create_time];
						connection.query(sqlsmslogString,sql_smslogParams, function (error, results) {
							if(error){
								console.log(error);
							}else{
								console.log(results);				
							}
						});
						callback(new message(0,interLang[config.language.type].send_check_numfail));
					}
				}else{
					callback(new message(0,interLang[config.language.type].send_check_numfail));
				}
			});
		}
	},
	//实名认证api;
	realNameAuthentication:function(identityCard,user_id,realName,client_ip,callback){
		var _this = payMent;
		var client_ips = client_ip.split(":");
		//查询该用户是否实名
		_this.checkMember(user_id,function(checkRNrs){
			if(checkRNrs){
				if(checkRNrs[0].is_bind_identity_card==0){
					//身份号码签名
					var ICsign = signUtil.encryption(identityCard);
					console.log("身份证号:"+JSON.stringify(encodeURIComponent(ICsign.message)));
					//真实姓名签名
					var real_nameSign = signUtil.encryption(realName);
					console.log("真实姓名签名:"+JSON.stringify(encodeURIComponent(real_nameSign.message)));
					var nosign = {
						"_input_charset":config.baseData.charset,
						"client_ip":client_ips[client_ips.length-1],
						"identity_id":user_id,
						"identity_type":config.baseData.identity_type,
						"real_name":real_nameSign.message,
						"cert_type":'IC',
						"cert_no":ICsign.message,
						"partner_id":config.baseData.testshopId,
						"request_time":timeUtil.getRequestTime(),
						"service":"set_real_name",
						"version":config.baseData.version
					};
					//签名
					var signResult = signUtil.createSign(nosign);
					var post_data = {
							service:'set_real_name',
							version:config.baseData.version,
							request_time:timeUtil.getRequestTime(),
							partner_id:config.baseData.testshopId,
							_input_charset:config.baseData.charset,
							sign_type:config.baseData.sign_type,
							sign:encodeURIComponent(signResult.message),
							identity_id: user_id,
							identity_type:config.baseData.identity_type,
							real_name:encodeURIComponent(real_nameSign.message),
							cert_type:'IC',
							cert_no:encodeURIComponent(ICsign.message),
							client_ip:client_ips[client_ips.length-1]
						}
					if(signResult.status!=0){
						//请求新浪
						HttpsUtil.post(post_data,"member",function(rsdata){
							if(rsdata.status!=0){
								//插入用户身份证号和真实姓名;
								_this.insertRealName(identityCard,user_id,realName,function(avRs){
									if(avRs){
										callback(new resultJson(1,rsdata.message));
									}else{
										callback(new resultJson(0,rsdata.message));
									}
								});
							}else{
								callback(new resultJson(0,rsdata.message));
							}
						});
					}
				}else{
					callback(new resultJson(0,"Err_Identity_Card_Exist"));
				}
			}else{
				callback(new resultJson(0,"Err_No_Create_Activate_Member"));
			}
		});
	},
	//插入用户身份证号和真实姓名;
	insertRealName:function(identityCard,user_id,realName,callback){
		var sql = "update fanwe_user set idno=?,real_name=?,istrue=1 where id=?";
		var sql_param = [identityCard,realName,user_id];
		connection.query(sql,sql_param,function(error,result,feilds){
			if(error){
				callback(false);
			}else if(result.affectedRows==0){
				callback(false);
			}else{
				var sql1 = "update hft_sina_info set real_name=?,is_bind_identity_card=1 where user_id=?";
				var sql_param1 = [realName,user_id];
				connection.query(sql1,sql_param1,function(errors,results,feilds){
					if(errors){
						callback(false);
					}else if(results.affectedRows==0){
						callback(false);
					}else{
						callback(true);
					}
				});
			}
		});
	},
	//绑定银行卡提交新浪获取短信验证码
	getBinding_Bank_Card:function(request_no,user_id,identity_type,bank_code,bank_account_no,card_type,card_attribute,province,city,client_ip,bank_branch,uaa_remark_name,uaa_account_type,phone_no,callback){
		var _this = payMent;
		var client_ips = client_ip.split(":");
		//银行卡号
		var bank_account_nos = signUtil.encryption(bank_account_no);
		//手机号码
		var phone_nos = signUtil.encryption(phone_no);
		console.log("银行卡号:"+JSON.stringify(encodeURIComponent(bank_account_nos.message)));
		var nosign = {
				"_input_charset":config.baseData.charset,
				"client_ip":client_ips[client_ips.length-1],
				"identity_id":user_id,
				"bank_code":bank_code,
				"identity_type":config.baseData.identity_type,
				"request_no":request_no,
				"bank_account_no":bank_account_nos.message,
				"card_type":card_type,
				"card_attribute":card_attribute,
				"verify_mode":"SIGN",
				"province":province,
				"city":city,
				"phone_no":phone_nos.message,
				"partner_id":config.baseData.testshopId,
				"request_time":timeUtil.getRequestTime(),
				"service":"binding_bank_card",
				"version":config.baseData.version
			};
		//签名
		var signResult = signUtil.createSign(nosign);
		
		var post_data = {
			service:'binding_bank_card',
			version:config.baseData.version,
			request_time:timeUtil.getRequestTime(),
			partner_id:config.baseData.testshopId,
			_input_charset:config.baseData.charset,
			sign_type:config.baseData.sign_type,
			sign:encodeURIComponent(signResult.message),
			identity_id: user_id,
			identity_type:config.baseData.identity_type,
			request_no:request_no,
			bank_account_no:encodeURIComponent(bank_account_nos.message),
			card_type:card_type,
			card_attribute:card_attribute,
			verify_mode:"SIGN",
			bank_code:bank_code,
			province:province,
			city:city,
			phone_no:encodeURIComponent(phone_nos.message),
			client_ip:client_ips[client_ips.length-1]
		}
		if(signResult.status!=0){
			//请求新浪
			HttpsUtil.post(post_data,"member",function(rsdata){
				if(rsdata.status!=0){
					//检验是否绑定过的卡号
					_this.checkBankCard(bank_account_no,function(checkBCResult){
						console.log(rsdata.message.card_id);
						if(checkBCResult){
							callback(new resultJson(0,"Err_Crad_Exist"));
						}else{
							callback(new resultJson(1,rsdata.message));
						}
					});
				}else{
					callback(new resultJson(0,rsdata.message));
				}
			});
		}
	},
	//绑定银行卡
	saveBankCardInfo:function(request_no,user_id,identity_type,bank_code,bank_account_no,card_type,card_attribute,province,city,client_ip,bank_branch,uaa_remark_name,uaa_account_type,ticket,valid_code,callback){
		var _this = payMent;
		var client_ips = client_ip.split(":");
		var nosign = {
				"_input_charset":config.baseData.charset,
				"client_ip":client_ips[client_ips.length-1],
				"ticket":ticket,
				"valid_code":valid_code,
				"partner_id":config.baseData.testshopId,
				"request_time":timeUtil.getRequestTime(),
				"service":"binding_bank_card_advance",
				"version":config.baseData.version
			};
		//签名
		var signResult = signUtil.createSign(nosign);
		var post_data = {
			service:'binding_bank_card_advance',
			version:config.baseData.version,
			request_time:timeUtil.getRequestTime(),
			partner_id:config.baseData.testshopId,
			_input_charset:config.baseData.charset,
			sign_type:config.baseData.sign_type,
			sign:encodeURIComponent(signResult.message),
			ticket:ticket,
			valid_code:valid_code,
			client_ip:client_ips[client_ips.length-1]
		}
		if(signResult.status!=0){
			//请求新浪
			HttpsUtil.post(post_data,"member",function(rsdata){
				if(rsdata.status!=0){
					//保存绑定银行卡相关数据
					_this.saveBankCardData(request_no,user_id,identity_type,bank_code,bank_account_no,card_type,card_attribute,province,city,client_ip,bank_branch,uaa_remark_name,uaa_account_type,rsdata.message.card_id,function(dataResult){
						if(dataResult){
							callback(new resultJson(1,rsdata.message));
						}else{
							callback(new resultJson(0,rsdata.message));
						}
					});
				}else{
					callback(new resultJson(0,rsdata.message));
				}
			});
		}
	},
	//保存绑定银行卡相关数据
	saveBankCardData:function(request_no,identity_id,identity_type,bank_code,bank_account_no,card_type,card_attribute,province,city,client_ip,bank_branch,uaa_remark_name,uaa_account_type,card_id,callback){
		var sql = "INSERT INTO hft_user_account_address(uaa_user_id,uaa_account_name,uaa_account_type,uaa_platform_address,uaa_user_address,uaa_remark_name,uaa_bank_deposit,request_no,identity_type,bank_code,card_type,card_attribute,province,city,client_ip,card_id,is_verified,is_sina_card,create_date,update_date) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		var create_date = new Date().getTime();
		var sql_param = [identity_id,bank_code,uaa_account_type,'xxxxxx',bank_account_no,uaa_remark_name,bank_branch,request_no,identity_type,bank_code,card_type,card_attribute,province,city,client_ip,card_id,'Y',1,create_date,create_date];
		connection.query(sql,sql_param,function(error,result,feilds){
			if(error){
				callback(false);
			}else{
				callback(true);
			}
		});
	},
	//检验是否绑定过的卡号
	checkBankCard:function(bank_account_no,callback){
		var sql = "select * from hft_user_account_address where uaa_user_address=?";
		var sql_param = [bank_account_no];
		connection.query(sql,sql_param,function(error,result,feilds){
			if(error){
				callback(false);
			}else if(result.length==0){
				callback(false);
			}else{
				callback(true);
			}
		});
	},
	//查询是否绑定银行卡
	queryIsBindCard:function(user_id,callback){
		var sql = "select is_bind_card from hft_sina_info where user_id=?"
		var sql_param = [user_id];
		connection.query(sql,sql_param,function(error,result,feilds){
			if(error){
				callback(new resultJson(0,"Err_QueryBindCard_Fail"));
			}else if(result.length==0){
				callback(new resultJson(0,"Err_QueryBindCard_Fail"));
			}else{
				console.log(result[0]);
				if(result[0].is_bind_card!=0){
					callback(new resultJson(1,"SUC_BindCard"));
				}else{
					callback(new resultJson(0,"SUC_No_BindCard"));
				}
			}
		});
	},
	//获取解绑银行卡新浪短信验证码
	getUnbindCardCode:function(user_id,client_ip,card_no,callback){
		var _this = payMent;
		//查询绑定卡的新浪卡号
		_this.queryBindCard(user_id,card_no,function(result){
			if(result.status!=0){
				var client_ips = client_ip.split(":");
				var nosign = {
						"_input_charset":config.baseData.charset,
						"client_ip":client_ips[client_ips.length-1],
						"identity_id":user_id,
						"identity_type":config.baseData.identity_type,
						"partner_id":config.baseData.testshopId,
						"request_time":timeUtil.getRequestTime(),
						"service":"unbinding_bank_card",
						"card_id":result.message,
						"advance_flag":'Y',
						"version":config.baseData.version
					};
				//rsa加密
				var signResult = signUtil.createSign(nosign);
					if(signResult.status!=0){
						var post_data = {
							service:'unbinding_bank_card',
							version:config.baseData.version,
							request_time:timeUtil.getRequestTime(),
							partner_id:config.baseData.testshopId,
							_input_charset:config.baseData.charset,
							sign_type:config.baseData.sign_type,
							sign:encodeURIComponent(signResult.message),
							identity_id: user_id,
							identity_type:config.baseData.identity_type,
							advance_flag:'Y',
							card_id:result.message,
							client_ip:client_ips[client_ips.length-1]
						};
						//请求新浪
						HttpsUtil.post(post_data,"member",function(rsdata){
							callback(new resultJson(1,rsdata.message));
						});		
					}
			}else{
				callback(new resultJson(0,result.message));
			}
		});
	},
	//解绑银行卡
	unBindCard:function(identity_id,ticket,valid_code,client_ip,callback){
		var client_ips = client_ip.split(":");
		var nosign = {
			"_input_charset":config.baseData.charset,
			"client_ip":client_ips[client_ips.length-1],
			"identity_id":identity_id,
			"identity_type":config.baseData.identity_type,
			"partner_id":config.baseData.testshopId,
			"request_time":timeUtil.getRequestTime(),
			"service":"unbinding_bank_card_advance",
			"ticket":ticket,
			"valid_code":'Y',
			"version":config.baseData.version
		};
		//rsa加密
		var signResult = signUtil.createSign(nosign);
		if(signResult.status!=0){
			var post_data = {
				service:'unbinding_bank_card_advance',
				version:config.baseData.version,
				request_time:timeUtil.getRequestTime(),
				partner_id:config.baseData.testshopId,
				_input_charset:config.baseData.charset,
				sign_type:config.baseData.sign_type,
				sign:encodeURIComponent(signResult.message),
				identity_id: identity_id,
				identity_type:config.baseData.identity_type,
				valid_code:valid_code,
				ticket:ticket,
				client_ip:client_ips[client_ips.length-1]
			};
			//请求新浪
			HttpsUtil.post(post_data,"member",function(rsdata){
				var backData = rsdata;
				if(backData.status!=0){
					//删除该绑定的银行卡
					_this.deleteBindCard(user_id,result.message,function(delRs){
						console.log(delRs);
						if(delRs){
							callback(new resultJson(1,delRs.message));
						}else{
							callback(new resultJson(0,delRs.message));
						}
					});
				}else{
					callback(new resultJson(0,backData.message));
				}
			});		
		}
	},
	//删除该绑定的银行卡
	deleteBindCard:function(user_id,card_no,callback){
		var  userDelSql = 'DELETE FROM hft_user_account_address WHERE user_id = '+user_id+" and uaa_user_address="+card_no+" and is_sina_card=1";
		connection.query(userDelSql,function (err, result) {
			if(err){
				callback(false);
			}else{
				callback(true);
			}
		});
	},
	
	//查询绑定卡的新浪卡号
	queryBindCard:function(user_id,card_no,callback){
		var sql = "select card_id from hft_user_account_address where uaa_user_id=? and uaa_user_address=? and is_sina_card=1"
		var sql_param = [user_id,card_no];
		connection.query(sql,sql_param,function(error,result,feilds){
			if(error){
				callback(new resultJson(0,"Err_QueryCard_Fail"));
			}else if(result.length==0){
				callback(new resultJson(0,"SUC_No_BindCard"));
			}else{
				if(result[0].is_bind_card!=0){
					callback(new resultJson(1,result[0].card_id));
				}else{
					callback(new resultJson(0,"SUC_No_BindCard"));
				}
			}
		});
	},
	//查询新浪绑定的银行卡
	queryCardBindSina:function(user_id,callback){
		console.log(user_id);
		var sql = "select * from hft_user_account_address where uaa_user_id=? and is_sina_card=1"
		var sql_param = [user_id];
		connection.query(sql,sql_param,function(error,result,feilds){
			if(error){
				callback(new resultJson(0,"Err_QueryCardBindSina_Fail"));
			}else if(result.length==0){
				callback(new resultJson(0,"Err_QueryCardBindSina_Fail"));
			}else{
				callback(new resultJson(1,result));
			}
		});
	},
	//托管充值接口
	create_hosting_deposit:function(client_ip,out_trade_no,summary,user_id,amount,pay_method,bank_account_no,callback){
		var _this = payMent;
		var account_type = "BASIC";
		//查看用户是否委托扣款
		_this.query_withhold_authority(user_id,client_ip,function(qywtResult){
			//表示该用户已经是委托扣款了
			if(qywtResult.message.is_withhold_authoity=="Y"){
				//查询绑定卡的新浪卡号
				_this.queryBindCard(user_id,bank_account_no,function(sinaCRs){
					if(sinaCRs.status!=0){
						var pay_methodS = pay_method;
						//绑定请求号
						var request_no1 = timeUtil.getRequestTime()+""+Math.round((Math.random()*1000+1000));
						//已经开通委托支付扣款后，请求create_hosting_collect_trade接口
						_this.create_hosting_collect_trade(client_ip,request_no1,summary,user_id,amount,pay_methodS,function(colltraderes){
							console.log(colltraderes);
							if(colltraderes.status!=0){
								//绑定请求号
								var request_no2 = timeUtil.getRequestTime()+""+Math.round((Math.random()*1000+1000));
								//已经开通委托支付扣款后，请求create_hosting_collect_trade创建托管代付交易接口
								_this.create_single_hosting_pay_trade(client_ip,request_no2,summary,amount,function(cshptRest){
									if(cshptRest.status!=0){
										//请求c++撮合引擎，添加充值记录
										_this.add_account(user_id,amount,function(cbkResult){
											if(cbkResult){
												//保存数据
												//_this.updateCNY(user_id,amount,out_trade_no,pay_method+","+sinaCRs.message,function(result){
												_this.updateCNY(user_id,amount,out_trade_no,pay_method,2,function(result){
													if(result){
														callback(new resultJson(1,cshptRest.message));
													}else{
														callback(new resultJson(0,cshptRest.message));
													}
												});
											}else{
												callback(new resultJson(0,cshptRest.message));
											}
										});
									}else{
										callback(new resultJson(0,cshptRest.message));
									}
								});
							}else{
								callback(new resultJson(0,colltraderes.message));
							}
						});
					}else{
						callback(new resultJson(0,sinaCRs.message));
					}
				});
			}else{
				//查询绑定卡的新浪卡号
				_this.queryBindCard(user_id,bank_account_no,function(sinaCRs){
					if(sinaCRs.status!=0){
						//请求新浪接口进行托管充值
						var client_ips = client_ip.split(":");
						var nosign = {
							"_input_charset":config.baseData.charset,
							"payer_ip":client_ips[client_ips.length-1],
							"identity_id":user_id,
							"identity_type":config.baseData.identity_type,
							"partner_id":config.baseData.testshopId,
							"request_time":timeUtil.getRequestTime(),
							"service":"create_hosting_deposit",
							"summary":summary,
							"account_type":account_type,
							"amount":amount,
							"pay_method":pay_method,
							"out_trade_no":out_trade_no,
							"version":config.baseData.version
						};
						//rsa加密
						var signResult = signUtil.createSign(nosign);
						if(signResult.status!=0){
							var post_data = {
								service:'create_hosting_deposit',
								version:config.baseData.version,
								request_time:timeUtil.getRequestTime(),
								partner_id:config.baseData.testshopId,
								_input_charset:config.baseData.charset,
								sign_type:config.baseData.sign_type,
								sign:encodeURIComponent(signResult.message),
								identity_id: user_id,
								identity_type:config.baseData.identity_type,
								out_trade_no:out_trade_no,
								summary:summary,
								amount:amount,
								account_type:account_type,
								pay_method:pay_method,
								payer_ip:client_ips[client_ips.length-1]
							};
							//请求新浪
							HttpsUtil.post(post_data,'',function(rsdata){
								var backData = rsdata;
								if(backData.status!=0){
									//请求c++撮合引擎，添加充值记录
									//_this.add_account(user_id,amount,function(cbkResult){
										//保存数据
										_this.updateCNY(user_id,amount,out_trade_no,pay_method,1,function(result){
											if(result){
												callback(new resultJson(1,backData.message));
											}else{
												callback(new resultJson(0,"Err_Recharge_Fail"));
											}
										});
									//});
								}else{
									callback(new resultJson(0,backData.message));
								}
							});		
						}
					}
				});
			}
		});
	},
	//已经开通委托支付扣款后，请求create_hosting_collect_trade创建托管代收交易接口
	create_hosting_collect_trade:function(client_ip,out_trade_no,summary,user_id,amount,pay_method,callback){
		//请求新浪接口进行托管充值
		var client_ips = client_ip.split(":");
		var nosign = {
			"_input_charset":config.baseData.charset,
			"payer_ip":client_ips[client_ips.length-1],
			"payer_id":user_id,
			"out_trade_code":'1001',
			"payer_identity_type":config.baseData.identity_type,
			"partner_id":config.baseData.testshopId,
			"request_time":timeUtil.getRequestTime(),
			"service":"create_hosting_collect_trade",
			"summary":summary,
			"amount":amount,
			"pay_method":pay_method,
			"out_trade_no":out_trade_no,
			"version":config.baseData.version
		};
		//rsa加密
		var signResult = signUtil.createSign(nosign);
		if(signResult.status!=0){
			var post_data = {
				service:'create_hosting_collect_trade',
				version:config.baseData.version,
				request_time:timeUtil.getRequestTime(),
				partner_id:config.baseData.testshopId,
				out_trade_code:'1001',
				_input_charset:config.baseData.charset,
				sign_type:config.baseData.sign_type,
				sign:encodeURIComponent(signResult.message),
				payer_id: user_id,
				payer_identity_type:config.baseData.identity_type,
				out_trade_no:out_trade_no,
				summary:summary,
				amount:amount,
				pay_method:pay_method,
				payer_ip:client_ips[client_ips.length-1]
			};
			//请求新浪
			HttpsUtil.post(post_data,'',function(rsdata){
				var backData = rsdata;
				if(backData.status!=0){
					callback(new resultJson(1,backData.message));
				}else{
					callback(new resultJson(0,backData.message));
				}
			});		
		}
	},
	//已经开通委托支付扣款后，请求create_hosting_collect_trade创建托管代付交易接口
	create_single_hosting_pay_trade:function(client_ip,out_trade_no,summary,amount,callback){
		//请求新浪接口进行托管充值(payee_identity_id待确认)
		var client_ips = client_ip.split(":");
		var nosign = {
			"_input_charset":config.baseData.charset,
			"user_ip":client_ips[client_ips.length-1],
			"payee_identity_id":config.baseData.testshopId,
			"out_trade_code":'2001',
			"payee_identity_type":config.baseData.identity_type,
			"partner_id":config.baseData.testshopId,
			"request_time":timeUtil.getRequestTime(),
			"service":"create_single_hosting_pay_trade",
			"summary":summary,
			"amount":amount,
			"out_trade_no":out_trade_no,
			"version":config.baseData.version
		};
		//rsa加密
		var signResult = signUtil.createSign(nosign);
		if(signResult.status!=0){
			var post_data = {
				service:'create_single_hosting_pay_trade',
				version:config.baseData.version,
				request_time:timeUtil.getRequestTime(),
				partner_id:config.baseData.testshopId,
				out_trade_code:'2001',
				_input_charset:config.baseData.charset,
				sign_type:config.baseData.sign_type,
				sign:encodeURIComponent(signResult.message),
				payee_identity_id: config.baseData.testshopId,
				payee_identity_type:config.baseData.identity_type,
				out_trade_no:out_trade_no,
				summary:summary,
				amount:amount,
				user_ip:client_ips[client_ips.length-1]
			};
			//请求新浪
			HttpsUtil.post(post_data,'',function(rsdata){
				var backData = rsdata;
				if(backData.status!=0){
					callback(new resultJson(1,backData.message));
				}else{
					callback(new resultJson(0,backData.message));
				}
			});		
		}
	},
	//请求c++撮合引擎，添加充值记录
	add_account:function(user_id,balance,callback){
		//先查trader表，查出tader_apikey;
		connection.query('SELECT trader_default_apikey FROM hft_trader WHERE trader_user_id = ?',[user_id], function (error, results, fields) {
			if(error){
			   callback(true);
			}else if (results.length!=1){
			   callback(false);
			}else{
				var trader = results[0].trader_default_apikey;
				console.log( {
						trader:trader,
						balance:parseFloat(balance),
						frozen:0
					});
				//请求c++撮合引擎
				requestify.request(config.cengine.url+"rec/account"+trader, {
					method: 'PUT',
					body: {
						balance:parseInt(balance),
						display:'0'
					},
					headers: {
						'app-key': config.managerPower.app_key,
						'sig':config.managerPower.sig
					},
					dataType: 'json'        
				}).then(function(response) {
					var data = JSON.parse(response.body);
					if(data.trader!=undefined){
						callback(true);
					}else{
						callback(false);
					}
				}).fail(function(response) {
					console.log(response);
					callback(false);
				});
			 
			}
		});
	},
	//添加充值记录表
	updateCNY:function(user_id,amount,out_trade_no,pay_method,paystatus,callback){
		var sql = "insert into hft_payrecord(userid,amount,paytype,moneytype,paytime,paystatus,detailtime,vercode,orderNo,pay_method) values(?,?,?,?,?,?,?,?,?,?)";
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		if(month<10){
			month = "0"+month;
		}
		var day = date.getDate();
		if(day<10){
			day = "0"+day;
		}
		var hh = date.getHours();
		if(hh<10){
			hh = "0"+hh;
		}
		var mm = date.getMinutes();
		if(mm<10){
			mm = "0"+mm;
		}
		var ss = date.getSeconds();
		if(ss<10){
			ss = "0"+ss;
		}
		var create_date = year+"-"+month+"-"+day+" "+hh+":"+mm+":"+ss;
		var detail_date = year+"-"+month+"-"+day;
		var sql_param = [user_id,amount,4,1,create_date,paystatus,detail_date,user_id,out_trade_no,pay_method];
		connection.query(sql,sql_param,function(error,result,feilds){
			//console.log(result);
			if(error){
				callback(false);
			}else if(result.affectedRows==0){
				callback(false);
			}else{
				callback(true);
			}
		});
	},
	//查看用户是否委托扣款
	query_withhold_authority:function(user_id,client_ip,callback){
		var client_ips = client_ip.split(":");
		var nosign = {
			"_input_charset":config.baseData.charset,
			"client_ip":client_ips[client_ips.length-1],
			"identity_id":user_id,
			"identity_type":config.baseData.identity_type,
			"partner_id":config.baseData.testshopId,
			"request_time":timeUtil.getRequestTime(),
			"service":"query_withhold_authority",
			"version":config.baseData.version
		};
		//rsa加密
		var signResult = signUtil.createSign(nosign);
		if(signResult.status!=0){
			var post_data = {
				service:'query_withhold_authority',
				version:config.baseData.version,
				request_time:timeUtil.getRequestTime(),
				partner_id:config.baseData.testshopId,
				_input_charset:config.baseData.charset,
				sign_type:config.baseData.sign_type,
				sign:encodeURIComponent(signResult.message),
				identity_id: user_id,
				identity_type:config.baseData.identity_type,
				client_ip:client_ips[client_ips.length-1]
			};
			//请求新浪
			HttpsUtil.post(post_data,'weitou',function(rsdata){
				var backData = rsdata;
				if(backData.status!=0){
					if(backData.message.is_withhold_authoity=="Y"){
						callback(new resultJson(1,backData.message));
					}else{
						callback(new resultJson(0,backData.message));
					}
				}else{
					callback(new resultJson(0,backData.message));
				}
			});		
		}
	},
	//委托扣款重定向接口
	handle_withhold_authority:function(client_ip,user_id,quota,day_quota,callback){
		var client_ips = client_ip.split(":");
		var nosign = {
			"_input_charset":config.baseData.charset,
			"client_ip":client_ips[client_ips.length-1],
			"day_quota":day_quota,
			"identity_id":user_id,
			"identity_type":config.baseData.identity_type,
			"partner_id":config.baseData.testshopId,
			"quota":quota,
			"request_time":timeUtil.getRequestTime(),
			"service":"handle_withhold_authority",
			"version":config.baseData.version
		};
		//rsa加密
		var signResult = signUtil.createSign(nosign);
		if(signResult.status!=0){
			var post_data = {
				service:'handle_withhold_authority',
				version:config.baseData.version,
				request_time:timeUtil.getRequestTime(),
				partner_id:config.baseData.testshopId,
				_input_charset:config.baseData.charset,
				sign_type:config.baseData.sign_type,
				sign:encodeURIComponent(signResult.message),
				identity_id: user_id,
				identity_type:config.baseData.identity_type,
				quota:encodeURIComponent(quota),
				day_quota:encodeURIComponent(day_quota),
				client_ip:client_ips[client_ips.length-1]
			};
			//请求新浪
			HttpsUtil.post(post_data,'weitou',function(rsdata){
				var backData = rsdata;
				if(backData.status!=0){
					callback(new resultJson(1,backData.message));
				}else{
					callback(new resultJson(0,backData.message));
				}
			});		
		}
	},
	//修改扣款重定向接口
	modify_withhold_authority:function(client_ip,user_id,quota,day_quota,callback){
		var client_ips = client_ip.split(":");
		var nosign = {
			"_input_charset":config.baseData.charset,
			"client_ip":client_ips[client_ips.length-1],
			"day_quota":day_quota,
			"identity_id":user_id,
			"identity_type":config.baseData.identity_type,
			"partner_id":config.baseData.testshopId,
			"quota":quota,
			"request_time":timeUtil.getRequestTime(),
			"service":"modify_withhold_authority",
			"version":config.baseData.version
		};
		//rsa加密
		var signResult = signUtil.createSign(nosign);
		if(signResult.status!=0){
			var post_data = {
				service:'modify_withhold_authority',
				version:config.baseData.version,
				request_time:timeUtil.getRequestTime(),
				partner_id:config.baseData.testshopId,
				_input_charset:config.baseData.charset,
				sign_type:config.baseData.sign_type,
				sign:encodeURIComponent(signResult.message),
				identity_id: user_id,
				identity_type:config.baseData.identity_type,
				quota:encodeURIComponent(quota),
				day_quota:encodeURIComponent(day_quota),
				client_ip:client_ips[client_ips.length-1]
			};
			//请求新浪
			HttpsUtil.post(post_data,'weitou',function(rsdata){
				var backData = rsdata;
				if(backData.status!=0){
					callback(new resultJson(1,backData.message));
				}else{
					callback(new resultJson(0,backData.message));
				}
			});		
		}
	},
	//解除委托扣款重定向
	relieve_withhold_authority:function(user_id,client_ip,callback){
		var client_ips = client_ip.split(":");
		var nosign = {
			"_input_charset":config.baseData.charset,
			"client_ip":client_ips[client_ips.length-1],
			"identity_id":user_id,
			"identity_type":config.baseData.identity_type,
			"partner_id":config.baseData.testshopId,
			"request_time":timeUtil.getRequestTime(),
			"service":"relieve_withhold_authority",
			"version":config.baseData.version
		};
		//rsa加密
		var signResult = signUtil.createSign(nosign);
		if(signResult.status!=0){
			var post_data = {
				service:'relieve_withhold_authority',
				version:config.baseData.version,
				request_time:timeUtil.getRequestTime(),
				partner_id:config.baseData.testshopId,
				_input_charset:config.baseData.charset,
				sign_type:config.baseData.sign_type,
				sign:encodeURIComponent(signResult.message),
				identity_id: user_id,
				identity_type:config.baseData.identity_type,
				client_ip:client_ips[client_ips.length-1]
			};
			//请求新浪
			HttpsUtil.post(post_data,'weitou',function(rsdata){
				var backData = rsdata;
				if(backData.status!=0){
					callback(new resultJson(1,backData.message));
				}else{
					callback(new resultJson(0,backData.message));
				}
			});		
		}
	},
	//查询余额
	query_balance:function(user_id,client_ip,callback){
		var client_ips = client_ip.split(":");
		var nosign = {
			"_input_charset":config.baseData.charset,
			"client_ip":client_ips[client_ips.length-1],
			"identity_id":user_id,
			"identity_type":config.baseData.identity_type,
			"partner_id":config.baseData.testshopId,
			"request_time":timeUtil.getRequestTime(),
			"service":"query_balance",
			"version":config.baseData.version
		};
		//rsa加密
		var signResult = signUtil.createSign(nosign);
		if(signResult.status!=0){
			var post_data = {
				service:'query_balance',
				version:config.baseData.version,
				request_time:timeUtil.getRequestTime(),
				partner_id:config.baseData.testshopId,
				_input_charset:config.baseData.charset,
				sign_type:config.baseData.sign_type,
				sign:encodeURIComponent(signResult.message),
				identity_id: user_id,
				identity_type:config.baseData.identity_type,
				client_ip:client_ips[client_ips.length-1]
			};
			//请求新浪
			HttpsUtil.post(post_data,'weitou',function(rsdata){
				var backData = rsdata;
				if(backData.status!=0){
					callback(new resultJson(1,backData.message));
				}else{
					callback(new resultJson(0,backData.message));
				}
			});		
		}
	},
	//查询收支明细
	query_account_details:function(user_id,client_ip,start_time,end_time,callback){
		var client_ips = client_ip.split(":");
		var nosign = {
			"_input_charset":config.baseData.charset,
			"client_ip":client_ips[client_ips.length-1],
			"identity_id":user_id,
			"start_time":start_time,
			"end_time":end_time,
			"identity_type":config.baseData.identity_type,
			"partner_id":config.baseData.testshopId,
			"request_time":timeUtil.getRequestTime(),
			"service":"query_account_details",
			"version":config.baseData.version
		};
		//rsa加密
		var signResult = signUtil.createSign(nosign);
		if(signResult.status!=0){
			var post_data = {
				service:'query_account_details',
				version:config.baseData.version,
				request_time:timeUtil.getRequestTime(),
				partner_id:config.baseData.testshopId,
				_input_charset:config.baseData.charset,
				sign_type:config.baseData.sign_type,
				sign:encodeURIComponent(signResult.message),
				identity_id: user_id,
				start_time:start_time,
				end_time:end_time,
				identity_type:config.baseData.identity_type,
				client_ip:client_ips[client_ips.length-1]
			};
			//请求新浪
			HttpsUtil.post(post_data,'weitou',function(rsdata){
				var backData = rsdata;
				if(backData.status!=0){
					callback(new resultJson(1,backData.message));
				}else{
					callback(new resultJson(0,backData.message));
				}
			});		
		}
	},
	query_hosting_deposit:function(user_id,client_ip,start_time,end_time,callback){
		var client_ips = client_ip.split(":");
		var nosign = {
			"_input_charset":config.baseData.charset,
			"client_ip":client_ips[client_ips.length-1],
			"identity_id":user_id,
			"start_time":start_time,
			"end_time":end_time,
			"identity_type":config.baseData.identity_type,
			"partner_id":config.baseData.testshopId,
			"request_time":timeUtil.getRequestTime(),
			"service":"query_hosting_deposit",
			"version":config.baseData.version
		};
		//rsa加密
		var signResult = signUtil.createSign(nosign);
		if(signResult.status!=0){
			var post_data = {
				service:'query_hosting_deposit',
				version:config.baseData.version,
				request_time:timeUtil.getRequestTime(),
				partner_id:config.baseData.testshopId,
				_input_charset:config.baseData.charset,
				sign_type:config.baseData.sign_type,
				sign:encodeURIComponent(signResult.message),
				identity_id: user_id,
				start_time:start_time,
				end_time:end_time,
				identity_type:config.baseData.identity_type,
				client_ip:client_ips[client_ips.length-1]
			};
			//请求新浪
			HttpsUtil.post(post_data,'',function(rsdata){
				var backData = rsdata;
				if(backData.status!=0){
					callback(new resultJson(1,backData.message));
				}else{
					callback(new resultJson(0,backData.message));
				}
			});		
		}
	}
};
exports.payMent = payMent;