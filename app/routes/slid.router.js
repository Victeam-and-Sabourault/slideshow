var express = require('express');
var fs = require('fs');
var multer = require("multer");
var path = require("path");

var router = express.Router();

var CONFIG = require("../../config.json");

var multerMiddleware = multer({ "dest": "../../presentation_content/" });

router.get("/slids", function(request, response) {
    let listPres = [];
    fs.readdir(CONFIG.presentationDirectory, (err, files) => {
        if(err) console.log(err);

        let filteredLs = files.filter( (file) => path.extname(file) === ".json");

        let index = 0;
        filteredLs.forEach(file => {
            fs.readFile("./"+CONFIG.presentationDirectory+"/"+file, 'utf8',function (err, data) {
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

router.get("/slids/:id", function(request, response) {

        let fileName = path.join("./" + CONFIG.presentationDirectory, request.params.id + ".pres.json");

        fs.readFile(fileName, 'utf8',function (err, data) {

            if (err) console.log(err);

            let jsonData = JSON.parse(data.toString());
            let pres = {};
            pres[jsonData.id] = jsonData;

            response.send(pres);
        });

});

router.post("/savePrez", function(request, response) {
    var body = '';
    request.on('data', function (data) {
        body += data;
        if (body.length > 1e6)
            request.connection.destroy();
    });

    request.on('end', function () {
        
        var post = JSON.parse(body);
        fs.writeFile("./"+CONFIG.presentationDirectory+"/"+post.id + ".pres.json", JSON.stringify(post), () => {
            response.send("Présentation Sauvegardé");
        });
    });
    
});

router.post("/slids", multerMiddleware.single("file"), function(request, response) {
    console.log(request);
    console.log(request.file.path); // The full path to the uploaded file
    console.log(request.file.originalname); // Name of the file on the user's computer
    console.log(request.file.mimetype); // Mime type of the file });
    response.send();
});

module.exports = router;