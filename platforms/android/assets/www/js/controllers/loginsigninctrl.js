(function () {

    app.controller('LoginSigninCtrl', LoginSigninCtrl);
    LoginSigninCtrl.$inject = ['$scope', '$stateParams', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion', '$controller', 'Books', '$state', 'ErrorMng', '$sce', '$ionicPopup', 'Events', 'ionicDatePicker', 'Transport', '$ionicPopup', '$interval', '$ionicActionSheet', '$ionicLoading', 'Principal'];

    function LoginSigninCtrl($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $controller, Books, $state, ErrorMng, $sce, $ionicPopup, Events, ionicDatePicker, Transport, $ionicPopup, $interval, $ionicActionSheet, $ionicLoading, Principal) {
        
        var vm = this;
        
        /* Link to pax global object to allow binding to the view */
        vm.coGlobal = coGlobal;
        vm.transportServ = Transport;

        vm.setMotion = function () {
            $timeout(function () {
                ionicMaterialMotion.blinds({
                    startVelocity: 3000
                });
            }, 100);
        };
        
        /* Handler for 'register' first click */
        vm.signinFirstCall = function () {
            /* Save user info in service and go to signin page */
            Principal.userInfo = vm.userInfo;
            $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.REGISTER_USER].sref);
        };

        /* Handler for 'register' first click */
        vm.logIn = function () {
            vm.showLoading();
            /* Simulate calling service and backend */
            /* TO BE DEVELOPED */
            $timeout(function () {
                $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.REQ_GOOD_TRANSPORT].sref);
                $ionicLoading.hide();
            }, 2000);
        };

        

        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/
        /*  ------------------------------------------------------     INIT FUNCTIONS     ------------------------------------------------------*/
        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/

        vm.showLoading = function () {
            $ionicLoading.show({
                template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
            });
        };

        /* Init controller function */
        vm.initController = function () {
            /* If a notification comes occurred, then reset all 'isLoaded' flags 
             * in order to force the app to reload data from the server */
            if (coGlobal.NotificationOccurred === true) {
                coGlobal.NotificationOccurred = false;
            };
        };

        /* Call init controller */
        vm.initController();

        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/
        /*  ------------------------------------------------------  STYLE - Animations - Headers  ------------------------------------------------------*/
        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/

        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Ink
        ionicMaterialInk.displayEffect();

        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/
        /*  ------------------------------------------------------  STYLE - Animations - Headers  ------------------------------------------------------*/
        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/

    };

})();
