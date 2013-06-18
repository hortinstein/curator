var proxy = require('http-proxy');

var curator = {};
module.exports = curator;

var trove_addresses = [];
var curator_address = [];


var proxy_function = function(req, res, proxy) {
	// On each request, get the first location from the list...
	var target = addresses.shift();
	console.log('balancing request to: ', target); // ...then proxy to the server whose 'turn' it is...
	proxy.proxyRequest(req, res, target);
	addresses.push(target); // ...and then the server you just used becomes the last item in the list.
}

curator.init = function(config, callback) {
	var curator_schema = config.schematic.curator;
	if (curator_schema.hasOwnProperty('port')) {
		curator_address.push('http://' + curator_schema.ip_address + ':' + curator_schema.port);
	} else {
		curator_address.push('http://' + curator_schema.ip_address + ':' + config.port);
	}

	var troves_schema = config.schematic.troves;
	for (i in troves_schema) {
		var trove = troves_schema[i];
		if (trove.hasOwnProperty('port')) {
			trove_addresses.push('http://' + trove.ip_address + ':' + trove.port)
		} else {
			trove_addresses.push('http://' + trove.ip_address + ':' + config.port)
		}
		proxy.createServer(proxy_function).listen(config.port);
	}
	console.log(curator_address)
	callback(null, curator.ip_address) //placeholder really should return something usefull
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