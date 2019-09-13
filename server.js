const express = require('express')

const path = require('path')
const http = require('http')

const socketio = require('socket.io')
const app = express()

const server = http.createServer(app)

const io = socketio(server)
app.use('/', express.static(path.join(__dirname, 'frontend')))

io.on('connection', (socket) => {
    console.log('New socket formed  from ' + socket.id)
    socket.emit('connected')
    socket.on('send_mssge', function (data) {
        socket.broadcast.emit('recv_mssge', data)
    })
})
server.listen(2389, () => console.log('server started at http://localhost:2389/'))