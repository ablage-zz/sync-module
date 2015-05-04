var sync = require('bindings')('sync.node');
var path = require('path');

module.exports = function (filePath, args) {

	var jsonArgs,
		workerPath,
		completeResult,
		resultSplitted,
		lastResult;

	if (args === undefined) {
		args = [];
	}

	if (typeof args !== 'object' || args.length === undefined) {
		throw new Error('Arguments should be an array.');
	}

	// Prepare
	jsonArgs = JSON.stringify(args);
	workerPath = path.join(__dirname, 'lib', 'worker.js');

	// Execute synchronously
	completeResult = sync('node "' + workerPath + '" "' + filePath + '" "' + jsonArgs.replace(/"/g, "\\\"") + '"');

	// Parse result output - last one should be the real result
	resultSplitted = completeResult.split("$-------------$");
	lastResult = resultSplitted[resultSplitted.length - 1].trim();

	// Error?
	if (lastResult[0] === 'E') {
		throw new Error(lastResult.slice(1));
	}

	return JSON.parse(lastResult.slice(1));
};

