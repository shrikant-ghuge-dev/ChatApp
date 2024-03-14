const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const path = require('path')
const app = express()
const server = http.createServer(app)

const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {

    socket.broadcast.emit('message', 'A user has joined the chat')

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat')
    })
})
const PORT = 3000 || process.env.PORT

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))