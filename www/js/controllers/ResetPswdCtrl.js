﻿(function () {

    app.controller('ResetPswdCtrl', ResetPswdCtrl);
    ResetPswdCtrl.$inject = ['$scope', '$stateParams', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion', '$controller', 'Books', '$state', 'ErrorMng', '$sce', '$ionicPopup', 'Events', 'ionicDatePicker', 'Principal', '$ionicPopup', '$interval', '$ionicActionSheet', '$ionicLoading', '$ionicPopup'];

    function ResetPswdCtrl($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $controller, Books, $state, ErrorMng, $sce, $ionicPopup, Events, ionicDatePicker, Principal, $ionicPopup, $interval, $ionicActionSheet, $ionicLoading, $ionicPopup) {

        var vm = this;

        /* Link to pax global object to allow binding to the view */
        vm.coGlobal = coGlobal;
        /* Get user info from service */
        vm.userInfo = Principal.userInfo;


        vm.setMotion = function () {
            $timeout(function () {
                ionicMaterialMotion.blinds({
                    startVelocity: 3000
                });
            }, 100);
        };

        /* Handler for 'register' first click */
        vm.resetPswd = function () {
            vm.showLoading();
            /* Simulate calling service and backend */
            /* TO BE DEVELOPED */
            $timeout(function () {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Operazione riuscita',
                    template: 'La nuova password ti è stata inviata via mail. Sarai ora reindirizzato alla pagina iniziale.'
                });

                alertPopup.then(function (res) {
                    $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.REQ_GOOD_TRANSPORT].sref);
                });
                return;
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
