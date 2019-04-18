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

server.listen(3000, () => {
  console.log("Running on local host ");
});

// // When user selects a CandidateCard from home page
// (<any>window).dataLayer.push({
//   event: 'CandidateCardClick',
//   candidate_id: '<add variable here>',
//   candidate_code: '<add variable here>',
//   consultant_id: '<add variable here>',
//   candidate_status: '<add variable here>',
//   order_id: 'not set',
//   staticList_id: 'not set'
// })


// (<any>window).dataLayer.push({
//   event: 'selectAllCandidate',
//   candidate_id: '<add variable here>',
//   candidate_code: '<add variable here>',
//   consultant_id: '<add variable here>',
//   candidate_status: '<add variable here>',
//   order_id: 'not set',
//   staticList_id: 'not set'
// })

// (<any>window).dataLayer.push({
//   event: 'IndividualStaticListSelected',
//   candidate_id: 'not set',
//   candidate_code: 'not set',
//   consultant_id: '<add varible>',
//   candidate_status: 'not set,
//   order_id: 'not set',
//   staticList_id: 'not set',
//   allSelectedCandidate: []
// })

// (<any>window).dataLayer.push({
//   event: 'SendEmailClicked',
//   candidate_id: 'not set',
//   candidate_code: 'not set',
//   consultant_id: '<add variable here>',
//   candidate_status: 'not set',
//   order_id: 'not set',
//   staticList_id: 'not set'
// })

// (<any>window).dataLayer.push({
//   event: 'SendSMSClicked',
//   candidate_id: 'not set',
//   candidate_code: 'not set',
//   consultant_id: '<add variable here>',
//   candidate_status: 'not set',
//   order_id: 'not set',
//   staticList_id: 'not set'
// })

// let (<any>window).dataLayer.allSelectedCandidate || {}

// staticList_id: {
//   ...datalayer.allSelectedCandidate,
//   newlist
// }