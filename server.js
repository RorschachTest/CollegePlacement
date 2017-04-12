var http = require('http');
var fs = require('fs');
// var express = require('express');

var server = http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	var readFile = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');
	readFile.pipe(res);
});

server.listen(8080, '127.0.0.1');