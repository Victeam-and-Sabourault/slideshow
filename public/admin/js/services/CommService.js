angular.module('commServices', []).factory('comm',commFnc);
commFnc.$inject=['$http','$q'];

function commFnc($http,$q ){

     var comm = {
         loadImages: loadImages,
         loadPres: loadPres,
         savePres: savePres
     };
   
   function loadImages(presName,presID) { 
       var deferred = $q.defer();
       $http.get('/resources_list/'+presID)
            .then(
                (data, status, headers, config) => deferred.resolve(data))
            .catch(
                (data, status, headers, config) => deferred.reject(status));
       return deferred.promise;
    }

    function loadPres(presName,presID) { 
        var deferred = $q.defer();
        $http.get('/slids/'+presID)
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
    