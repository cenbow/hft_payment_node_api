exports.app = {
  "http" : {
    "port" : "8888"
  },
  "logging" : {
    "enable" : true,
    "path" : "./logs"
  }
}

exports.engine = {
  "url" : "https://testgate.pay.sina.com.cn/mgs/gateway.do"
}
/**c++服务器地址*/
exports.cengine = {
  "url" : "http://119.254.111.193:8889/api/v2/"
};
/**商户身份ID*/
exports.baseData = {
	"shopId":200045364935,
	"testshopId":200004595271,
	"version":'1.2',
	"charset":"utf-8",
	"sign_type":"RSA",
	"identity_type":'UID',
	"member_type":1
};
/**语言选择*/
exports.language = {
	type:"zh_cn"
};
/**管理者权限*/
exports.managerPower = {
	"app_key":"nodejs",
	"sig":"8721f9d7570428557b8ace942cda00af"
}