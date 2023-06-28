const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const cors = require('cors')

const app = express();
app.set('port', process.env.PORT || 5000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const server = http.createServer(app);
//Configurar Socket
const io = socketio(server);
require('./socket')(io);

server.listen(app.get('port'), ()=>{
    console.log('Listening port: ' + app.get('port'))
})