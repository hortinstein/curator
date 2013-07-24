var proxy = require('http-proxy');
var events = require('events');

var curator = new events.EventEmitter();
module.exports = curator;

var trove_addresses = [];
var curator_address = '';
var server = '';

var proxy_function = function(req, res, proxy) {
	// On each request, get the first location from the list...
	var target = trove_addresses.shift();
	//console.log('balancing request to: ', target); // ...then proxy to the server whose 'turn' it is...
	server.proxy.proxyRequest(req, res, target);
	trove_addresses.push(target); // ...and then the server you just used becomes the last item in the list.
};

var create_proxy = function(port) {
	server = proxy.createServer(proxy_function);
	server.listen(port);
	// details the use of custom proxy error handlers https://github.com/nodejitsu/node-http-proxy/blob/master/examples/http/custom-proxy-error.js
	server.proxy.on('proxyError', function(err, req, res) {
		//worth trying tp reproxy request?
		res.writeHead(500, {
			'Content-Type': 'text/plain'
		});
		res.end('proxy request failed');
		curator.emit('error', req);

	});
};

curator.init = function(config, callback) {
	var curator_schema = config.schematic.curator;
	if (curator_schema.hasOwnProperty('port')) {
		curator_address = ('http://' + curator_schema.ip_address + ':' + curator_schema.port);
	} else {
		curator_address = ('http://' + curator_schema.ip_address + ':' + config.port);
	}

	var troves_schema = config.schematic.troves;
	for (var i in troves_schema) {
		var trove = troves_schema[i];
		if (trove.hasOwnProperty('port')) {
			trove_addresses.push({
				host: trove.ip_address,
				port: trove.port
			});
		} else {
			trove_addresses.push({
				host: trove.ip_address,
				port: config.port
			});
		}
	}
	create_proxy(config.port);
	console.log(trove_addresses);
	callback(null, curator_address); //placeholder really should return something usefull
};

curator.update = function(config, callback) {

};

//Function Placeholder
//needs to add a trove to an existing server

//Function Placeholder
//needs to handle unresponsive trove

//Function Placeholder
//reset unresponsive trove

//Function Placeholder
//compile stats on each server 

//Function Placeholder
// 

//Function Placeholder
// 

//Function Placeholder
//