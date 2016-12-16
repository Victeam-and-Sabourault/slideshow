angular.module('commServices', []).factory('comm',commFnc);
commFnc.$inject=['$http','$q'];

function commFnc($http,$q ){
     var comm = {
         loadImages:       loadImages,
         loadPres:          loadPres,
         savePres:      savePres
         
     };
   
   //TODO
   function loadImages(presName,presID) { 
        // TODO
        var deferred = $q.defer();
        setTimeout(() => {
            deferred.resolve();
        }, 3000);
        return deferred.promise;
    }

    function loadPres(presName,presID) { 
        $http.get(`/slids/${presID}`).then(
        (res) => {
            this.presentations = res.data;
            $scope.currentPresentation = this.presentations[0][Object.keys(this.presentations[0])[0]];
            console.log($scope.currentPresentation);
        },
        (data, status, header, config) => {
            console.log('error');
        }
    );
    }
   
}
    