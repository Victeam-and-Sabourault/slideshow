angular.module('AuthService', []).service('auth', authFnc);

authFnc.$inject = ['$q', '$http'];

function authFnc($q, $http) {
    var userMap = {};

    userMap.jdoe = {
        pwd : 'jdoe',
        role : 'member'
    };
    userMap.psmith = {
        pwd : 'psmithpwd',
        role : 'member'
    };
    userMap.tp = {
        pwd : 'tp',
        role : 'admin'
    };

    // var fncContainer = {
    //     checkUser: checkUser, 
    //     userList: userList

    // };

    // function checkUser(userlogin, userpwd) { 
    //     return userMap[userlogin] == userpwd;
    // };

    // function userList() {
    //     return userMap;
    // };

    var fncContainer = {
        checkUser: localAuthAsk
    };
    
    function localAuthAsk(login, pwd) {
        let deferred = $q.defer(); 
        setInterval(function (login, pwd) {
            if ( (userMap[login]) && (userMap[login].pwd == pwd) ) {
                deferred.resolve(userMap[login]);
            } else {
                deferred.reject();
            }
            clearInterval(this);
        }, 30, login, pwd);
        return deferred.promise;
    }

    function authAsk(login, pwd) {
        let deferred = $q.defer(); 
        $http.post('/fakeauthwatcher', {'login': login, 'pwd': pwd}).then(
            (data, status, header, config) => {
                deferred.resolve(data);
            },
            (data, status, header, config) => {
                deferred.reject();
            }
        );
        return deferred.promise;
    }

    return fncContainer; 

}