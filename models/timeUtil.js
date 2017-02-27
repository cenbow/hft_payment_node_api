/**时间相关的类*/
var TimeUtil = {
	getRequestTime:function(){
		var time;
		var date  = new Date();
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
		time = year+""+month+day+hh+mm+ss;
		return time;
	}
};
exports.TimeUtil = TimeUtil;