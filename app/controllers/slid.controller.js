'use strict';
const fs = require('fs');
const utils = require('../utils/utils.js');

const slidModel = require('../models/slid.model.js');
const CONFIG = require('../../config.json');

class SlidController {

    list() {

    }

    create(file, next) {
        let model = new slidModel();
        model.type = utils.getFileType(file.mimetype);
        model.fileName = file.filename;
        model.id = model.fileName.split('.')[0];
        model.title = file.originalname.split('.')[0];

        fs.readdir(CONFIG.contentDirectory, (err, files) => {
            let file = files.filter((file) => file === model.fileName)[0];
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
        });
    }

    read(id, next) {
        slidModel.read(id, next);
    }

}

module.exports = SlidController;