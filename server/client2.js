const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const WebSocket = require('ws');
var socket = new WebSocket('ws://localhost:8080');

const port = new SerialPort("COM3",{
  baudRate:9600
});

const lineStream = port.pipe(new Readline({delimiter: '\r\n'}))
lineStream.on('data', (stream) => {
  console.log(stream);
  socket.send(stream);
});

socket.addEventListener('open', function (event) {
    console.log("connected");
    socket.send("d");
    socket.send("vidmo");
    socket.send("ce");
    socket.send("dela");
});

socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});
