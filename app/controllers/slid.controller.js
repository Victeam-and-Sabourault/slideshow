'use strict';
const fs = require('fs');
const path = require('path');
const utils = require('../utils/utils');

const slidModel = require('../models/slid.model');
const CONFIG = require('../../config.json');

class SlidController {

    list(next) {
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

    create(file, next) {
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

    read(id, next) {
        slidModel.read(id, next);
    }

    upload (request, response) {
        console.log(request);
        console.log(request.file.path); // The full path to the uploaded file
        console.log(request.file.originalname); // Name of the file on the user's computer
        console.log(request.file.mimetype); // Mime type of the file });

        let slid = new slidModel();
        slid.type = request.file.mimetype;
        slid.id = request.file.filename.split('.')[0];
        slid.title = 'CPE < 7k';
        slid.filename = request.file.filename;
        fs.readFile(request.file.path, (err, data) => {
            if (err) console.log(err);
            slid.setData(data);
            slidModel.create(slid, () => response.send("File uploaded"));
        });
    }

}

module.exports = SlidController;
