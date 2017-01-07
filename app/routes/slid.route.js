const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const SlidCtrl = require('../controllers/slid.controller.js');

let slidCtrl = new SlidCtrl();
let router = express.Router();

const CONFIG = require('../../config.json');  

const storage = multer.diskStorage({
  destination: CONFIG.contentDirectory,
  filename: (req, file, cb) => {
    cb(null, utils.generateUUID() + "." + file.originalname.split('.').pop());
}
});

const upload = multer({ storage: storage});

router.route("/slids")
    // create slid
    .post(upload.single("file"), (request, response) => {
        slidCtrl.create(request.file, (err, data) => {
            if (err) console.log(err);
            response.send(err || data);
        });
    })
    // get all slids
    .get((request, response) => slidCtrl.list(data => response.send(data)));

    router.route("/slids/:slidId")
    // get 1 slid
    .get((request, response) => {
        slidCtrl.read(request.slidId, (err, data) => {
            if (err) console.log(err);
            response.send(err || data);
        });
    });

    router.param("slidId", (req, res, next, id) => {
        req.slidId = id;
        next();
    });

    router.post("/slids/content", upload.single("file"), function(request, response) {
        console.log(request);
    console.log(request.file.path); // The full path to the uploaded file
    console.log(request.file.originalname); // Name of the file on the user's computer
    console.log(request.file.mimetype); // Mime type of the file });
    response.send();
});

module.exports = router;
