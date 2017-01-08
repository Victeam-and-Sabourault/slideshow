const socketIO = require('socket.io');
const SlidModel = require('../models/slid.model');

class IOController {

    constructor() {
        this.mapSocket;
    }

    listen(server) {

        let presId;
        let slidPos;
        let io = socketIO.listen(server);
        io.sockets.on('connection', (socket, idClient) => {
            // send event connection to client
            socket.emit('connection');

            // save socket in a map
            socket.on('data_comm', () => this.mapSocket[idClient] = socket);

            // listen to slid event
            socket.on('slidEvent', message => {

                if (fs.existsSync("./" + CONFIG.presentationDirectory + "/" + request.presId + ".pres.json")) {
                            fs.readFile("./" + CONFIG.presentationDirectory + "/" + request.presId + ".pres.json", 'utf8', function (err, data) {
                                let pres = JSON.parse(data.toString());
                                switch (message.CMD) {
                                    case 'START':
                                        presId = message.PRES_ID;
                                    case 'BEGIN':
                                        slidPos = 0;
                                        break;
                                    case 'NEXT':
                                        slidPos++;
                                        break;
                                    case 'PREV':
                                        slidPos--;
                                        break;
                                    case 'END':
                                        slidPos = pres.slidArray.length - 1;
                                        break;
                                    default:
                                        break;
                                }
                                slidId = pres.slidArray[slidPos].id;
                                console.log(slidId);
                            });
                        }

                switch (message.CMD) {
                    case 'START':
                        presId = message.presId;
                        break;
                    case 'BEGIN':
                        if (fs.existsSync("./" + CONFIG.presentationDirectory + "/" + request.presId + ".pres.json")) {
                            fs.readFile("./" + CONFIG.presentationDirectory + "/" + request.presId + ".pres.json", 'utf8', function (err, data) {
                                let pres = JSON.parse(data.toString());
                                slidId = pres.slidArray[0].id;
                                console.log(slidId)
                            });
                        }
                        break;
                    case 'NEXT':
                        if (fs.existsSync("./" + CONFIG.presentationDirectory + "/" + request.presId + ".pres.json")) {
                            fs.readFile("./" + CONFIG.presentationDirectory + "/" + request.presId + ".pres.json", 'utf8', function (err, data) {
                                let pres = JSON.parse(data.toString());
                                slidId = pres.slidArray[++slidId].id;
                                console.log(slidId)
                            });
                        }
                        break;
                    case 'PREV':
                        break;
                    case 'PAUSE':
                        break;
                    case 'END':
                        if (fs.existsSync("./" + CONFIG.presentationDirectory + "/" + request.presId + ".pres.json")) {
                            fs.readFile("./" + CONFIG.presentationDirectory + "/" + request.presId + ".pres.json", 'utf8', function (err, data) {
                                let pres = JSON.parse(data.toString());
                                slidId = pres.slidArray[pres.slidArray.length - 1].id;
                                console.log(slidId)
                            });
                        }
                        break;
                    default:
                }

                if (message.CMD !== 'PAUSE') {
                    setTimeout(() => {
                        SlidModel.read(slidId, (err, slid) => {
                            slid.src = '/slid/' + slid.id;
                            socket.broadcast.emit('slid', slid);
                        });
                    }, 1000);
                }
            });
        });
    }
}

module.exports = IOController;