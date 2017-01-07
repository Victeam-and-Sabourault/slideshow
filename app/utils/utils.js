'use strict';

const fs = require("fs");
const path = require("path");
const CONFIG = require('../../config.json');

module.exports = {
	generateUUID () {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	},

	fileExists (path, callback) {
		fs.stat(path, (err, stat) => {
			if (err) {
				callback(err);
			} else {
				if (stat.isFile()) {
					callback(null);
				}
			}
		});
	},

	readFileIfExists (path, callback) {
		this.fileExists(path, err => {
			if (err) {
				callback(err);
			} else {
				fs.readFile(path, callback);
			}
		});
	},

	getMetaFilePath (id) {
		return path.join(CONFIG.contentDirectory, id + ".meta.json");
	},

	getDataFilePath (fileName) {
		return path.join(CONFIG.contentDirectory, fileName);
	},

	getNewFileName (id, originalFileName) {
		return id + '.' + originalFileName.split('.').pop();
	},

	getFileType (fileType) {
		if (fileType.match("image/*")) {
			return "IMG_B64";
		} else if (fileType.search("video")) {
			return "VIDEO_CUSTOM";
		}
	}
};


