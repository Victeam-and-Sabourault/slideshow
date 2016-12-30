'use strict';
const fs = require('fs');
const CONFIG = require("../../config.json");


class SlideModel {

    constructor () {
        this.type;
        this.id;
        this.title;
        this.fileName;

        let _data;
        this.setData = function(data) { 
            _data = data; 
        }
        this.getData = function() { 
            return _data; 
        }
    }

    /* Prend un objet slidModel en paramètre, stocke le contenu de [slid.data] dans le fichier [slid.fileName] et stocke les metadonnées dans un fichier [slidModel.id].meta.json dans le répertoire [CONFIG.contentDirectory]. */
    static create(slide, callback) {
        if (slide instanceof SlideModel) {
            if (slide.getData() !== null && slide.getData().length > 0 && slide.id !== null) {
                fs.writeFile(CONFIG.contentDirectory + '/' + slide.id + ".meta.json", JSON.stringify(slide));
                fs.writeFile(CONFIG.contentDirectory + '/' + slide.fileName, slide.getData());
                callback();
            } else {
                callback("Problem in datas !");
            }
        } else {
            callback("Not an instance of SlideModel !");
        }   
    }

    /* Prend un id en paramètre et retourne l’objet slidModel lu depuis le fichier [slid.id].meta.json */ 
    static read(id, callback) {
        if (id !== null) {
            fs.readdir(CONFIG.contentDirectory, (err, files) => {
                let file = files.filter((file) => file === id + ".meta.json")[0];
                let fileContent = JSON.parse(fs.readFileSync(CONFIG.contentDirectory + '/' + file).toString());
                let model = new SlideModel();
                model.type = fileContent.type;
                model.id = fileContent.id;
                model.title = fileContent.title;
                model.fileName = fileContent.fileName;

                callback(null, model);
            });
        } else {
            callback("Problem in datas !", null);
        }
    }

    /* Prend l’id d’un SlidModel en paramètre et met à jour le fichier de metadata ([slid.id].meta.json) et le fichier [slid.fileName] si [slid.data] est renseigné (non nul avec une taille > 0). */
    static update(slide, callback) {
        if (slide.getData() !== null && slide.getData().length > 0 && slide.id !== null) {
            if (fs.existsSync(CONFIG.contentDirectory + '/' + slide.id + ".meta.json") &&
                fs.existsSync(CONFIG.contentDirectory + '/' + slide.id + ".meta.json")) {
                    fs.writeFile(CONFIG.contentDirectory + '/' + slide.id + ".meta.json", JSON.stringify(slide));
                    fs.writeFile(CONFIG.contentDirectory + '/' + slide.fileName, slide.getData());
                    callback();
                } else {
                    callback("File doesn't exists !");
                }
        } else {
            callback("Problem in datas !");
        }
    }

    /* supprime les fichiers data ([slid.src]) et metadata ([slid.id].meta.json) */
    static delete(id, callback) {
        this.read(id, (err, data) => {
            if (err) {
                callback(err);
            } else {
                fs.unlink(CONFIG.contentDirectory + "/" + data.fileName, (err) => {
                  fs.unlink(CONFIG.contentDirectory + "/" + id + ".meta.json", (err) => {
                      callback();
                    });
                });
            }
        });
    }
}

module.exports = SlideModel;