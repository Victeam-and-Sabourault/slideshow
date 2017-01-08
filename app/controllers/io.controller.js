const socketIO = require('socket.io');
const fs = require('fs');
const utils = require('../utils/utils');
const CONFIG = require('../../config.json');

const SlidModel = require('../models/slid.model');

class IOController {

    constructor() {
        this.mapSocket = {};
    }

    listen(server) {

        let presId;
        let pres;
        let slidPos;
        let io = socketIO.listen(server);
        io.sockets.on('connection', (socket, idClient) => {
            // send event connection to client
            socket.emit('connection');

            // save socket in a map
            socket.on('data_comm', () => this.mapSocket[idClient] = socket);

            // listen to slid event
            socket.on('slidEvent', message => {
                console.log('====================');
                console.log('SlidEvent occured : ', message.CMD);
                console.log('====================');

                switch (message.CMD) {
                    case 'START':
                        presId = message.PRES_ID;
                        slidPos = 0;
                        break;
                    case 'BEGIN':
                        if (pres) slidPos = 0;
                        break;
                    case 'NEXT':
                        if (pres && slidPos < pres.slidArray.length - 1) slidPos++;
                        break;
                    case 'PREV':
                        if (pres && slidPos > 0) slidPos--;
                        break;
                    case 'END':
                        if (pres) slidPos = pres.slidArray.length - 1;
                        break;
                    default:
                        break;
                }
                if (presId) {
                    const url = CONFIG.presentationDirectory + "/" + presId + ".pres.json";
                    utils.readFileIfExists(url, (err, data) => {
                        if (err) console.log(err);

                        pres = JSON.parse(data.toString());
                        let slidId = pres.slidArray[slidPos].contentMap[1];

                        if (message.CMD !== 'PAUSE') {
                            SlidModel.read(slidId, (err, slid) => {
                                slid.src = '/slid/' + slid.id;
                                console.log('Emiting ', slid);
                                this.mapSocket[idClient].emit('slid', { 'SLID': slid});
                            });
                        }
                    })
                }

            });
        });
    }
}

module.exports = IOController;