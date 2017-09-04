(function () {

    app.controller('RqgtDetailsCtrl', RqgtDetailsCtrl);
    RqgtDetailsCtrl.$inject = ['$scope', '$stateParams', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion', 'Books', '$ionicLoading', 'ErrorMng', 'Rqgt', '$state'];

    function RqgtDetailsCtrl($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, Books, $ionicLoading, ErrorMng, Rqgt, $state) {
        
        var vm = this;

        vm.currentRqgt = {};
        
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

        /* Set width dynamically */
        //$('.header-pub-btn').css('width', '150px !important'); 

        /* Publish rqgt details finalization */
        vm.manageHeaderRightClick = function () {
            vm.showLoading();
            /* Simulate calling service and backend */
            /* TO BE DEVELOPED */
            $timeout(function () {
                $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.REQ_GOOD_TRANSPORT].sref);
                $ionicLoading.hide();
            }, 2000)
        };

        /* Load current Rqgt details */
        vm.loadCurrentRqgtDetails = function () {
            /* Take current Rqgt details from service */
            vm.currentRqgt = Rqgt.currentRqgt;
        };

        vm.showLoading = function () {
            $ionicLoading.show({
                template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
            });
        };

        /* publish rqgt item */
        vm.publishItem = function () {
            vm.showLoading();
            /* Simulate calling service and backend */
            /* TO BE DEVELOPED */
            $timeout(function () {
                $state.go('app.reqGoodTransport');
                $ionicLoading.hide();
            }, 2000)
        };

        /* Init controller function */
        vm.initController = function () {
            vm.loadCurrentRqgtDetails();
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