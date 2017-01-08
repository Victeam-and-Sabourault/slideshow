'use strict';

const express = require('express');
const utils = require('../utils/utils');

const UploadCtrl = require('../controllers/upload.controller');

let router = express.Router();

router.route('/uploads')
    // get all uploads
    .get((request, response) => UploadCtrl.list((err, data) => utils.handleReq(err, data)));

module.exports = router;