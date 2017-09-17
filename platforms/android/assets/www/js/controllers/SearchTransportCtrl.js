(function () {

    app.controller('SearchTransportCtrl', SearchTransportCtrl);
    SearchTransportCtrl.$inject = ['$scope', '$stateParams', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion', '$controller', 'Books', '$state', 'ErrorMng', '$sce', '$ionicPopup', 'Events', 'ionicDatePicker', 'Transport', '$ionicPopup', '$interval', '$ionicActionSheet', '$ionicLoading'];

    function SearchTransportCtrl($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $controller, Books, $state, ErrorMng, $sce, $ionicPopup, Events, ionicDatePicker, Transport, $ionicPopup, $interval, $ionicActionSheet, $ionicLoading) {

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

        /* Show Loading */
        vm.showLoading = function () {
            $ionicLoading.show({
                template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
            });
        };

        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/
        /*  ------------------------------------------------------------  EDIT or DELETE  --------------------------------------------------------------*/
        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/

        /* Callback to be called once user has logged in to publish the request */
        vm.deleteCallback = function () {
            var alertPopup = $ionicPopup.confirm({
                title: 'Confermi la cancellazione?',
                cancelText: 'No',
                okText: 'Si\''
            });

            alertPopup.then(function (res) {
                if (res) {
                    vm.showLoading();
                    /* TO BE DEVELOPED - Delete Transp (vm.holdTransp) */
                    $timeout(function () {
                        $ionicLoading.hide();
                    }, 2000);
                };
            });
        };

        /* Show action sheet for EDIT or DELETE */
        vm.showActionSheet_ED = function (transp) {
            vm.holdTransp = transp;
            vm.hideSheet = $ionicActionSheet.show({
                buttons: [{
                    text: 'Modifica'
                }, {
                    text: 'Elimina'
                }],
                //destructiveText: 'Delete',
                //titleText: 'Seleziona la tua necessita\'',
                cancelText: 'Cancel',
                cancel: function () {
                    // add cancel code..
                },
                buttonClicked: function (index) {
                    vm.hideSheet();
                    if (index == 0) {
                        /* Go to publish transp page to modify and publish it */
                        Transport.currentTransport = vm.holdTransp;
                        $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.TRANSPORT_DETAILS_PUBLISH].sref);
                    } else if (index == 1) {
                        /* Conferma elimina e, in caso, elimina */
                        vm.deleteCallback();
                    };
                }
            });
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