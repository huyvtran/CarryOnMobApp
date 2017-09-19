(function () {

    app.controller('TransportAvDetailsShowCtrl', TransportAvDetailsShowCtrl);
    TransportAvDetailsShowCtrl.$inject = ['$scope', '$stateParams', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion',
        '$controller', 'Books', '$state', 'ErrorMng', '$sce', '$ionicPopup', 'Events', 'ionicDatePicker', 'Transport',
        '$ionicPopup', '$interval', '$ionicActionSheet', 'CommonService'];

    function TransportAvDetailsShowCtrl($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion,
        $controller, Books, $state, ErrorMng, $sce, $ionicPopup, Events, ionicDatePicker, Transport, $ionicPopup,
        $interval, $ionicActionSheet, CommonService) {

        var vm = this;
               
        /* Link to pax global object to allow binding to the view */
        vm.coGlobal = coGlobal;
        vm.transportServ = Transport;
        vm.commonService = CommonService;
        vm.currentTrAv = vm.transportServ.currentTrAvDetails;
               
        /* Load current Transport Options */
        vm.LoadOptions = function () {
            /* Set current rqgt id */
            CommonService.currentId = vm.currentTrAv.id;
            /* Then call the service */
            CommonService.getOptionsList().then(function (respData) {
                if (respData.operationResult === true) {
                    vm.currentTrAv.reqGoodTransportOpt = respData.resultData;
                }
            });
        };



        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/
        /*  ------------------------------------------------------     INIT FUNCTIONS     ------------------------------------------------------*/
        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/

        // Set Motion
        vm.setMotion = function () {
            $timeout(function () {
                ionicMaterialMotion.slideUp({
                    selector: '.slide-up'
                });
            }, 30);

            $timeout(function () {
                ionicMaterialMotion.fadeSlideInRight({
                    startVelocity: 3000
                });
            }, 700);

            /* Options loading ended */
            ionicMaterialMotion.blinds({
                startVelocity: 3000
            });

            // Set Ink
            ionicMaterialInk.displayEffect();
        };


        /* Init controller function */
        vm.initController = function () {
            /* If a notification comes occurred, then reset all 'isLoaded' flags 
             * in order to force the app to reload data from the server */
            if (coGlobal.NotificationOccurred === true) {
                coGlobal.NotificationOccurred = false;
            };
            vm.setMotion();
            vm.LoadOptions();
        };

        /* Call phone number */
        vm.callNumber = function (numberToCall) {
            window.plugins.CallNumber.callNumber(null, null, numberToCall, false);
        };

        vm.sendWhatsapp = function (numberToChat) {
            cordova.plugins.Whatsapp.send(numberToChat);
            //window.plugins.CallNumber.callNumber(null, null, numberToChat, false);
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