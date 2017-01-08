angular.module('commServices', []).factory('comm',commFnc);
commFnc.$inject=['$http','$q'];

function commFnc($http,$q ){

     var comm = {
         loadImages: loadImages,
         loadAllImages: loadAllImages,
         uploadImage: uploadImage,
         loadPres: loadPres,
         savePres: savePres
     };
   
   function loadImages(presID) { 
       var deferred = $q.defer();
       $http.get('/pres/'+presID+'/images')
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
        $http.get('/loadPres/'+presID)
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

    return comm;
   
}
    