const socketIO = require('socket.io');
const SlidModel = require('../models/slid.model');

class IOController {
    constructor () {
        this.mapSocket;
    }

    listen (server) {
        let io = socketIO.listen(server);
        io.sockets.on('connection', (socket, idClient) => {
            // send event connection to client
            socket.emit('connection');

            // save socket in a map
            socket.on('data_comm', () => this.mapSocket[idClient] = socket);

            // listen to slid event
            socket.on('slidEvent', message => {
                if (message.CMD !== 'PAUSE') {
                    SlidModel.read(message.PRES_ID, (err, slid) => {
                        slid.src = '/slid/' + slid.id;
                        socket.broadcast.emit('slid', slid);
                    });
                }
            });
        });
    }
}

module.exports = IOController;