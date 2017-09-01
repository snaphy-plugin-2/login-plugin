'use strict';
/*global angular, $snaphy, $scope, $stateParams */

angular.module($snaphy.getModuleName())

.controller('loginControl', ['$scope', 'Database', '$rootScope', 'LoginServices', '$injector',
    function($scope, Database, $rootScope, LoginServices, $injector) {
        //Adding title and name..
        $scope.name                  =  $snaphy.loadSettings('login', 'loginName');
        $scope.title                 =  $snaphy.loadSettings('login', 'loginTitle');
        $scope.loginState            =  $snaphy.loadSettings('login', "loginState");
        $scope.registerState         =  $snaphy.loadSettings('login', "registerState");
        $scope.forgotPassState       =  $snaphy.loadSettings('login', "forgotPassState");
        //Will decide whether to ask email or username for login user..
        $scope.loginAccepts          =  $snaphy.loadSettings('login', "accept");
        $scope.validateForm          =  $snaphy.loadSettings('login', "validations");

        var defaultTemplate          =  $snaphy.loadSettings('login', "defaultTemplate");
        $snaphy.setDefaultTemplate(defaultTemplate);

        var UserService = Database.getDb('login', 'User');
        $scope.credentials = {};
        $scope.loginError = false;

        function disableButton(){
            $scope.isClickEnabled = false;
        }

        function enableButton(){
            $scope.isClickEnabled = true;
        }



        //Enable the login button at first..
        enableButton();
        $scope.login = function (loginForm) {
            disableButton();
            LoginServices.login(loginForm, $scope.credentials)
                .then(function (user) {
                    $scope.loginError = false;
                    var $state = $injector.get('$state'),
                        redirectTo =  $rootScope.previousState.name ?  $rootScope.previousState.name :  LoginServices.redirectOtherWise;
                    var pathName = window.location.pathname || "/";
                    //Now reload the page after successfull login..
                    window.location.replace(pathName);
                    //Redirect to the default State..
                    //$state.go(redirectTo);
                })
                .catch(function (error) {
                    enableButton();
                    $scope.errorMsg = "Please login by providing correct username and password.";
                    //Display login error..
                    $scope.loginError = true;
                });
        };


    }//controller function..
]);
