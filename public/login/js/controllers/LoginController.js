angular.module('loginApp').controller('loginCtrl', loginCrtFnt);

loginCrtFnt.$inject = ['$scope', '$log', '$window', 'auth'];

function loginCrtFnt($scope, $log, $window, auth) {

    $scope.getUserList = function() {
        return auth.userList();
    };

    $scope.logAuth= function(user) {
    
        auth.checkUser(user.login, user.pwd).then(
            (user) => { 
                if (user.role == 'admin') {
                    $window.location.href = 'admin.html'; 
                } else {
                    $window.location.href = 'watch.html'; 
                }
            },
            () => { console.log('Error'); }
        );
            
    };
}