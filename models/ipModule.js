/**获取访问者公网ip*/
var IpModule = {
	getClientIP:function(req){
		var ipAddress;
		var headers = req.headers;
		var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
		forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
		if (!ipAddress) {
			ipAddress = req.connection.remoteAddress;
		}
		return ipAddress;
	}
};
exports.ipModule = IpModule;