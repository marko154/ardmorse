const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const Queue = require("./queue");

function timedPop(string) {
	if (string == "client1") {
		lookup[0].send(client2.tail.val);
		client2.pop();
	} else {
		lookup[1].send(client1.tail.val);
		client1.pop();
	}
}

let client1 = new Queue();
let client2 = new Queue();

const app = express();
const server = http.createServer(app);
const webSocket = new WebSocket.Server({ server: server });

const lookup = {};
let id = 0;

webSocket.on("connection", function connection(ws) {
	console.log("new client has connnected");
	lookup[id] = ws;
	id++;
	ws.on("message", function incoming(message) {
		if (message == "ready") {
			if (ws == lookup[0]) {
				interval = setInterval(function () {
					timedPop("client1");
					if (client2.head == null) clearInterval(interval);
				}, 2000);
			} else {
				interval = setInterval(function () {
					timedPop("idkman");
					if (client1.head == null) clearInterval(interval);
				}, 2000);
			}
		} else {
			if (ws == lookup[0]) {
				client1.push(message);
				client1.print();
				console.log("----");
			} else {
				client2.push(message);
				client2.print();
				console.log("----");
			}
		}
	});
});

server.listen(8080, () => console.log("listening on port 8080"));
