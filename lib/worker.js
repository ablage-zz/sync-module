var JSONB = require('json-buffer');

var fn, promise,
	file,
	args;

try {

	file = process.argv[2];
	args = process.argv[3];

	args = new Buffer(args, 'base64');
	args = args.toString('utf8');
	args = JSONB.parse(args);

	// Load execution file
	fn = require(file);

	// Call function and receive result
	promise = fn.apply(this, args).then(function (value) {

		var result = JSONB.stringify(value);

		// Successful
		process.stdout.write('$-------------$O' + result, function () {
			process.exit(0);
		});

	}).then(null, function (err) {

		// Error
		process.stdout.write('$-------------$E' + err.stack, function () {
			process.exit(0);
		});
	});

} catch(err) {
	// Error
	process.stdout.write('$-------------$E' + err.stack, function () {
		process.exit(0);
	});
}
