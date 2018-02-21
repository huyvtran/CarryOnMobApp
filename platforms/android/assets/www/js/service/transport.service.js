(function () { 
    'use strict';

    app.service('Transport', Transport);

    Transport.$inject = ['$q', '$http', '$timeout', 'ErrorMng'];

    function Transport($q, $http, $timeout, ErrorMng) {
        var self = this;

        /* jshint validthis:true */
        self.getTransportFiltered = _getTransportFiltered;
        self.getOptionsList = _getOptionsList;
        self.currentTransport = {};
        self.currentTransportResults = [];
        self.loadedTransportResults = false;

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

        /* Get the list of searched transport */
        function _getTransportFiltered(searchFilters) {
            var deferred = $q.defer();
            self.loadedTransportResults = false;
            var req = {
                method: 'POST',
                url: coGlobal.getAppUrl() + 'api/TransportAv/FilteredTrAv',
                data: {
                    filterparams: {
                        rqgtFilter: undefined,
                        transpAvFilter: undefined,
                        filterParams: undefined
                    }
                }
            };
            $http(req).then(function (response) {

                var respData = response.data; 
                if (respData) {
                    if (respData.operationResult === true) {
                        self.loadedTransportResults = true;
                        self.currentTransportResults = respData.resultData;
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

        /* Get the options list */
        function _getOptionsList() {
            var deferred = $q.defer();
            self.loadedOptions = false;
            var _id = self.currentTrAvDetails.id;

            var req = {
                method: 'GET',
                url: coGlobal.getAppUrl() + 'api/ReqGoodTransfer/GetOptionsList?id=' + _id
            };
            return $http(req).then(function (response) {

                var respData = response.data;
                if (respData) {
                    if (respData.operationResult === true) {
                        self.loadedOptions = true;
                        self.currentTrAvDetails.reqGoodTransportOpt = respData.resultData;
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
