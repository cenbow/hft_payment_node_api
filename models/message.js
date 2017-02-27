function message (success, message, data){
	return {
		status: {
			success: success,
			message: message
		},
		result: data
	};
};
function resultJson (success, message){
	return {
		status: success,
		message: message
	};
};
exports.message = message;
exports.resultJson = resultJson;