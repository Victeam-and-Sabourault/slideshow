const socketIO = require('socket.io');
const SlidModel = require('../models/slid.model');

class IOController {

    constructor() {
        this.mapSocket;
    }

    listen(server) {

        let presId;
        let slidId;
        let io = socketIO.listen(server);
        io.sockets.on('connection', (socket, idClient) => {
            // send event connection to client
            socket.emit('connection');

            // save socket in a map
            socket.on('data_comm', () => this.mapSocket[idClient] = socket);

            // listen to slid event
            socket.on('slidEvent', message => {

                switch (message.CMD) {
                    case 'START':
                        presId = message.presId;
                        break;
                    case 'BEGIN':
                        if (fs.existsSync("./" + CONFIG.presentationDirectory + "/" + request.presId + ".pres.json")) {
                            fs.readFile("./" + CONFIG.presentationDirectory + "/" + request.presId + ".pres.json", 'utf8', function (err, data) {
                                let pres = JSON.parse(data.toString());
                                slidId = pres.slidArray[0].id;
                            });
                        }
                        break;
                    case 'NEXT':
                        break;
                    case 'PREV':
                        break;
                    case 'PAUSE':
                        break;
                    case 'END':
                        break;
                    default:
                }

                if (message.CMD !== 'PAUSE') {
                    SlidModel.read(slidId, (err, slid) => {
                        slid.src = '/slid/' + slid.id;
                        socket.broadcast.emit('slid', slid);
                    });
                }
            });
        });
    }
}

module.exports = IOController;