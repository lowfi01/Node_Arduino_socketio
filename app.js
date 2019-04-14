const SerialPort = require('serialport')
const Readline = SerialPort.parsers.Readline
var portName = process.argv[2];

const port = new SerialPort(portName, {
  baudRate: 9600
});

const parser = new Readline()
port.pipe(parser)
// parser.on('data', console.log)


const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, 'public');
// const port = 3000;
var app = express();

var server = http.createServer(app)
var io = socketIO(server);
app.use(express.static(publicPath));


app.get('/', function (req, res) {
  res.sendFile(path.join(publicPath, 'index.html'))
});


port.on("open", () => {
  console.log("connection made")
})

const onData = (data) => {
  console.log(data);
}

parser.on('data', onData);

let on = () => {
  port.write('hello');
}
let off = () => {
  // undefined
}

io.on('connection', function (socket) {
  socket.emit('join', { message: 'handshake confirmed' });

  socket.on('on', function (data) {
    // console.log(data);
    console.log('send h');
    on();
  });

  socket.on('off', function (data) {
    // console.log(data);
    console.log('do nothing');
    // off();
  });
});




server.listen(3000, () => {
  console.log("Running on local host ");
});

