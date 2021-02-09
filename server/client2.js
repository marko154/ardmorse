const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const WebSocket = require('ws');
var socket = new WebSocket('ws://localhost:8080');





socket.addEventListener('open', function (event) {
    console.log("10");
    socket.send("00");
    socket.send("01");
    socket.send("11");
    socket.send("12");
});

socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});
