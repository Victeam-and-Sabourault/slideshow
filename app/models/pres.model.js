'use strict';
const fs = require('fs');
const utils = require('../utils/utils');
const CONFIG = require('../../config.json');

class PresModel {

    static create (pres, callback) {
        fs.writeFile("./" + CONFIG.presentationDirectory + "/" + pres.id + ".pres.json", JSON.stringify(pres), () => {
            callback(null, "Présentation Sauvegardé");
        });
    }

    static read(id, callback) {
        if (fs.existsSync("./" + CONFIG.presentationDirectory + "/" + id + ".pres.json")) {
            fs.readFile("./" + CONFIG.presentationDirectory + "/" + id + ".pres.json", 'utf8', function (err, data) {
                if (err) console.log(err);
                callback(null, data);
            });
        } else {
            callback('File not found', null);
        }
    }

}

module.exports = PresModel;