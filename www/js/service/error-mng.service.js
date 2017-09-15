(function () {
    'use strict';

    app.service('ErrorMng', ErrorMng);

    ErrorMng.$inject = ['$q', '$http', '$state'];

    function ErrorMng($q, $http, $state) {
        var self = this;

        /* jshint validthis:true */
        self.showSystemError = _showSystemError;
        
        ////////////////

        /* Get loaded documents */
        function _showSystemError(errorMsg) {
            /* For the moment just redirect to home page */
            //return self.events;
            var alertPopup = $ionicPopup.alert({
                title: 'Errore',
                template: 'L\'operazione non è riuscita. Riprovare o contattare l\'amministratore dell\'applicazione se l\'errore persiste.' + errorMsg
            });
        };                
    }
})();
