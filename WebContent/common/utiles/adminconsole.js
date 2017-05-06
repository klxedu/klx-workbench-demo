angular.module('adminconsole', [
    'ngRoute',
    'Module.commng'
])
.config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider.otherwise('/adminconsole/commmng');
    }
])

.constant("menuBarActiveClass","active")

.controller('acctrl',
    function ($scope) {

        $scope.msg = "hello world";
    }
);
