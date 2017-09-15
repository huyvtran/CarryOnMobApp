(function () {
    'use strict';

    app.service("Principal", Principal);

    Principal.$inject = ['$q', '$http', '$timeout', '$state', 'ErrorMng', '$rootScope'];;

    function Principal($q, $http, $timeout, $state, ErrorMng, $rootScope) {
        var self = this;
        var _identity = undefined;
        var _authenticated = false;
        var _token = undefined;
        var _deferred_state = undefined;

        self.goStateDeferred = function (cfg) {
            if (_deferred_state != undefined) {
                $state.go(_deferred_state); 
            } else {
                // default state
                coGlobal.goToDefaultDocumentState($state);
            }
        }
        self.setStateDeferred = function (stateName) {
            _deferred_state = stateName;
        }
        /* Shared variables */
        self.coGlobal = coGlobal;
        self.userInfo = {};
        self.cb_afterLogin = coGlobal.noope;

        self.isIdentityResolved = function () {
            return angular.isDefined(_identity);
        };
        self.isAuthenticated = function () {
            return _authenticated;
        };
        self.authenticate = function (identity) {
            if ((identity != null) && (identity.data != null)) {
                _identity = identity;
                _authenticated = identity.data.token != null;
            }
            else {
                _identity = undefined;
                _authenticated = false;
            }

        };
        self.getIdentity = function () {
            return self._identity
        };
        self.identity = function (force) {
            var deferred = $q.defer();

            if (force === true) _identity = undefined;

            // check and see if we have retrieved the 
            // identity data from the server. if we have, 
            // reuse it by immediately resolving
            if (angular.isDefined(_identity)) {
                deferred.resolve(_identity);

                return deferred.promise;
            }

            // for the sake of the demo, fake the lookup
            // by using a timeout to create a valid
            // fake identity. in reality,  you'll want 
            // something more like the $http request
            // commented out above. in this example, we fake 
            // looking up to find the user is
            // not logged in
            var self_in = this;
            $timeout(function () {
                self_in.authenticate(null);
                deferred.resolve(_identity);
            }, 1000);

            return deferred.promise;
        }

        /* Login */
        self.login = function (account, callbackGoState) {

            /* save account data into */ 
            coGlobal.setAccountData(account);
            self.loading = true;
            var req = {
                method: 'POST',
                url: coGlobal.getAppUrl() + 'api/Account/Login',
                data: {
                    Username: account.email,
                    Password: account.password,
                    Token: account.token
                }
            };
            return $http(req).then(function (response) {
                if (response.data.operationResult != null) {
                    self.authenticate(response.data);
                    /* Fill local storage data */
                    //localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });
                    coGlobal.setUserData(response.data.resultData, $state, true, window.localStorage);
                    if (callbackGoState) {
                        callbackGoState = self.goStateDeferred;
                    } else {
                        self.cb_afterLogin();
                    };
                }
                else {
                    _authenticated = false;
                }
            }, function (response) {
                _authenticated = false;
            });
        };

        /* Logout */
        self.logout = function (avoidRedirect) {
            var req = {
                method: 'POST',
                url: coGlobal.getAppUrl() + 'api/Account/Logout',
                data: {
                }
            };
            return $http(req).then(function (response) {
                self.identity(false);
                _authenticated = false;
                //if (avoidRedirect !== true) {
                //    $state.go('user.login');
                //};
                coGlobal.setUserData(undefined, undefined, false, window.localStorage);
            }, function (response) {
                _authenticated = false;
                /* clean user information */
                coGlobal.setUserData(undefined, undefined, false, window.localStorage);
                //if (avoidRedirect !== true) {
                //    $state.go('user.login');
                //};
            });

            //
        };
        self.recover = function (account, passwordRecoverSuccessCB, passwordRecoverFailureCB) {
            var basicUrl = coGlobal.getAppUrl() + '/#/user/recover-pswd';
            var req = {
                method: 'POST',
                url: coGlobal.getAppUrl() + 'api/Account/ForgotPassword',
                data: {
                    model: {
                        'Email': account.email
                    },
                    recoverBasicUrl: basicUrl
                }
            };
            return $http(req).then(passwordRecoverSuccessCB, passwordRecoverFailureCB);
        };
        /* Change password from the current one */
        self.changePassword = function (oldPassword, newPassword) {
            var deferredLoadItems = $q.defer();
            var req = {
                method: 'POST',
                url: coGlobal.getAppUrl() + 'api/Account/ChangePassword',
                data: {
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }
            };
            return $http(req).then(function (response) {
                // promise is fulfilled
                deferredLoadItems.resolve(response.data);
                // promise is returned
                return deferredLoadItems.promise;
            }, function (response) {
                deferredLoadItems.reject(response.data);
                // promise is returned
                return deferredLoadItems.promise;
            });
        };

        /* Register mail for a user that does not have it */
        self.registerEmail = function (userName, email) {
            var deferredLoadItems = $q.defer();
            var req = {
                method: 'POST',
                url: coGlobal.getAppUrl() + 'api/Account/RegisterEmail',
                data: {
                    userName: userName,
                    email: email
                }
            };
            return $http(req).then(function (response) {
                // promise is fulfilled
                deferredLoadItems.resolve(response.data);
                // promise is returned
                return deferredLoadItems.promise;
            }, function (response) {
                deferredLoadItems.reject(response.data);
                // promise is returned
                return deferredLoadItems.promise;
            });
        };

        /* Reset Password */
        self.resetPassword = function (resetPswdUserName, resetPswdToken, resetPswd) {
            var deferredLoadItems = $q.defer();
            var req = {
                method: 'POST',
                url: coGlobal.getAppUrl() + 'api/Account/ResetPassword',
                data: {
                    resetPswdUserName: resetPswdUserName,
                    resetPswdToken: resetPswdToken,
                    resetPswd: resetPswd
                }
            };
            return $http(req).then(function (response) {
                // promise is fulfilled
                deferredLoadItems.resolve(response.data);
                // promise is returned
                return deferredLoadItems.promise;
            }, function (response) {
                deferredLoadItems.reject(response.data);
                // promise is returned
                return deferredLoadItems.promise;
            });
        };

        /* Logout and login */
        self.logoutAndLogin = function (state) {
            return self.logout(true).then(function (response) {
                self.identity(false);
                var account = coGlobal.getAccountData();
                /* Login now */
                return self.login({
                    username: account.username,
                    password: account.password
                }, function () {
                    var user = coGlobal.getUserData();
                    coGlobal.setUserData(user, state, true, window.localStorage);
                    coGlobal.goToDefaultDocumentState(state);
                    state.reload();
                });
            }, function (response) {
                _authenticated = false;
                ErrorMng.showSystemError();
            });
        };

        self.getToken = function () {
            return _identity.token;
        };

        self.userHasAction = function (a) {
            var userCompany = coGlobal.user.getCurrentCompany();
            if (userCompany) {
                return userCompany.actions.some(function (action) {
                    return action === a;
                });
            }
        };
    };
})();
