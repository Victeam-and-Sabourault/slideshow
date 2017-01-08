'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');

const PresCtrl = require('../controllers/pres.controller');
const CONFIG = require('../../config.json');

let router = express.Router();

router.get("/loadPres", (request, response) => PresCtrl.list((err, data) => {
    if (err) console.log(err);
    response.send(err || data);
}));

router.route("/loadPres/:presId")
    // get 1 pres
    .get((request, response) => PresCtrl.read(request.presId, (err, data) => {
        if (err) console.log(err);
        response.send(err || data);
    }));

router.route('/pres/:presId/images')
    // get all images from a pres
    .get((request, response) => PresCtrl.getAllImages(request.presId, (err, data) => {
        if (err) console.log(err);
        response.send(err || data);
    }));

router.post("/savePres", (request, response) => PresCtrl.create(request, response));

router.param("presId", (req, res, next, id) => {
    req.presId = id;
    next();
});


module.exports = router;