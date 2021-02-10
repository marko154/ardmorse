const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();
const server = http.createServer(app);
const webSocket = new WebSocket.Server({ server: server });

const lookup = {};
let id = 0;

webSocket.on("connection", function connection(ws) {
	console.log("new client has connnected");

	lookup[id] = ws;
	id++;

			lookup[0].on('message', function incoming(message) {

				if(Object.keys(lookup).length>1){
				console.log(message);
				lookup[1].send(message);
}
});
if(Object.keys(lookup).length>1){
lookup[1].on('message', function incoming(message) {
	console.log(message);
	lookup[0].send(message);
});
}
			});



server.listen(8080, () => console.log("listening on port 8080"));
