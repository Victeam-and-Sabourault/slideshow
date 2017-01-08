'use strict';

const fs = require('fs');
const path = require('path');

const SlidCtrl = require('./slid.controller');
const CONFIG = require('../../config.json');

class PresController {

    static list(next) {
        let listPres = [];
        fs.readdir(CONFIG.presentationDirectory, (err, files) => {
            if (err) console.log(err);

            let filteredLs = files.filter((file) => path.extname(file) === ".json");

            let index = 0;
            filteredLs.forEach(file => {
                fs.readFile("./" + CONFIG.presentationDirectory + "/" + file, 'utf8', function (err, data) {
                    let jsonData = JSON.parse(data.toString());
                    let pres = {};
                    pres[jsonData.id] = jsonData;
                    listPres.push(pres);

                    if (++index === filteredLs.length) {
                        next(listPres);
                    }
                });
            });
        });
    }

    static read(id, next) {
        if (fs.existsSync("./" + CONFIG.presentationDirectory + "/" + id + ".pres.json")) {
            fs.readFile("./" + CONFIG.presentationDirectory + "/" + id + ".pres.json", 'utf8', function (err, data) {
                if (err) console.log(err);
                next(data);
            });
        } else {
            next();
        }
    }

    static create(request, response) {
        let body = '';
        request.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {

            const post = JSON.parse(body);
            fs.writeFile("./" + CONFIG.presentationDirectory + "/" + post.id + ".pres.json", JSON.stringify(post), () => {
                response.send("Présentation Sauvegardé");
            });
        });
    }

    static getAllImages(id, next) {
        if (fs.existsSync("./" + CONFIG.presentationDirectory + "/" + id + ".pres.json")) {
            let listUploads = {};
            fs.readFile("./" + CONFIG.presentationDirectory + "/" + id + ".pres.json", 'utf8', function (err, data) {
                const listSlids = JSON.parse(data).slidArray;
                let index = 0;
                for (let slid in listSlids) {
                    SlidCtrl.read(listSlids[slid].contentMap[1], (err, data) => {
                        if (err) console.log(err);
                        listUploads[listSlids[slid].id] = data;
                        if (++index == listSlids.length) next(listUploads);
                    });
                }
            });
        } else {
            next();
        }
    }


}

module.exports = PresController;