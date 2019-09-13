const express = require('express')

const path = require('path')

const socketio = require('socket.io')
const http = require('http')

const app = express()

const server = http.createServer(app)

const io = socketio(server)

let usersockets = {}
app.use('/', express.static(path.join(__dirname, 'frontend')))

io.on('connection', (socket) => {
    console.log('New socket formed  from ' + socket.id)
    socket.emit('connected')


    socket.on('login', (data) => {

        usersockets[data.user] = socket.id
    })


    socket.on('send_mssge', function (data) {

        if (data.message.startsWith('@')) {

            let recipient = data.message.split(':')[0].substr(1)
            let rcptsockets = usersockets[recipient]
            io.to(rcptsockets).emit('recv_mssge', data)
        } else {
            socket.broadcast.emit('recv_mssge', data)
        }

    })
})
server.listen(2389, () => console.log('server started at http://localhost:2389/'))