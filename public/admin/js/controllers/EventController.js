angular.module('adminApp').controller('eventCtrl', eventCrtFnt);

eventCrtFnt.$inject = ['$scope', '$http', 'factory'];

function eventCrtFnt($scope, $http, factory) {
    $scope.presentations = [];
    $http.get('/slids').then(
        (res) => {
            this.presentations = res.data;
            $scope.currentPresentation = this.presentations[0][Object.keys(this.presentations[0])[0]];
            console.log($scope.currentPresentation);
        },
        (data, status, header, config) => {
            console.log('error');
        }
    );

    $scope.newSlide = () => {
        $scope.currentPresentation.slidArray.push(factory.slidCreation('Test', 'toto'));
    };

    $scope.selectCurrentSlid = (slide) => { 
        $scope.currentSlide=slide;
    };

    $scope.isSlidContentEmpty = (slid) => { 
        if(slid.contentMap[1] === undefined){
            return true;
        }
        return false;
    };
}