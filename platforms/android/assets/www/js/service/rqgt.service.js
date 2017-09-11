﻿(function () {
    'use strict';

    app.service('Rqgt', Rqgt);

    Rqgt.$inject = ['$q', '$http', '$timeout', 'ErrorMng'];

    function Rqgt($q, $http, $timeout, ErrorMng) {
        var self = this;

        /* jshint validthis:true */
        self.getRqgtFiltered = _getRqgtFiltered;
        self.currentRqgtResults = [];
        self.loadedRqgtResults = false;

        /* callbacks to be called on documents status changes */
        self.observerCallbacks = [];
        //register an observer
        self.registerObserverCallback = function (callback) {
            /* If callback is already existent, then remove it and add the new one, 
             * otherwise add the new one */
            coGlobal.addOrReplaceFinctionInFunctionArray(self.observerCallbacks, callback);
        };
        // clean all observer callbacks
        self.cleanObserverCallback = function () {
            self.observerCallbacks = [];
        };
        //call this when you know 'foo' has been changed
        self.notifyObservers = function () {
            angular.forEach(self.observerCallbacks, function (callback) {
                callback();
            });
        };

        ////////////////

        /* Get the list of searched books */
        function _getRqgtFiltered(searchFilters) {
            var deferred = $q.defer();
            self.loadedRqgtResults = false;
            var req = {
                method: 'GET',
                url: coGlobal.getAppUrl() + 'api/ReqGoodTransfer?id=null'
            };
            return $http(req).then(function (response) {

                var respData = response.data; 
                if (respData) {
                    if (respData.operationResult === true) {
                        self.loadedRqgtResults = true;
                        self.currentRqgtResults = respData.resultData;
                        /* MOCK ONLY  - multuply results */
                        if (self.currentRqgtResults && self.currentRqgtResults.length > 0) {
                            for (var i = 0; i < 25; i++) {
                                var copiedObj = {};
                                angular.copy(self.currentRqgtResults[0], copiedObj);
                                self.currentRqgtResults.push(copiedObj);
                            }
                        };

                        /* END MOCK ONLY  - multuply results */

                        deferred.resolve(respData);
                    } else {
                        deferred.reject(respData);
                    };
                } else {
                    ErrorMng.showSystemError(respData.resultMessage);
                    deferred.reject(respData);
                };
            }, function (response) {
                ErrorMng.showSystemError();
            });

            return deferred.promise;
        };        
    }
})();
