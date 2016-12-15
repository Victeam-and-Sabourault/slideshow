'use strict';

export default class SlidModel {

    constructor (slid) {
        this.type = slid.type;
        this.id = slid.id;
        this.title = slid.title;
        this.fileName = slid.fileName;
        let _data = slid.getData();

        this.getData = () => _data;

        this.setData = (data) => _data = data; 
    }

    static create (slid, callback) {

    }

    static read (id, callback) {

    }

    static update (slid, callback) {

    }

    static delete (id, callback) {

    }

}