const express = require('express');
const fs = require('fs');
const CONFIG = require('../../config.json');  
let router = express.Router();

router.get("/loadPres", function(request, response) {
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

router.post("/savePres", function(request, response) {
    let body = '';
   request.on('data', function (data) {
       body += data;
       if (body.length > 1e6)
           request.connection.destroy();
   });

   request.on('end', function () {

       const post = JSON.parse(body);
       fs.writeFile("./"+CONFIG.presentationDirectory+"/"+post.id + ".pres.json", JSON.stringify(post), () => {
           response.send("Présentation Sauvegardé");
       });
   });

});

module.exports = router;