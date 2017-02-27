/**
*@date 2017-02-21
*@description 签名生成类
*@author shenyhang
*/
var NodeRSA = require('node-rsa');
var crypto = require('crypto');
var cryptico = require('cryptico');
var fs= require('fs');
var weibopay = require("./weibopay.js");
var querystring = require("querystring");
var resultJson = require('./message.js').resultJson;
var encoding   = require('encoding');
var SignUtil = {
	//生成签名
	createSign:function(signBaseData){
		var params = signBaseData;
		var like="";
		var signMsg="";
		for(var key of Object.keys(params).sort()){
			if(key!="sign_type"&&key!="sign_version"&&key!=""){
				like+="&"+key+"="+params[key];
			}
		}
		if(like){
			like=like.substr(1,100000000);
		}
		signMsg=weibopay.rsa_sign(like);
		return new resultJson(1,signMsg); 
	},
	//加密
	encryption:function(data){
		var keyData ="-----BEGIN PUBLIC KEY-----\n"+
			"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCBpueN\n"+
			"weMbYdb+CMl8dUNv5g5THYLD9Z33cAMA4GNjmPYsbcNQ\n"+
			"LyO5QSlLNjpbCwopt7b5lFP8TGLUus4x0Ed6S4Wd9KmN\n"+
			"w6NLbszNEmppP9HXlT9sT4/ShL0CpVF4ofFS8O/g\n"+
			"XwCTJjYZJ0HvK3GBTSP2C9WlipTpWQ+9QJugewIDAQAB\n"+
			"-----END PUBLIC KEY-----";
		var pem = fs.readFileSync(__dirname.split("\\").join("/")+'/../cert/rsa_public.pem');
		var key = new NodeRSA(keyData);
		key.setOptions({encryptionScheme: 'pkcs1'});//就是增加这一行代码。
		var datas = new Buffer(data);
		var rest = key.encrypt(datas, 'base64');
		return new resultJson(1,rest);
	}
};
exports.SignUtil = SignUtil;
