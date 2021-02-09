const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const WebSocket = require("ws");
let cl = {};
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const webSocket = new WebSocket.Server({ server: server });

const sleep = (milliseconds) => {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
};

webSocket.on("connection", function connection(ws) {
	console.log("new client has connnected");
	cl = ws;
});

const cliArguments = process.argv;
if (cliArguments.length < 3)
	throw new Error("You forgot the arduino serial port bitch");

const arduinoPort = cliArguments[2];
const port = new SerialPort(arduinoPort, {
	baudRate: 9600,
});

const lineStream = port.pipe(new Readline({ delimiter: "\r\n" }));
lineStream.on("data", (stream) => {
	if(stream!=1){
		console.log(stream.substring(1));
		cl.send(stream.substring(1));
	}


});

server.listen(8079, () => console.log("listening on port 8079"));
