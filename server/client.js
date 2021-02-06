const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const WebSocket = require("ws");
const socket = new WebSocket("ws://localhost:8080");

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

socket.addEventListener("open", function (event) {
	console.log("connected");
	socket.send("ready");
});

socket.addEventListener("message", function (event) {
	console.log("Message from server ", event.data);
});
