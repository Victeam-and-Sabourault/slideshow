angular.module('adminApp').controller('playerCtrl', playerCrtFnt);

playerCrtFnt.$inject = ['$scope', 'comm', 'factory'];

function playerCrtFnt($scope, comm, factory) {

    $scope.socket = comm.io.socketConnection($scope, factory.generateUUID());

    $scope.socket.on('slid', (message) => {
        $scope.$parent.selectCurrentSlid($scope.$parent.currentPresenation.slidArray.filter((slid) => slid.contentMap[1] == message.SLID.id)[0]);
    });

    $scope.emitBegin = () => {
        comm.io.emitBegin($scope.socket);
    };

    $scope.emitPrev = () => {
        comm.io.emitPrev($scope.socket);
    };

    $scope.emitStart = () => {
        comm.io.emitStart($scope.socket, $scope.currentPresenation.id);
    };

    $scope.emitPause = () => {
        comm.io.emitPause($scope.socket);
    };

    $scope.emitNext = () => {
        comm.io.emitNext($scope.socket);
    };

    $scope.emitEnd = () => {
        comm.io.emitEnd($scope.socket);
    };

}
