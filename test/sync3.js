var Promise = require('promise');

module.exports = function (a, b, text) {

	console.log(text);
	
	return new Promise(function (resolve, reject) {
		resolve(a + b);
	});
};
