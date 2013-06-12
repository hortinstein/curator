var proxy = require('http_proxy');

var curator = {};
module.exports = curator;

var addresses = [];
curator.init = function(config, callback) {

};

curator.setup_proxy_server = function(troves, port, callback, client_ports) {
	//this allows me to set client ports in testing to setup little reply servers to validate the proxy
	client_ports = typeof client_ports !== 'undefined' ? b : port;
	proxy.createServer(function(req, res, proxy) {
		// On each request, get the first location from the list...
		var target = addresses.shift();
		console.log('balancing request to: ', target); // ...then proxy to the server whose 'turn' it is...
		proxy.proxyRequest(req, res, target);
		addresses.push(target); // ...and then the server you just used becomes the last item in the list.
	}).listen(8000);
};