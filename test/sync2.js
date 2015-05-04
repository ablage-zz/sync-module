var Promise = require('promise');

module.exports = function (a, b) {

	console.log("Some text here\r\n that should not break the module.");

	return new Promise(function (resolve, reject) {
		resolve(a + b);
	});
};
