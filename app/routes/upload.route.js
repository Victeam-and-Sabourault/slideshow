'use strict';

const express = require('express');

const UploadCtrl = require('../controllers/upload.controller');

let router = express.Router();
let uploadCtrl = new UploadCtrl();

router.route('/uploads')
    // get all uploads
    .get((request, response) => uploadCtrl.list((err, data) => {
        if (err) console.log(err);
        response.send(err || data);
    }));

module.exports = router;