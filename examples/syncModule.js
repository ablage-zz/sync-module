var Promise = require('promise');

module.exports = function (a, b, text) {

	return new Promise(function (resolve, reject) {

		console.log(text);
		setTimeout(function () {
			resolve(a + b + 5);
		}, 2000);
	});
};
