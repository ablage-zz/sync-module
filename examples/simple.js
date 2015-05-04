var syncModule = require('..');

console.log('Start');

console.log(syncModule(__dirname + '/syncModule.js',
	[2, 7, "I am in the synchronous module."])
);
// Result: 2+7+5=14
// The text will be swallowed since it is not printed to this process stdout.

console.log('End');

