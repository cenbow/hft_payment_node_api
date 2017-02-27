/**
*@date 2017-02-22
*@description https请求类
*@author shenyhang
*/
var requestify = require('requestify');
var config = require('../config/config.js');
var baseUrl=config.engine.url;
var querystring = require("querystring");
var https = require("https");
var resultJson = require('./message.js').resultJson;
var HttpsUtil = {
	post:function(post_data,type,callback){
		
		var postData = querystring.stringify(post_data);
		
		var path = "";
		var hostname = "testgate.pay.sina.com.cn";
		if(type=="member"){
			path = "/mgs/gateway.do";
		}else if(type=="weitou"){
			hostname = "testgate.pay.sina.com.cn";
			path = "/mgs/gateway.do";
		}else{
			
			path = "/mas/gateway.do";
		}
		var options = {
			hostname: hostname,
			port: 443,
			path: path,
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': Buffer.byteLength(postData)
			}
		};
		
		var data = "";
		var req = https.request(options, (res) => {
			res.setEncoding('utf8');
			res.on('data', function(trunk){
				data = data+trunk;
			});
			res.on('end', function(){
				var backData = JSON.parse(decodeURIComponent(data));
				if(backData.response_code=="APPLY_SUCCESS"){
					callback(new resultJson(1,backData));
				}else{
					callback(new resultJson(0,backData));
				}
			});
		});
		req.on('error', function(error){
			console.log(error);
		});
		
		req.write(postData);
		req.end();
	}
};
	
exports.HttpsUtil = HttpsUtil;