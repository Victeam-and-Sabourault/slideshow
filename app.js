// app.js
var express = require("express");
var http = require("http");
var path = require("path");

var CONFIG = require("./config.json");

var defaultRoute = require('./app/routes/default.route');
var slidRoute = require('./app/routes/slid.router');

var app = express();
app.use(defaultRoute);
app.use(slidRoute);
app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/login", express.static(path.join(__dirname, "public/login")));

// init server
var server = http.createServer(app);
server.listen(CONFIG.port);
process.env.CONFIG = JSON.stringify(CONFIG);
// var CONFIG = JSON.parse(process.env.CONFIG); ===> TO ACCESS IN MODULES