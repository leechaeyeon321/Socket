const express = require('express');
const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/practice42.html')
})

io.on('connection', (socket) => {
    socket.on('hello_o', (msg) => {
        console.log(msg);
        socket.emit('response', 'hello: 안녕하세요!')
    })
    socket.on('study', (msg) => {
        console.log(msg);
        socket.emit('response', 'study: 공부합시다!')
    })
    socket.on('bye', (msg) => {
        console.log(msg);
        socket.emit('response', 'bye: 안녕히가세요!')
    })

    //객체를 만든 후 객체의 메세지를 객체의 키값으로 설정
    let data = {hello: '안녕하세요!', study: '공부합시다!', bye: '안녕히가세요!'}

    socket.on('send', (msg)=>{
        console.log(msg)
        socket.emit('response', msg + ':' + data[msg])
    })

    socket.on('disconnect', () => {
        console.log('Server Socket disconnected');
    })
});

http.listen(8080, () => {
    console.log('Server port : ', 8080);
})