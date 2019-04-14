    var socket = io();

    const toggleOn = () => {
      console.log('html toggle firing');
      socket.emit('on', { my: 'data' });
    }

    const toggleOff = () => {
      console.log('html toggle firing');
      socket.emit('off', { my: 'data' });
    }

    let buttonOn;
    buttonOn = document.querySelector('#toggleOn');
    buttonOn.addEventListener('click', toggleOn);

    let buttonOff;
    buttonOff = document.querySelector('#toggleOff');
    buttonOff.addEventListener('click', toggleOff);


    socket.on('join', function (data) {
      console.log(data);
    });

