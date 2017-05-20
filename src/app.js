/**
 * Created by goyalnik on 5/13/2017.
 */
var app = angular.module("app", [
    "common.directives.login"
]);

app.controller("appCtrl", [ "$rootScope", "$scope",
    function($rootScope, $scope){

        $scope.userId = "";
        $scope.userPassword = "";
        $scope.idErrorMessage = "";
        $scope.passwordErrorMessage = [];

        var onRegister = function(){

        };

        $scope.doLogin = function(){
            $scope.idErrorMessage = "Id is wrong";
        };

        $scope.doValidate = function(){
            return true;
        };

        onRegister();
    }
]);