'use strict';

const fs = require('fs');
const path = require('path');

const CONFIG = require('../../config.json');

class UploadController {

    static list(next) {
        fs.readdir('./' + CONFIG.contentDirectory, (err, files) => {
            if (err) console.log(err);
            let listUploads = [];
            let filteredLs = files.filter((file) => path.extname(file) === ".json");
            let index = 0;

            filteredLs.forEach(file => {
                fs.readFile("./" + CONFIG.contentDirectory + "/" + file, 'utf8', function (err, data) {
                    let jsonData = JSON.parse(data.toString());
                    listUploads.push(jsonData);
                    if (++index === filteredLs.length) next(null, listUploads);
                });
            });
        });
    }

} 

module.exports = UploadController;