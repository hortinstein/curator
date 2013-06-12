var config = require('./test_config/trove.json');
var curator = require('../index.js');

var should = require('should')

describe('curator initialize', function() {
	it('should initial a curator', function(done) {
		curator.init(config, function(e, r) {
			//console.log(e,r);
			done();
		});
	});
	it
});

describe('riak load balancer', function() {
	it('should configure a riak load balancer', function(done) {
		trove.start_node(config, function(e, r) {
			e.should.equal(0);
			done();
		})
	});
	
});