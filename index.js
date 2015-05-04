var sync = require('bindings')('sync.node');
var path = require('path');
var JSONB = require('json-buffer');

module.exports = function (filePath, args) {

	var jsonArgs,
		workerPath,
		completeResult,
		resultSplitted,
		lastResult,
		jsonResult;

	if (args === undefined) {
		args = [];
	}

	if (typeof args !== 'object' || args.length === undefined) {
		throw new Error('Arguments should be an array.');
	}

	// Prepare
	jsonArgs = JSONB.stringify(args);
	jsonArgs = new Buffer(jsonArgs, 'utf8');
	jsonArgs = jsonArgs.toString('base64');

	workerPath = path.join(__dirname, 'lib', 'worker.js');

	// Execute synchronously
	completeResult = sync('node "' + workerPath + '" "' + filePath + '" "' + jsonArgs + '"');

	// Parse result output - last one should be the real result
	resultSplitted = completeResult.split("$-------------$");
	lastResult = resultSplitted[resultSplitted.length - 1].trim();

	// Error?
	if (lastResult[0] === 'E') {
		throw new Error(lastResult.slice(1));
	}

	try {
		jsonResult = JSONB.parse(lastResult.slice(1));
	} catch (err) {
		throw new Error(err.message + ':' + completeResult);
	}

	return jsonResult;
};

