(function () {

    app.controller('RqgtDetailsPublishCtrl', RqgtDetailsPublishCtrl);
    RqgtDetailsPublishCtrl.$inject = ['$scope', '$stateParams', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion',
        'Books', '$ionicLoading', 'ErrorMng', 'Rqgt', '$state', '$ionicPopup', 'Principal', 'ionicDatePicker',
    'CommonService'];

    function RqgtDetailsPublishCtrl($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, Books,
        $ionicLoading, ErrorMng, Rqgt, $state, $ionicPopup, Principal, ionicDatePicker, CommonService) {

        var vm = this;

        vm.currentRqgt = {};

        /* Link to pax global object to allow binding to the view */
        vm.coGlobal = coGlobal;

        /* Inform coGlobal about the current controller instance */
        coGlobal.currentVm = vm;

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
            vm.currentRqgt.fromAddress = location;
        };

        /* Destination Address */
        vm.onDestAddressSelection = function (location) {
            vm.currentRqgt.destAddress = location;
        };

        /*  ----------------------------------------------------*/
        /*  --------------------  DATEPICKER  ------------------*/
        /*  ----------------------------------------------------*/


        /* Add callback to datepicker */ 
        vm.datepickerDate = coGlobal.datepickerDate;
        vm.datepickerDate.callback = function (val) {  //Mandatory
            vm.currentRqgt.dateTransportFixed = new Date(val);
            vm.currentRqgt.dateShown = vm.currentRqgt.dateTransportFixed.toLocaleDateString('it-IT');
        };
        /* Init datepicker */
        vm.openDatePicker = function () {
            ionicDatePicker.openDatePicker(vm.datepickerDate); 
        };

        /*  ----------------------------------------------------*/
        /*  -----------------  END - DATEPICKER  ---------------*/
        /*  ----------------------------------------------------*/

        /* Publish rqgt details finalization */
        vm.manageHeaderRightClick = function () {
            if (!coGlobal.isUserLogged) {
                $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.LOGIN_SIGNIN].sref);
            } else {
                vm.callbackAfterLogin();
            };
        };

        /* Callback to be called once user has logged in to publish the request */
        vm.callbackAfterLogin = function () {
            vm.showLoading();
            $timeout(function () {
                /* Simulate calling service and backend */
                /* TO BE DEVELOPED */
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Operazione riuscita',
                    template: 'La tua richiesta è stata pubblicata. Sarai ora reindirizzato alla pagina iniziale.'
                });

                alertPopup.then(function (res) {
                    $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.REQ_GOOD_TRANSPORT].sref);
                });
            }, 2000);            
        };

        /* Load current Rqgt details */
        vm.loadCurrentRqgtDetails = function () {
            /* Take current Rqgt details from service */
            vm.currentRqgt = Rqgt.currentRqgt;
            /* Date Mapping */
            coGlobal.dateMapping(vm.currentRqgt);
            //if (vm.currentRqgt.dateTransportFixed) {
            //    vm.currentRqgt.dateTransportFixed = moment(vm.currentRqgt.dateTransportFixed).toDate();
            //    vm.currentRqgt.dateShown = vm.currentRqgt.dateTransportFixed.toLocaleDateString('it-IT');
            //} else {
            //    vm.currentRqgt.dateShown = 'Prima possibile';
            //};
            /* If it is an update case, then load current options */
            if (vm.currentRqgt.id) {
                vm.LoadOptions();
            };
        };

        /* Load current Transport Options */
        vm.LoadOptions = function () {
            vm.showLoading(); 
            /* Set current rqgt id */
            CommonService.currentId = vm.currentRqgt.id;
            /* Then call the service */
            CommonService.getOptionsList().then(function (respData) {
                if (respData.operationResult === true) {
                    vm.currentRqgt.reqGoodTransportOpt = respData.resultData;
                    /* Then map all options properties */
                    //coGlobal.mapOptionsToObject(vm.currentRqgt, vm.currentRqgt.reqGoodTransportOpt);
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

        /* Init controller function */
        vm.initController = function () {
            vm.loadCurrentRqgtDetails();
            Principal.cb_afterLogin = vm.callbackAfterLogin;
        };

        /* Call init controller */
        vm.initController();

        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/
        /*  ------------------------------------------------------  STYLE - Animations - Headers  ------------------------------------------------------*/
        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/

        // Set Header
        //$scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.$parent.setHeaderFab('left');
    };

})();