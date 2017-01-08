const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const utils = require('../utils/utils');

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

const upload = multer({ storage: storage });

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

router.route('/pres/:presId/slid/:slidId/upload/:fileId')
    // update content
    .post((request, response) => {
        slidCtrl.updateImage(request.presId, request.slidId, request.fileId, (err, data) => {
            if (err) console.log(err);
            response.send(err || data);
        });
    });

router.param("slidId", (req, res, next, id) => {
    req.slidId = id;
    next();
});
router.param("presId", (req, res, next, id) => {
    req.presId = id;
    next();
});
router.param("fileId", (req, res, next, id) => {
    req.fileId = id;
    next();
});

router.post("/file-upload", upload.single("file"), (request, response) => slidCtrl.upload(request, response));

module.exports = router;
