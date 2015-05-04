var Promise = require('promise');

module.exports = function (a, b) {

	return new Promise(function (resolve, reject) {
		resolve(a + b);
	});
};
