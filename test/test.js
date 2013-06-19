var config = require('./test_config/trove.json');
var curator = require('../index.js');
var should = require('should');
var mock1 = '';
var mock2 = '';
var mock3 = '';
var mock_proxy_address = '';

describe('mock riak load balancer', function() {
	it('should configure a mock riak node', function(done) {
		mock1 = require('./mock.js');
		mock1.init('mock1', 2222, function(e, r) {
			done();
		});
	});
	it('should configure a second mock riak node', function(done) {
		mock2 = require('./mock.js');
		mock2.init2('mock2', 2223, function(e, r) {
			done();
		});
	});
	it('should configure a second mock riak node', function(done) {
		mock3 = require('./mock.js');
		mock3.init3('mock3', 2224, function(e, r) {
			done();
		});
	});

});

describe('curator', function() {
	it('should initialize a curator', function(done) {
		curator.init(config, function(e, r) {
			console.log(e, r);
			mock_proxy_address = r;
			done();
		});
	});

	it('should proxy requests to mock servers', function(done) {
		var request = require('request');
		request(mock_proxy_address + '/ping', function(e, r, o) {
			done();
		});
	});

	it('should serve 100 proxy requests to mock servers', function(done) {
		var request = require('request');
		var async = require('async');
		var multi_req = function(callback) {
			request(mock_proxy_address + '/ping', function(e, r, o) {
				callback(o);
			});
		}
		var res = {
			mock1: 0,
			mock2: 0,
			mock3: 0
		};
		async.times(100, function(n, next) {
			multi_req(function(o) {
				switch (o) {
					case "\"mock1\"": res.mock1 = (res.mock1+1); break;
					case "\"mock2\"": res.mock2 = (res.mock2+1); break;
					case "\"mock3\"": res.mock3 = (res.mock3+1); break;
				}
				next();
			});
		}, function(o) {
			console.log(res);
			done();
		});

	});
});