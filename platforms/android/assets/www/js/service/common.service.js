(function () {
    'use strict';

    app.service('CommonService', CommonService);

    CommonService.$inject = ['$q', '$http', '$timeout', 'ErrorMng'];

    function CommonService($q, $http, $timeout, ErrorMng) {
        var self = this;

        /* jshint validthis:true */
        self.getOptionsList = _getOptionsList;
        self.publishItem = _publishItem;
        self.currentId = undefined;
        self.loadedOptions = false;

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
        
        /* Get the options list */
        function _getOptionsList() {
            var deferred = $q.defer();
            self.loadedOptions = false;
            var _id = self.currentId; 

            var req = {
                method: 'GET',
                url: coGlobal.getAppUrl() + 'api/ReqGoodTransfer/GetOptionsList?id=' + _id
            };
            $http(req).then(function (response) {

                var respData = response.data;
                if (respData) {
                    if (respData.operationResult === true) {
                        self.loadedOptions = true;
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

        /* Publish Rqgt or transport Item */
        function _publishItem(itemToPublish) {
            var deferred = $q.defer();
            self.publishingItem = true;
            
            var req = {
                method: 'POST',
                url: coGlobal.getAppUrl() + 'api/TransportAv/PublishItem',
                data: itemToPublish
            };
            $http(req).then(function (response) {

                var respData = response.data;
                self.publishingItem = false;
                if (respData) {
                    if (respData.operationResult === true) {
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
