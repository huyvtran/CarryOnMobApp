(function () {

    app.controller('FirstChoiceCtrl', FirstChoiceCtrl);
    FirstChoiceCtrl.$inject = ['$scope', '$stateParams', '$window', 'ionicMaterialInk', 'ionicMaterialMotion', '$controller', 'Books', '$state', 'ErrorMng', '$sce', '$ionicPopup', 'Events'];

    function FirstChoiceCtrl($scope, $stateParams, $window, ionicMaterialInk, ionicMaterialMotion, $controller, Books, $state, ErrorMng, $sce, $ionicPopup, Events) {
        
        var vm = this;

        vm.goTwitter = function () {
            $window.open('https://twitter.com/librairiepax');
        };

        vm.goFacebook = function () {
            $window.open('https://www.facebook.com/Librairie-Pax-180592962073215');
        };

        vm.goInstagram = function () {
            $window.open('https://www.instagram.com/librairie_pax/');
        };

        vm.callPax = function () {
            window.plugins.CallNumber.callNumber(null, null, "+3242232146", false);
        };
    };

})();