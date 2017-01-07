const express = require('express');
const fs = require('fs');
const CONFIG = require('../../config.json');
const path = require('path');
let router = express.Router();

router.get("/loadPres", function (request, response) {
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

                if (filteredLs.length === ++index) {
                    response.send(listPres);
                }
            });
        });
    });
});

router.route("/loadPres/:presId")
    // get 1 pres
    .get((request, response) => {
        if (fs.existsSync("./" + CONFIG.presentationDirectory + "/" + request.presId + ".pres.json")) {
            fs.readFile("./" + CONFIG.presentationDirectory + "/" + request.presId + ".pres.json", 'utf8', function (err, data) {
                response.send(JSON.parse(data.toString()));
            });
        } else {
            response.send("ERROR FILE UNEXISTING");
        }

    });

router.post("/savePres", function (request, response) {
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

});

router.param("presId", (req, res, next, id) => {
    req.presId = id;
    next();
});


module.exports = router;