var http = require('http');
var qs = require('querystring');
var config = require('../config/config.js');
var interLang = require('./internationalization.js').interJson;
var sms = {
	// 发送短信方法
	send_sms:function(phoneNum,checkNum,callback){
		var _this = sms;
		// 修改为您的短信账号
		var un="N3562857";
		// 修改为您的短信密码
		var pw="XsLxKH2N5e10fd";
		// 修改您要发送的手机号码，多个号码用逗号隔开
		var phone=phoneNum;
		// 修改为您要发送的短信内容
		var msg=interLang[config.language.type].phone_check_code01+checkNum+interLang[config.language.type].phone_check_code02;
		// 短信域名地址
		var sms_host = 'sms.253.com';
		// 发送短信地址
		var send_sms_uri = '/msg/send';
		// 查询余额地址
		var query_balance_uri = '/msg/balance';
		var post_data = { // 这是需要提交的数据 
		'un': un,   
		'pw': pw, 
		'phone':phone,
		'msg':msg,
		'rd':'1',
		};  
		var content = qs.stringify(post_data);  
		_this.post(send_sms_uri,content,sms_host,callback);
		
	},
	/*  
	// 查询余额方法
	function query_blance(uri,content,host){
		
		var post_data = { // 这是需要提交的数据 
		'un': un,   
		'pw': pw, 
		};  
		var content = qs.stringify(post_data);  
		post(uri,content,sms_host);
	},
	 */
	post:function (uri,content,host,callback){
		var options = {  
			hostname: host,
			port: 80,  
			path: uri,  
			method: 'POST',  
			headers: {  
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',  
				'Content-Length': content.length   
			}  
		};
		var req = http.request(options, function (res) {  
			var data = "";
			res.setEncoding('utf8');  
			res.on('data', function (chunk) {
				data = data + chunk;				
			}); 
			res.on('end', function () {  
				callback(data);  
			}); 			
			
		});
		req.write(content);
		req.end();   
	} 
}
exports.sms = sms;



