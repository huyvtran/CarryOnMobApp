(function () {

    app.controller('SearchTransportCtrl', SearchTransportCtrl);
    SearchTransportCtrl.$inject = ['$scope', '$stateParams', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion', '$controller', 'Books', '$state', 'ErrorMng', '$sce', '$ionicPopup', 'Events', 'ionicDatePicker', 'Transport', '$ionicPopup', '$interval', '$ionicActionSheet'];

    function SearchTransportCtrl($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $controller, Books, $state, ErrorMng, $sce, $ionicPopup, Events, ionicDatePicker, Transport, $ionicPopup, $interval, $ionicActionSheet) {

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

        /* Init available transport list */
        vm.initLoadTransportResults = function initLoadTransportResults() { 
            /* If data has not been loaded yet, then load it */
            if (Transport.loadedTransportResults == false) {
                Transport.getTransportFiltered().then(
                function (result) {
                    /* Refresh variables scope */
                    coGlobal.runDigest($scope); 
                },
                function (error) {
                    // handle error here
                    coGlobal.runDigest($scope);
                });
            };
        };
        /* Go to transport available showdetails */
        vm.goToTransportDetails = function (transp) {
            /* Set current transport */
            Transport.currentTrAvDetails = transp;

            /* go to transport details page */
            $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.TRANSPORTAV_DETAILS_SHOW].sref);
        };

        $("#btn-publish-rqgt").on("click", function () {
            $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.RQGT_DETAILS_PUBLISH].sref);
        });

        /* Go to publish rqgt page */
        vm.goTransportDetailsPublished = function () {
            $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.TRANSPORTAV_DETAILS_SHOW].sref);
        };
        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/
        /*  ------------------------------------------------------     INIT FUNCTIONS     ------------------------------------------------------*/
        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/


        /* Init controller function */
        vm.initController = function () {
            /* If a notification comes occurred, then reset all 'isLoaded' flags 
             * in order to force the app to reload data from the server */
            if (coGlobal.NotificationOccurred === true) {
                coGlobal.NotificationOccurred = false;
            };
            vm.initLoadTransportResults();
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