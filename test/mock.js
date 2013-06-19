var restify = require('restify');
var server = restify.createServer();
var server2 = restify.createServer();
var server3 = restify.createServer();

var mock = {};
module.exports = mock;
var resp = '';
var resp2 = '';
var resp3 = '';

mock.init = function(name, port,callback) {
	resp = name;
	server.use(restify.bodyParser({
		mapParams: false
	}));

	server.get('/ping', function(req, res, next) {
		res.send(resp);
	});
	server.listen(port, function() {
		console.log('%s listening at %s', server.name, server.url);
		callback(undefined,server.url);
	});
};

mock.init2 = function(name, port,callback) {
	resp2 = name;
	server2.use(restify.bodyParser({
		mapParams: false
	}));

	server2.get('/ping', function(req, res, next) {
		res.send(resp2);
	});
	server2.listen(port, function() {
		console.log('%s listening at %s', server2.name, server2.url);
		callback(undefined,server2.url);
	});
};

mock.init3 = function(name, port,callback) {
	resp3 = name;
	server3.use(restify.bodyParser({
		mapParams: false
	}));

	server3.get('/ping', function(req, res, next) {
		res.send(resp3);
	});
	server3.listen(port, function() {
		console.log('%s listening at %s', server3.name, server3.url);
		callback(undefined,server3.url);
	});
};