var fn, promise,
	file,
	args;

try {

	file = process.argv[2];
	args = process.argv[3];

	args = JSON.parse(args);

	// Load execution file
	fn = require(file);

	// Call function and receive result
	promise = fn.apply(this, args).then(function (value) {

		var result = JSON.stringify(value);

		// Successful
		console.log('$-------------$');
		console.log('O' + result);
		process.exit(0);

	}).then(null, function (err) {

		// Error
		console.log('$-------------$');
		console.log('E' + err.stack);
		process.exit(1);
	});

} catch(err) {
	// Error
	console.log('$-------------$');
	console.log('E' + err.stack);
	process.exit(1);
}
