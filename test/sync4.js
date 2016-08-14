var Promise = require('promise');

module.exports = function () {

	return new Promise(function (resolve, reject) {
		reject(new Error('Simple error'));
	});
};
