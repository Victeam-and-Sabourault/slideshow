angular.module('adminApp').controller('eventCtrl', eventCrtFnt);

eventCrtFnt.$inject = ['$scope', '$http', 'factory'];

function eventCrtFnt($scope, $http, factory) {
    $scope.presentations = [];
    $http.get('localhost:1337/slids').then(
        (data, status, header, config) => {
            this.presentations = data;
            $scope.currentPresentation = this.presentations[0];
        },
        (data, status, header, config) => {

        }
    );
}