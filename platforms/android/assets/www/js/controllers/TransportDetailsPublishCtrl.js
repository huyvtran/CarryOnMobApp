(function () {

    app.controller('TransportDetailsPublishCtrl', TransportDetailsPublishCtrl);
    TransportDetailsPublishCtrl.$inject = ['$scope', '$stateParams', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion',
        'Books', '$ionicLoading', 'ErrorMng', 'Rqgt', '$state', '$ionicPopup', 'Principal', 'Transport', 'ionicDatePicker',
    'CommonService'];

    function TransportDetailsPublishCtrl($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, Books,
        $ionicLoading, ErrorMng, Rqgt, $state, $ionicPopup, Principal, Transport, ionicDatePicker, CommonService) {

        var vm = this;

        vm.currentTransport = {};

        /* Inform coGlobal about the current controller instance */
        coGlobal.currentVm = vm;

        /* Link to pax global object to allow binding to the view */
        vm.coGlobal = coGlobal;

        vm.getPageTitle = function () {
            return 'Pubblica la richiesta';
        };

        vm.setMotion = function () {
            // Set Motion
            $timeout(function () {
                ionicMaterialMotion.blinds();
                //// Set Ink
                ionicMaterialInk.displayEffect();
            }, 300);
        }; 

        /* From Address */
        vm.onFromAddressSelection = function (location) {
            vm.currentTransport.fromAddress = location;
        };

        /* Destination Address */
        vm.onDestAddressSelection = function (location) {
            vm.currentTransport.destAddress = location;
        };

        /* Publish rqgt details finalization */
        vm.manageHeaderRightClick = function () {
            if (!coGlobal.isUserLogged) { 
                $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.LOGIN_SIGNIN].sref);
            } else {
                vm.callbackAfterLogin();
            };
        };

        /* publish transport item */
        vm.publishItem = function publishItem() {
            /* Go to transport publish state */
            $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.TRANSPORT_DETAILS_PUBLISH].sref);
            /* Add user Data */
            var userData = coGlobal.getUserData(); 
            $.extend(vm.currentTransport, userData);
            /* Start publishing */
            vm.showLoading();
            /* Then call the service */
            CommonService.publishItem(vm.currentTransport).then(function (respData) {
                /* hide loading */
                $ionicLoading.hide();
                /* If operation was succesfull, then inform user and go back to home */
                if (respData && respData.operationResult === true) {
                    vm.ItemPublished_CB();
                } else {
                    ErrorMng.showSystemError(respData ? respData.resultMessage : '');
                };
            }, function (respData) {
                /* hide loading */
                ErrorMng.showSystemError(respData.resultMessage);
                $ionicLoading.hide();
            });

            vm.ItemPublished_CB = function ItemPublished_CB() {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Operazione riuscita',
                    template: 'La tua richiesta è stata pubblicata. Sarai ora reindirizzato alla pagina iniziale.'
                });

                alertPopup.then(function (res) {
                    $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.REQ_GOOD_TRANSPORT].sref);
                });
            };

            /* Simulate calling service and backend */
            /* TO BE DEVELOPED */
            //$timeout(vm.ItemPublished_CB, 2000);
        };

        /* Callback to be called once user has logged in to publish the request */
        vm.callbackAfterLogin = function () {
            vm.publishItem();
        };

        /* Load current Rqgt details */
        vm.loadCurrentTransportDetails = function () {
            /* Take current Rqgt details from service */
            vm.currentTransport = Transport.currentTransport;
            /* Date Mapping */
            coGlobal.dateMapping(vm.currentTransport);
            //if (vm.currentTransport.dateTransportFixed) {
            //    vm.currentTransport.dateTransportFixed = moment(vm.currentTransport.dateTransportFixed).toDate();
            //    vm.currentTransport.dateShown = vm.currentTransport.dateTransportFixed.toLocaleDateString('it-IT');
            //} else {
            //    vm.currentTransport.dateShown = 'Prima possibile';
            //};
            /* If it is an update case, then load current options */
            if (vm.currentTransport.id) {
                vm.LoadOptions();
            };
        };

        /* Load current Transport Options */
        vm.LoadOptions = function () {
            vm.showLoading();
            /* Set current rqgt id */
            CommonService.currentId = vm.currentTransport.id;
            /* Then call the service */
            CommonService.getOptionsList().then(function (respData) {
                if (respData.operationResult === true) {
                    vm.currentTransport.reqGoodTransportOpt = respData.resultData;
                    /* Then map all options properties */
                    //coGlobal.mapOptionsToObject(vm.currentTransport, vm.currentTransport.reqGoodTransportOpt);
                };
                /* hide loading */
                $ionicLoading.hide();
            }, function (respData) {
                /* hide loading */
                $ionicLoading.hide();
            });
        };

        /* Show loading spinner */
        vm.showLoading = function () {
            $ionicLoading.show({
                template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
            });
        };

        /* transport rqgt item */
        //vm.publishItem = function () {
        //    vm.showLoading();
        //    /* Then call the service */
        //    CommonService.publishItem(itemToPublish).then(function (respData) {
        //        /* hide loading */
        //        $ionicLoading.hide();
        //        /* If operation was succesfull, then inform user and go back to home */
        //        if (respData.operationResult === true) {
        //            vm.ItemPublished_CB();
        //        };
        //    }, function (respData) {
        //        /* hide loading */
        //        $ionicLoading.hide();
        //    });

        //    vm.ItemPublished_CB = function ItemPublished_CB() {
        //        $ionicLoading.hide();
        //        var alertPopup = $ionicPopup.alert({
        //            title: 'Operazione riuscita',
        //            template: 'La tua richiesta è stata pubblicata. Sarai ora reindirizzato alla pagina iniziale.'
        //        });

        //        alertPopup.then(function (res) {
        //            $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.REQ_GOOD_TRANSPORT].sref);
        //        });
        //    };

        //    /* Simulate calling service and backend */
        //    /* TO BE DEVELOPED */
        //    //$timeout(vm.ItemPublished_CB, 2000);
        //};

        /* Init controller function */
        vm.initController = function () {
            vm.loadCurrentTransportDetails();
            Principal.cb_afterLogin = vm.callbackAfterLogin;
        };

        /* Call init controller */
        vm.initController();

        /*  ----------------------------------------------------*/
        /*  --------------------  DATEPICKER  ------------------*/
        /*  ----------------------------------------------------*/


        /* Add callback to datepicker */ 
        vm.datepickerDate = coGlobal.datepickerDate;
        vm.datepickerDate.callback = function (val) {  //Mandatory
            vm.currentTransport.dateTransportFixed = new Date(val);
            vm.currentTransport.dateShown = vm.currentTransport.dateTransportFixed.toLocaleDateString('it-IT');
        };
        /* Init datepicker */
        vm.openDatePicker = function () {
            ionicDatePicker.openDatePicker(vm.datepickerDate); 
        };

        /*  ----------------------------------------------------*/
        /*  -----------------  END - DATEPICKER  ---------------*/
        /*  ----------------------------------------------------*/

        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/
        /*  ------------------------------------------------------  STYLE - Animations - Headers  ------------------------------------------------------*/
        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/

        // Set Header
        //$scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.$parent.setHeaderFab('left');
    };

})();