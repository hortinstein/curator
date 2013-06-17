var config = require('./test_config/trove.json');
var curator = require('../index.js');
var mock = require('./mock.js')
var should = require('should');

describe('curator initialize', function() {
	it('should initial a curator', function(done) {
		curator.init(config, function(e, r) {
			//console.log(e,r);
			done();
		});
	});
	it
});

describe('mock riak load balancer', function() {
	it('should configure a mock riak node', function(done) {
		mock.init('mock1', 2222, function(e, r) {
			done();
		});
	});
	it('should configure a second mock riak node', function(done) {
		mock.init('mock2', 2223, function(e, r) {
			done();
		});
	});
	it('should configure a third mock riak node', function(done) {
		mock.init('mock3', 2224, function(e, r) {
			done();
		});
	});
	
});