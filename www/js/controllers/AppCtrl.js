﻿(function () {

    app.controller('AppCtrl', AppCtrl);
    AppCtrl.$inject = ['$scope', '$ionicModal', '$ionicPopover', '$timeout', '$state'];
    
    function AppCtrl($scope, $ionicModal, $ionicPopover, $timeout, $state) {

        // Form data for the login modal
        $scope.loginData = {};
        $scope.isExpanded = false;
        $scope.hasHeaderFabLeft = false;
        $scope.hasHeaderFabRight = false;
        /* Expose global object */
        $scope.coGlobal = coGlobal;

        var navIcons = document.getElementsByClassName('ion-navicon');
        for (var i = 0; i < navIcons.length; i++) {
            if (navIcons && navIcons.addEventListener) {
                navIcons.addEventListener('click', function () {
                    this.classList.toggle('active');
                });
            };
        }

        ////////////////////////////////////////
        // Layout Methods
        //////////////////////////////////////// 

        /* Return true if the current view status is the one passed as parameter */
        $scope.isCurrentViewState = function (coStatusEnum_toCompare) {
            srefToCompare = coGlobal.CoStatusEnum.properties[coStatusEnum_toCompare].sref;
            if ($state.$current.name === srefToCompare) {
                return true;
            } else {
                return false;
            };
        };

        /* call the current controlle 'manageHeaderRightClick' method */
        $scope.manageHeaderRightClick = function () {
            if (coGlobal.currentVm) {
                coGlobal.currentVm.manageHeaderRightClick();
            };
        };

        /* Go to state whish view state enum is passed as parameter */
        $scope.goToState = function (statusEnum) {
            if (statusEnum) {
                $state.go(coGlobal.CoStatusEnum.properties[statusEnum].sref);
            };
        };

        $scope.hideNavBar = function () {
            document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
        };

        $scope.showNavBar = function () {
            document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
        };

        $scope.noHeader = function () {
            var content = document.getElementsByTagName('ion-content');
            for (var i = 0; i < content.length; i++) {
                if (content[i].classList.contains('has-header')) {
                    content[i].classList.toggle('has-header');
                }
            }
        };

        $scope.setExpanded = function (bool) {
            $scope.isExpanded = bool;
        };

        $scope.setHeaderFab = function (location) {
            var hasHeaderFabLeft = false;
            var hasHeaderFabRight = false;

            switch (location) {
                case 'left':
                    hasHeaderFabLeft = true;
                    break;
                case 'right':
                    hasHeaderFabRight = true;
                    break;
            }

            $scope.hasHeaderFabLeft = hasHeaderFabLeft;
            $scope.hasHeaderFabRight = hasHeaderFabRight;
        };

        $scope.hasHeader = function () {
            var content = document.getElementsByTagName('ion-content');
            for (var i = 0; i < content.length; i++) {
                if (!content[i].classList.contains('has-header')) {
                    content[i].classList.toggle('has-header');
                }
            }

        };

        $scope.hideHeader = function () {
            $scope.hideNavBar();
            $scope.noHeader();
        };

        $scope.showHeader = function () {
            $scope.showNavBar();
            $scope.hasHeader();
        };

        $scope.clearFabs = function () {
            var fabs = document.getElementsByClassName('button-fab');
            if (fabs.length && fabs.length > 1) {
                fabs[0].remove();
            }
        };

    };
})();