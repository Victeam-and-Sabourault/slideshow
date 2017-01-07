angular.module('commServices', []).factory('comm',commFnc);
commFnc.$inject=['$http','$q'];

function commFnc($http,$q ){

     var comm = {
         loadImages: loadImages,
         loadPres: loadPres,
         savePres: savePres
     };
   
   function loadImages(presID) { 
       var deferred = $q.defer();
       $http.get('/slids/'+presID)
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
    