"use strict";
let fs = require('fs');
let CONFIG = require("../../config.json");

class SlidController {

    list() {

    }

    create(request, response) {
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
    }

    read() {

    }

}

module.exports = SlidController;