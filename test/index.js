var syncModule = require('..');
var expect = require('chai').expect;
var path = require('path');

describe('Sync-Module', function () {

	before(function () {
		this.pathToSync = path.join(__dirname, '/sync');
	});

	it('should execute without param', function () {
		// 0
		expect(syncModule(this.pathToSync + '0')).to.be.equal(0);
	});

	it('should execute module', function () {
		// 2 + 7
		expect(syncModule(this.pathToSync + '1', [2, 7])).to.be.equal(9);
	});

	it('should not fail with output', function () {
		// 2 * 7
		expect(syncModule(this.pathToSync + '2', [2, 7])).to.be.equal(14);
	});

	it('should not fail with text params', function () {
		// 2 * 5 * 7
		expect(syncModule(this.pathToSync + '3', [2, 7, "Some\r\ntext"])).to.be.equal(70);
	});

	it('should handle errors', function () {
		var error = false;

		try {
			expect(syncModule(this.pathToSync + '4')).to.be.equal(0);

		} catch (err) {
			error = true;
			expect(err.message).to.be.equal('Simple error');
			expect(err.name).to.be.equal('Error');
		}

		expect(error).to.be.true;
	});
});
