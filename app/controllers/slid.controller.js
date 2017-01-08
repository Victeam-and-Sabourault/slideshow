'use strict';
const fs = require('fs');
const path = require('path');
const utils = require('../utils/utils');

const slidModel = require('../models/slid.model');
const CONFIG = require('../../config.json');

class SlidController {

    static list(next) {
        let listSlids = {};
        let nbTotalFiles = -1;
        let nbFile = 0;

        fs.readdir(CONFIG.contentDirectory, (err, files) => {
            let extFile = files.filter((file) => path.extname(file) === '.json');
            let nbTotalFiles = extFile.length;

            for (let i in extFile) {
                const url = CONFIG.contentDirectory + '/' + extFile[i];
                if (fs.existsSync(url)) {
                    fs.readFile(url, (err, data) => {
                        const fileContent = JSON.parse(data.toString());
                        listSlids[fileContent.id] = fileContent;

                        if (++nbFile === nbTotalFiles) { // no more files to read
                            next(listSlids);
                        }
                    });
                } else {
                    next({});
                }
            }
        });
    }

    static create(file, next) {
        let model = new slidModel();
        model.type = utils.getFileType(file.mimetype);
        model.fileName = file.filename;
        model.id = model.fileName.split('.')[0];
        model.title = file.originalname.split('.')[0];

        fs.readdir(CONFIG.contentDirectory, (err, files) => {
            const file = files.filter((file) => file === model.fileName)[0];
            if (fs.existsSync(CONFIG.contentDirectory + '/' + file)) {
                fs.readFile(CONFIG.contentDirectory + '/' + file, (err, data) => {
                    if (err) {
                        next(err);
                    } else {
                        model.setData(data);
                        // create a new slid from model
                        slidModel.create(model, err => {
                            if (err) next(err);
                            next("Saved!");
                        });
                    }
                });
            } else {
                next({});
            }
        });
    }

    static updateImage(presId, slidId, file, next) {
        console.log(file);
        if (fs.existsSync("./" + CONFIG.presentationDirectory + "/" + presId + ".pres.json")) {
            fs.readFile("./" + CONFIG.presentationDirectory + "/" + presId + ".pres.json", 'utf8', function (err, data) {
                let pres = JSON.parse(data.toString());
                pres.slidArray = pres.slidArray.map((slid) => {
                    if (slid.id === slidId) {
                        slid.contentMap[1] = file;
                    }
                    return slid;
                });
                console.log(pres);
                fs.writeFile(CONFIG.presentationDirectory + '/' + presId + '.pres.json', JSON.stringify(pres));
                next();
            });
        } else {
            next();
        }
    }

    static read(id, next) {
        slidModel.read(id, next);
    }

    static upload (request, response) {
        let slid = new slidModel();
        slid.type = request.file.mimetype;
        slid.id = request.file.filename.split('.')[0];
        slid.title = 'CPE < 7k';
        slid.fileName = request.file.filename;
        fs.readFile(request.file.path, (err, data) => {
            if (err) console.log(err);
            slid.setData(data);
            slidModel.create(slid, () => response.send("File uploaded"));
        });
    }

}

module.exports = SlidController;
