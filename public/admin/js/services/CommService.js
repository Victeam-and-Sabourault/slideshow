angular.module('commServices', []).factory('comm', commFnc);
commFnc.$inject = ['$http', '$q'];

function commFnc($http, $q) {

    var comm = {
        loadImages: loadImages,
        loadAllImages: loadAllImages,
        uploadImage: uploadImage,
        loadPres: loadPres,
        savePres: savePres,
        io: io
    };

    function loadImages(presID) {
        var deferred = $q.defer();
        $http.get('/pres/' + presID + '/images')
            .then(
            (data, status, headers, config) => deferred.resolve(data))
            .catch(
            (data, status, headers, config) => deferred.reject(status));
        return deferred.promise;
    }

    function loadAllImages() {
        var deferred = $q.defer();
        $http.get('/uploads')
            .then(
            (data, status, headers, config) => deferred.resolve(data))
            .catch(
            (data, status, headers, config) => deferred.reject(status));
        return deferred.promise;
    }

    function loadPres(presID) {
        var deferred = $q.defer();
        $http.get('/loadPres/' + presID)
            .then(
            (data, status, headers, config) => deferred.resolve(data))
            .catch(
            (data, status, headers, config) => deferred.reject(status));
        return deferred.promise;
    }

    function uploadImage(presID, slidID, file) {
        var deferred = $q.defer();
        $http.post(`/pres/${presID}/slid/${slidID}/upload/${file}`)
            .then(
            (data, status, headers, config) => deferred.resolve(data))
            .catch(
            (data, status, headers, config) => deferred.reject(status));
        return deferred.promise;
    }

    //TODO
    function savePres(pres) {
        // TODO
        var deferred = $q.defer();
        setTimeout(() => {
            deferred.resolve();
        }, 3000);
        return deferred.promise;
    }

    comm.io = {};
    comm.io.socketConnection = function (scope, uuid) {
        var socket = io.connect();
        comm.io.uuid = uuid;
        socket.on('connection', function () {
            socket.emit('data_comm', { 'id': comm.io.uuid });
        });
        // socket.on('newPres', function (socket) {

        // });
        // socket.on('slid', function (socket) {
            
        // });
        return socket;
    }

    comm.io.emitPrev = function (socket) {
        socket.emit('slidEvent', { 'CMD': "PREV" });
    }

    comm.io.emitNext = function (socket) {
        socket.emit('slidEvent', { 'CMD': "NEXT" });
    }

    comm.io.emitStart = function (socket, presUUID) {
        socket.emit('slidEvent', { 'CMD': "START", 'PRES_ID': presUUID });
    }

    comm.io.emitPause = function (socket) {
        socket.emit('slidEvent', { 'CMD': "PAUSE" });
    }

    comm.io.emitBegin = function (socket) {
        socket.emit('slidEvent', { 'CMD': "BEGIN" });
    }

    comm.io.emitEnd = function (socket) {
        socket.emit('slidEvent', { 'CMD': "END" });
    }

    return comm;

}
