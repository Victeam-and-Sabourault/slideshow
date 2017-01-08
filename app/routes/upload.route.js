'use strict';

const express = require('express');

const UploadCtrl = require('../controllers/upload.controller');

let router = express.Router();

router.route('/uploads')
    // get all uploads
    .get((request, response) => UploadCtrl.list((err, data) => {
        if (err) console.log(err);
        response.send(err || data);
    }));

module.exports = router;