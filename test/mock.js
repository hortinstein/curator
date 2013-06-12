var restify = require('restify');
var server = restify.createServer();

var mock = {};
module.exports = mock;
var resp = '';
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
		callback();
	});
}