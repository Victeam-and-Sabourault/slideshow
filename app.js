'use strict';

// app.js
const express = require("express");
const http = require("http");
const path = require("path");

const CONFIG = require("./config.json");

const IOController = require('./app/controllers/io.controller');
const defaultRoute = require('./app/routes/default.route');
const slidRoute = require('./app/routes/slid.route');
const presRoute = require('./app/routes/pres.route');
const uploadRoute = require('./app/routes/upload.route');

let IOCtrl = new IOController();
let app = express();

app.use(defaultRoute);
app.use(slidRoute);
app.use(presRoute);
app.use(uploadRoute);
app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/login", express.static(path.join(__dirname, "public/login")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// init server
let server = http.createServer(app);
IOCtrl.listen(server);
server.listen(CONFIG.port);
