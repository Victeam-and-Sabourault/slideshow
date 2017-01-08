'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');

const PresCtrl = require('../controllers/pres.controller');
const CONFIG = require('../../config.json');

let router = express.Router();
let presCtrl = new PresCtrl();

router.get("/loadPres", (request, response) => presCtrl.list((err, data) => {
    if (err) console.log(err);
    response.send(err || data);
}));

router.route("/loadPres/:presId")
    // get 1 pres
    .get((request, response) => presCtrl.read(request.presId, (err, data) => {
        if (err) console.log(err);
        response.send(err || data);
    }));

router.route('/pres/:presId/images')
    // get all images from a pres
    .get((request, response) => presCtrl.getAllImages(request.presId, (err, data) => {
        if (err) console.log(err);
        respones.send(err || data);
    }));

router.post("/savePres", (request, response) => presCtrl.create(request, response));

router.param("presId", (req, res, next, id) => {
    req.presId = id;
    next();
});


module.exports = router;