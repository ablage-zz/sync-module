var syncModule = require('..');

var expect = require('chai').expect;

var path = require('path');

describe('Sync-Module', function () {

	before(function () {
		this.pathToSync = path.join(__dirname, '/sync');
	});

	it('should execute module', function () {
		expect(syncModule(this.pathToSync + '1', [2, 7])).to.be.equal(9);
	});

	it('should not fail with output', function () {
		expect(syncModule(this.pathToSync + '2', [2, 7])).to.be.equal(9);
	});

	it('should not fail with text params', function () {
		expect(syncModule(this.pathToSync + '1', [2, 7, "Some\r\ntext"])).to.be.equal(9);
	});
});
