const five = require('johnny-five');
const io = require('socket.io-client');

// Connect to the socket server

const socket = io.connect('http://localhost:8080/arduino');

const board = five.Board();

board.on('ready', function() {

  const led = new five.Led(13); // Set pin 13 for LED

  socket.on('on', () => {
    console.log('working');
    led.blink(500);
  })

});
