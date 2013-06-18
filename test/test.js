var config = require('./test_config/trove.json');
var curator = require('../index.js');
var should = require('should');
var mock1 = '';
var mock2 = '';
var mock3 = '';
describe('mock riak load balancer', function() {
	it('should configure a mock riak node', function(done) {
		mock1 = require('./mock.js');
		mock1.init('mock1', 2222, function(e, r) {
			done();
		});
	});
	it('should configure a second mock riak node', function(done) {
		mock2 = require('./mock.js');
		mock2.init('mock2', 2223, function(e, r) {
			done();
		});
	});
	it('should configure a third mock riak node', function(done) {
		mock3 = require('./mock.js');
		mock3.init('mock3', 2224, function(e, r) {
			done();
		});
	});

});

describe('curator initialize', function() {
	it('should initial a curator', function(done) {
		curator.init(config, function(e, r) {
			console.log(e,r);
			done();
		});
	});
	it
});