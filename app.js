const {mongoose} = require('./mongoose');
const {Fan} = require('./fan');
const {ObjectId} = require('mongodb');

var bodyParser = require('body-parser');
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
app.use(bodyParser.json());


// Socket IO
// Allows us to send & receive data directly to the website

port.on("open", () => {
  console.log("connection made")
})

const onData = (data) => {
  console.log(data);
}

parser.on('data', onData);

let on = () => {
  port.write('1');
}
let off = () => {
  port.write('0');
}

io.on('connection', function (socket) {
  socket.emit('join', { message: 'handshake confirmed' });

  socket.on('on', function (data) {
    // console.log(data);
    console.log('send 1');
    on();
  });

  socket.on('off', function (data) {
    // console.log(data);
    console.log('send 0');
    off();
  });
});

// API - Catchs

// When a user sends info to www.domainName.com/fan { --- }
app.post('/fan', (req, res) => {
  // create document - using req.body.text
  console.log(req.body.text);
  var fan = new Fan({
      // note - req.body - will return the object
      //        req.body.text - will return the parsed text
      status: 'status',
      temp: 'temp'
  });

  // save doc & send back
  fan.save().then((doc) => {
      res.send(doc);
  }, (e) => {
      res.status(400).send(e);
  });
});


app.get('/', function (req, res) {
  res.sendFile(path.join(publicPath, 'index.html'))
});

server.listen(3000, () => {
  console.log("Running on local host ");
});