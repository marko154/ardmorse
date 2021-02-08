const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const WebSocket = require("ws");
const socket = new WebSocket("ws://localhost:3000");
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
	ws.send("101");
	sleep(1000);
	ws.send("1");
	sleep(1000);
	ws.send("11");
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
	console.log(stream);
	socket.send(stream);
});

server.listen(8079, () => console.log("listening on port 8079"));
