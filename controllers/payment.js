var config = require('../config/config.js')

/**
*author:shenyhang
*date 2017-02-20
*description public aip class
*/
var message = require('../models/message.js').message;
var payMentModule = require('../models/payMentModule.js').payMent;
var ipModule = require('../models/ipModule.js').ipModule;
var timeUtil = require('../models/timeUtil.js').TimeUtil;
var payMent = {
	//创建激活会员
	create_activate_member:function(req, res){
		//用户id
		var user_id = req.body.user_id;
		//用户公网ip
		var client_ip = ipModule.getClientIP(req);
		if(user_id==undefined){
			res.status(400).json(new message(0,"Err_No_User_id"));
		}else{
			payMentModule.create_activate_member(user_id,client_ip,function(relResult){
				if(relResult.status!=0){
					res.json(new message(1,relResult.message));
				}else{
					res.json(new message(0,relResult.message));
				}
			});
		}
	},
	//发送手机验证码
	sendPhoneCode:function(req, res){
		var mobile = req.body.mobile;
		if(req.body.mobile==undefined){
			res.status(400).json(message(0,'ERR_NO_Mobile'));
			return;
		}else{
			payMentModule.sendPhoneCode(mobile,function(result){
				res.json(result);
			});
		}
	},
	//查询是否已经实名
	queryRealNameAuthentication:function(req, res){
		var user_id = req.body.user_id;
		if(req.body.user_id==undefined){
			res.status(400).json(message(0,'ERR_NO_User_id'));
			return;
		}else{
			payMentModule.queryRealNameAuthentication(user_id,function(result){
				res.json(result);
			});
		}
	},
	//设置支付密码
	set_pay_password:function(req, res){
		//用户id
		var user_id = req.body.user_id;
		//用户公网ip
		var client_ip = ipModule.getClientIP(req);
		if(user_id==undefined){
			res.status(400).json(new message(0,"Err_No_User_id"));
		}else{
			payMentModule.set_pay_password(user_id,client_ip,function(relResult){
				if(relResult.status!=0){
					res.json(new message(1,relResult.message));
				}else{
					res.json(new message(0,relResult.message));
				}
			});
		}
	},
	//找回支付密码
	find_pay_password:function(req, res){
		//用户id
		var user_id = req.body.user_id;
		//用户公网ip
		var client_ip = ipModule.getClientIP(req);
		if(user_id==undefined){
			res.status(400).json(new message(0,"Err_No_User_id"));
		}else{
			payMentModule.find_pay_password(user_id,client_ip,function(relResult){
				if(relResult.status!=0){
					res.json(new message(1,relResult.message));
				}else{
					res.json(new message(0,relResult.message));
				}
			});
		}
	},
	//修改支付密码
	modify_pay_password:function(req, res){
		//用户id
		var user_id = req.body.user_id;
		//用户公网ip
		var client_ip = ipModule.getClientIP(req);
		if(user_id==undefined){
			res.status(400).json(new message(0,"Err_No_User_id"));
		}else{
			payMentModule.modify_pay_password(user_id,client_ip,function(relResult){
				if(relResult.status!=0){
					res.json(new message(1,relResult.message));
				}else{
					res.json(new message(0,relResult.message));
				}
			});
		}
	},
	//查询是否设置支付密码(现在本地数据库查是否设置)
	querySetPayKey:function(req, res){
		var user_id = req.body.user_id;
		//用户公网ip
		var client_ip = ipModule.getClientIP(req);
		if(user_id==undefined){
			res.status(400).json(new message(0,"Err_No_user_id"));
		}else{
			payMentModule.querySetPayKey(user_id,client_ip,function(relResult){
				if(relResult.status==1){
					res.json(new message(1,relResult.message));
				}else{
					res.json(new message(0,relResult.message));
				}
			});
		}
	},
	//实名认证api;
	realNameAuthentication:function(req, res){
		//用户公网ip
		var client_ip = ipModule.getClientIP(req);
		//身份证号码
		var identityCard = req.body.identityCard;
		//真实姓名
		var realName = req.body.realName;
		//用户id
		var user_id = req.body.user_id;
		if(identityCard==undefined){
			res.status(400).json(new message(0,"Err_No_identityCard"));
		}else if(realName==undefined){
			res.status(400).json(new message(0,"Err_No_realName"));
		}else if(user_id==undefined){
			res.status(400).json(new message(0,"Err_No_user_id"));
		}else{
			payMentModule.realNameAuthentication(identityCard,user_id,realName,client_ip,function(relResult){
				if(relResult.status!=0){
					res.json(new message(1,relResult.message));
				}else{
					res.json(new message(0,relResult.message));
				}
			});
		}
	},
	//查询是否绑定银行卡
	queryIsBindCard:function(req, res){
		//用户id
		var user_id = req.body.user_id;
		if(user_id==undefined){
			res.status(400).json(new message(0,"Err_No_User_id"));
		}else{
			payMentModule.queryIsBindCard(user_id,function(relResult){
				if(relResult.status!=0){
					res.json(new message(1,relResult.message));
				}else{
					res.json(new message(0,relResult.message));
				}
			});
		}
	},
	//绑定银行卡存储信息
	saveBankCardInfo:function(req, res){
		//用户公网ip
		var client_ip = ipModule.getClientIP(req);
		//ticket
		var ticket = req.body.ticket;
		//验证码
		var valid_code = req.body.valid_code;
			//绑定请求号
		var request_no = timeUtil.getRequestTime()+""+Math.round((Math.random()*1000+1000));
		//用户标识信息(用户user_id)
		var identity_id = req.body.user_id;
		//用户id类型
		var identity_type = "UID";
		//银行编号
		var bank_code = req.body.bank_code;
		//银行卡号
		var bank_account_no = req.body.bank_account_no;
		//银行卡类型
		var card_type = req.body.card_type;
		//银行卡属性
		var card_attribute = req.body.card_attribute;
		//省份
		var province = req.body.province;
		//城市
		var city = req.body.city;
		//开户行
		var bank_branch = req.body.bank_branch;
		if(bank_branch==undefined){
			bank_branch = "";
		}
		//账户类型
		var uaa_account_type = req.body.uaa_account_type;
		//备注
		var uaa_remark_name = req.body.uaa_remark_name;
		 if(uaa_remark_name==undefined){
			uaa_remark_name = "";
		}
		if(request_no==undefined){
			res.status(400).json(new message(0,"Err_No_request_no"));
		}else if(identity_id==undefined){
			res.status(400).json(new message(0,"Err_No_identity_id"));
		}else if(bank_code==undefined){
			res.status(400).json(new message(0,"Err_No_bank_code"));
		}else if(bank_account_no==undefined){
			res.status(400).json(new message(0,"Err_No_bank_account_no"));
		}else if(card_type==undefined){
			res.status(400).json(new message(0,"Err_No_card_type"));
		}else if(card_attribute==undefined){
			res.status(400).json(new message(0,"Err_No_card_attribute"));
		}else if(province==undefined){
			res.status(400).json(new message(0,"Err_No_province"));
		}else if(city==undefined){
			res.status(400).json(new message(0,"Err_No_city"));
		}else if(uaa_account_type==undefined){
			res.status(400).json(new message(0,"Err_No_uaa_account_type"));
		}else if(ticket==undefined){
			res.status(400).json(new message(0,"Err_No_ticket"));
		}else if(valid_code==undefined){
			res.status(400).json(new message(0,"Err_No_valid_code"));
		}else{
			payMentModule.saveBankCardInfo(request_no,identity_id,identity_type,bank_code,bank_account_no,card_type,card_attribute,province,city,client_ip,bank_branch,uaa_remark_name,uaa_account_type,ticket,valid_code,function(result){
				if(result.status!=0){
					res.json(new message(1,result.message));
				}else{
					res.json(new message(0,result.message));
				}
			});
		}
	},
	//获取绑定银行卡验证码
	getBinding_Bank_Card:function(req, res){
		//用户公网ip
		var client_ip = ipModule.getClientIP(req);
		//绑定请求号
		var request_no = timeUtil.getRequestTime()+""+Math.round((Math.random()*1000+1000));
		//用户标识信息(用户user_id)
		var identity_id = req.body.user_id;
		//银行卡绑定手机号
		var phone_no = req.body.phone_no;
		//用户id类型
		var identity_type = "UID";
		//银行编号
		var bank_code = req.body.bank_code;
		//银行卡号
		var bank_account_no = req.body.bank_account_no;
		//银行卡类型
		var card_type = req.body.card_type;
		//银行卡属性
		var card_attribute = req.body.card_attribute;
		//省份
		var province = req.body.province;
		//城市
		var city = req.body.city;
		//开户行
		var bank_branch = req.body.bank_branch;
		if(bank_branch==undefined){
			bank_branch = "";
		}
		//账户类型
		var uaa_account_type = req.body.uaa_account_type;
		//备注
		var uaa_remark_name = req.body.uaa_remark_name;
		 if(uaa_remark_name==undefined){
			uaa_remark_name = "";
		}
		if(request_no==undefined){
			res.status(400).json(new message(0,"Err_No_request_no"));
		}else if(identity_id==undefined){
			res.status(400).json(new message(0,"Err_No_identity_id"));
		}else if(bank_code==undefined){
			res.status(400).json(new message(0,"Err_No_bank_code"));
		}else if(bank_account_no==undefined){
			res.status(400).json(new message(0,"Err_No_bank_account_no"));
		}else if(card_type==undefined){
			res.status(400).json(new message(0,"Err_No_card_type"));
		}else if(card_attribute==undefined){
			res.status(400).json(new message(0,"Err_No_card_attribute"));
		}else if(province==undefined){
			res.status(400).json(new message(0,"Err_No_province"));
		}else if(city==undefined){
			res.status(400).json(new message(0,"Err_No_city"));
		}else if(uaa_account_type==undefined){
			res.status(400).json(new message(0,"Err_No_uaa_account_type"));
		}else if(phone_no==undefined){
			res.status(400).json(new message(0,"Err_No_uaa_phone_no"));
		}else{
			payMentModule.getBinding_Bank_Card(request_no,identity_id,identity_type,bank_code,bank_account_no,card_type,card_attribute,province,city,client_ip,bank_branch,uaa_remark_name,uaa_account_type,phone_no,function(result){
				if(result.status!=0){
					res.json(new message(1,result.message));
				}else{
					res.json(new message(0,result.message));
				}
			});
		}
	},
	//获取解绑银行卡新浪短信验证码
	getUnbindCardCode:function(req, res){
		//用户id
		var user_id = req.body.user_id;
		//银行卡号
		var card_no = req.body.card_no;
		//用户公网ip
		var client_ip = ipModule.getClientIP(req);
		if(user_id==undefined){
			res.status(400).json(new message(0,"Err_No_User_id"));
		}else if(card_no==undefined){
			res.status(400).json(new message(0,"Err_No_Card_no"));
		}else{
			payMentModule.getUnbindCardCode(user_id,client_ip,card_no,function(relResult){
				if(relResult.status!=0){
					res.json(new message(1,relResult.message));
				}else{
					res.json(new message(0,relResult.message));
				}
			});
		}
	},
	//解绑银行卡
	unBindCard:function(req, res){
		//用户id
		var user_id = req.body.user_id;
		//ticket
		var ticket = req.body.ticket;
		//验证码
		var valid_code = req.body.valid_code;
		//用户公网ip
		var client_ip = ipModule.getClientIP(req);
		if(user_id==undefined){
			res.status(400).json(new message(0,"Err_No_User_id"));
		}else if(ticket==undefined){
			res.status(400).json(new message(0,"Err_No_ticket"));
		}else if(valid_code==undefined){
			res.status(400).json(new message(0,"Err_No_valid_code"));
		}else{
			payMentModule.unBindCard(user_id,ticket,valid_code,client_ip,function(relResult){
				if(relResult.status!=0){
					res.json(new message(1,relResult.message));
				}else{
					res.json(new message(0,relResult.message));
				}
			});
		}
	},
	//查询新浪绑定的银行卡
	queryCardBindSina:function(req, res){
		//用户id
		var user_id = req.body.user_id;
		if(user_id==undefined){
			res.status(400).json(new message(0,"Err_No_User_id"));
		}else{
			payMentModule.queryCardBindSina(user_id,function(relResult){
				if(relResult.status!=0){
					res.json(new message(1,relResult.message));
				}else{
					res.json(new message(0,relResult.message));
				}
			});
		}
	},
	//托管充值接口
	create_hosting_deposit:function(req, res){
		//用户公网ip
		var client_ip = ipModule.getClientIP(req);
		//交易订单号
		var out_trade_no = timeUtil.getRequestTime()+""+Math.round((Math.random()*1000+1000));
		//摘要
		var summary = '用户充值';
		//用户标识信息(用户user_id)
		var user_id = req.body.user_id;
		//金额
		var amount = req.body.amount;
		//支付方式
		var pay_method  = req.body.pay_method;
		//银行编号
		var bank_code  = req.body.bank_code;
		//银行卡卡号
		var bank_account_no  = req.body.bank_account_no;
		//对公或者对私
		var publicFlag  = req.body.public_flag;
		//借记卡,信用卡
		var debit = req.body.debit;
		if(user_id==undefined){
			res.status(400).json(new message(0,"Err_No_User_id"));
		}else if(amount==undefined){
			res.status(400).json(new message(0,"Err_No_Amount"));
		}else if(pay_method==undefined){
			res.status(400).json(new message(0,"Err_No_Pay_method"));
		}else if(bank_code==undefined){
			res.status(400).json(new message(0,"Err_No_Bank_code"));
		}else if(publicFlag==undefined){
			res.status(400).json(new message(0,"Err_No_PublicFlag"));
		}else if(debit==undefined){
			res.status(400).json(new message(0,"Err_No_Debit"));
		}else if(bank_account_no==undefined){
			res.status(400).json(new message(0,"Err_No_Bank_Account_no"));
		}else{
			var pay_methods = pay_method+"^"+amount+"^"+bank_code+","+debit+","+publicFlag;
			payMentModule.create_hosting_deposit(client_ip,out_trade_no,summary,user_id,amount,pay_methods,bank_account_no,function(relResult){
				if(relResult.status!=0){
					res.json(new message(1,relResult.message));
				}else{
					res.json(new message(0,relResult.message));
				}
			});
		}
	},
	
	//委托扣款重定向接口
	handle_withhold_authority:function(req, res){
		//用户公网ip
		var client_ip = ipModule.getClientIP(req);
		//用户id
		var user_id = req.body.user_id;
		//单笔额度
		var quota = req.body.quota;
		if(quota==undefined){
			quota = "++";
		}
		//日累计额度
		var day_quota = req.body.day_quota;
		if(day_quota==undefined){
			day_quota = "++";
		}
		if(user_id==undefined){
			res.status(400).json(new message(0,"Err_No_User_id"));
		}else{
			payMentModule.handle_withhold_authority(client_ip,user_id,quota,day_quota,function(relResult){
				if(relResult.status!=0){
					res.json(new message(1,relResult.message));
				}else{
					res.json(new message(0,relResult.message));
				}
			});
		}
	},
	//修改扣款重定向接口
	modify_withhold_authority:function(req, res){
		//用户公网ip
		var client_ip = ipModule.getClientIP(req);
		//用户id
		var user_id = req.body.user_id;
		//单笔额度
		var quota = req.body.quota;
		if(quota==undefined){
			quota = "++";
		}
		//日累计额度
		var day_quota = req.body.day_quota;
		if(day_quota==undefined){
			day_quota = "++";
		}
		if(user_id==undefined){
			res.status(400).json(new message(0,"Err_No_User_id"));
		}else{
			payMentModule.modify_withhold_authority(client_ip,user_id,quota,day_quota,function(relResult){
				if(relResult.status!=0){
					res.json(new message(1,relResult.message));
				}else{
					res.json(new message(0,relResult.message));
				}
			});
		}
	},
	//查看用户是否委托扣款
	query_withhold_authority:function(req, res){
		//用户公网ip
		var client_ip = ipModule.getClientIP(req);
		//用户id
		var user_id = req.body.user_id;
		console.log(user_id);
		if(user_id==undefined){
			res.status(400).json(new message(0,"Err_No_User_id"));
		}else{
			payMentModule.query_withhold_authority(user_id,client_ip,function(relResult){
				if(relResult.status!=0){
					res.json(new message(1,relResult.message));
				}else{
					res.json(new message(0,relResult.message));
				}
			});
		}
	},
	//解除委托扣款重定向
	relieve_withhold_authority:function(req, res){
		//用户公网ip
		var client_ip = ipModule.getClientIP(req);
		//用户id
		var user_id = req.body.user_id;
		console.log(user_id);
		if(user_id==undefined){
			res.status(400).json(new message(0,"Err_No_User_id"));
		}else{
			payMentModule.relieve_withhold_authority(user_id,client_ip,function(relResult){
				if(relResult.status!=0){
					res.json(new message(1,relResult.message));
				}else{
					res.json(new message(0,relResult.message));
				}
			});
		}
	},
	//查询新浪账户余额
	query_balance:function(req, res){
		//用户公网ip
		var client_ip = ipModule.getClientIP(req);
		//用户id
		var user_id = req.body.user_id;
		if(user_id==undefined){
			res.status(400).json(new message(0,"Err_No_User_id"));
		}else{
			payMentModule.query_balance(user_id,client_ip,function(relResult){
				if(relResult.status!=0){
					res.json(new message(1,relResult.message));
				}else{
					res.json(new message(0,relResult.message));
				}
			});
		}
	},
	//查询收支明细
	query_account_details:function(req, res){
		//用户公网ip
		var client_ip = ipModule.getClientIP(req);
		//用户id
		var user_id = req.body.user_id;
		//开始时间
		var start_time = req.body.start_time;
		//结束时间
		var end_time = req.body.end_time;
		if(user_id==undefined){
			res.status(400).json(new message(0,"Err_No_User_id"));
		}else if(start_time==undefined){
			res.status(400).json(new message(0,"Err_No_start_time"));
		}else if(end_time==undefined){
			res.status(400).json(new message(0,"Err_No_end_time"));
		}else{
			payMentModule.query_account_details(user_id,client_ip,start_time,end_time,function(relResult){
				if(relResult.status!=0){
					res.json(new message(1,relResult.message));
				}else{
					res.json(new message(0,relResult.message));
				}
			});
		}
	},
	//托管充值查询
	query_hosting_deposit:function(req, res){
		//用户公网ip
		var client_ip = ipModule.getClientIP(req);
		//用户id
		var user_id = req.body.user_id;
		//开始时间
		var start_time = req.body.start_time;
		//结束时间
		var end_time = req.body.end_time;
		if(user_id==undefined){
			res.status(400).json(new message(0,"Err_No_User_id"));
		}else if(start_time==undefined){
			res.status(400).json(new message(0,"Err_No_start_time"));
		}else if(end_time==undefined){
			res.status(400).json(new message(0,"Err_No_end_time"));
		}else{
			payMentModule.query_hosting_deposit(user_id,client_ip,start_time,end_time,function(relResult){
				if(relResult.status!=0){
					res.json(new message(1,relResult.message));
				}else{
					res.json(new message(0,relResult.message));
				}
			});
		}
	}
};
exports.payMent = payMent;
