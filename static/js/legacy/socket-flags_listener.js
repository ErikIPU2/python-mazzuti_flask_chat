let socket = io();

socket.on('nm', (data) => {
    console.log(data);
});