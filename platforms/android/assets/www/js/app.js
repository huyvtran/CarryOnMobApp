// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'ionic-material', 'ionMdInput', 'ion-floating-menu', 'ionic-datepicker', 'ion-google-autocomplete']);

app.run(function ($ionicPlatform, $state, $ionicPopup, ionicMaterialInk, $timeout, Principal) {

    /* When platform is ready, then add notification plug in registration */
    window.ionic.Platform.ready(function () {

        /* Hide splash screen */
        if (navigator && navigator.splashscreen) {
            navigator.splashscreen.hide();
        };
         
        /* Load credential data from session, if present */
        var coToken = window.localStorage.getItem("coToken");
        var coNome = window.localStorage.getItem("coNome");
        if (coToken && coToken) {
            Principal.login({ username: undefined, password: undefined, token: coToken }).then(function () {
                coGlobal.isUserLogged = true;
            }, function () {
                //alert('log in failed');
            });
        };

        /* Load google maps for autocomplete */
        //coGlobal.LoadMapsApi();

        /*  --------------------- PUSH NOTIFICATION --------------------- */

        //  //FCMPlugin.onTokenRefresh( onTokenRefreshCallback(token) );
        //  //Note that this callback will be fired everytime a new token is generated, including the first time.
        //  FCMPlugin.onTokenRefresh(function (token) {
        //      //console.log('onTokenRefresh:');
        //      //console.log(token);
        //      //alert(token);
        //  });
        //
        //  //FCMPlugin.getToken( successCallback(token), errorCallback(err) );
        //  //Keep in mind the function will return null if the token has not been established yet.
        //  FCMPlugin.getToken(function (token) {
        //      //console.log('getToken:');
        //      //console.log(token);
        //      //alert(token);
        //  });

        //FCMPlugin.subscribeToTopic( topic, successCallback(msg), errorCallback(err) );
        //All devices are subscribed automatically to 'all' and 'ios' or 'android' topic respectively.
        //Must match the following regular expression: "[a-zA-Z0-9-_.~%]{1,900}".
        //FCMPlugin.subscribeToTopic('paxNewHeratBooks');
        //FCMPlugin.subscribeToTopic('testPaxNewHeratBooks');
        window.FirebasePlugin.subscribe("paxNewHeratBooks");
        window.FirebasePlugin.subscribe("testPaxNewHeratBooks");
        window.FirebasePlugin.subscribe("testPaxNewHeratBooks2");

        /* Notification popup */
        var showNotificationPopup = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Nouveaux livres apparu'
            });

            $timeout(function () {
                ionicMaterialInk.displayEffect();
            }, 0);
        };

        /* Then redirect the app to Main page */
        var refreshPaxProfile = function refreshPaxProfile(forceGoToProfile) {
            if ($state.current.name == 'app.profile') {
                $state.reload();
            } else if (forceGoToProfile === true) {
                $state.go('app.profile');
            };
        }

        //   //FCMPlugin.onNotification( onNotificationCallback(data), successCallback(msg), errorCallback(err) )
        //   //Here you define your application behaviour based on the notification data.
        //   FCMPlugin.onNotification(function (data) {
        //       var forceGoToProfile = false;
        //       if (data.tap) {
        //           //Notification was received on device tray and tapped by the user.
        //           forceGoToProfile = true;
        //           //console.log("Was tapped:");
        //           //console.log(JSON.stringify(data));
        //       } else {
        //           //Notification was received in foreground. Maybe the user needs to be notified.
        //           showNotificationPopup();
        //           ///* A notification occurred, thus force the app to reload all it's data */
        //           //coGlobal.NotificationOccurred = true;
        //           ///* Then redirect the app to Main page */
        //           //$state.go('app.profile', {}, { reload: true });
        //       };
        //       /* A notification occurred, thus force the app to reload all it's data */
        //       coGlobal.NotificationOccurred = true;
        //       /* Then redirect the app to Main page */
        //       refreshPaxProfile(forceGoToProfile);
        //
        //   }, function (data) {
        //       if (data.tap) {
        //           //Notification was received on device tray and tapped by the user.
        //           //console.log("Was tapped:");
        //           //console.log(JSON.stringify(data));
        //       } else {
        //           //Notification was received in foreground. Maybe the user needs to be notified.
        //           //console.log("Wasn't tapped:");
        //           //console.log(JSON.stringify(data));
        //       }
        //   });


        window.FirebasePlugin.onNotificationOpen(function (notification) {
            var forceGoToProfile = false;
            //if (notification.numberNewBooks) {
            //    window.FirebasePlugin.setBadgeNumber(notification.numberNewBooks);
            //}
            if (notification.tap) {
                //Notification was received on device tray and tapped by the user.
                forceGoToProfile = true;
                //console.log("Was tapped:");
                //console.log(JSON.stringify(data));
            } else {
                //Notification was received in foreground. Maybe the user needs to be notified.
                showNotificationPopup();
                ///* A notification occurred, thus force the app to reload all it's data */
                //coGlobal.NotificationOccurred = true;
                ///* Then redirect the app to Main page */
                //$state.go('app.profile', {}, { reload: true });
            };
            /* A notification occurred, thus force the app to reload all it's data */
            coGlobal.NotificationOccurred = true;
            /* Then redirect the app to Main page */
            refreshPaxProfile(forceGoToProfile);
        }, function (error) {
            console.error(error);
        });


    });

    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        };
    });
})

app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, ionicDatePickerProvider, $httpProvider) {

    /* Configure date picker */
    var datePickerObj = {
        inputDate: new Date(),
        titleLabel: 'Seleziona la data',
        setLabel: 'Set',
        todayLabel: 'Today',
        closeLabel: 'Close',
        mondayFirst: false,
        weeksList: ["S", "M", "T", "W", "T", "F", "S"],
        monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
        templateType: 'popup',
        from: new Date(2016, 8, 1),
        to: new Date(2024, 8, 1),
        showTodayButton: true,
        dateFormat: 'dd MMMM yyyy',
        closeOnSelect: false,
        disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /* Add interceptor */
    $httpProvider.interceptors.push(httpInterceptor);
    function httpInterceptor($q, $injector) {
        var _request = function (config) {
            var userData = coGlobal.getUserData();
            //var userCompany = coGlobal.user.getCurrentCompany();
            if (userData) {
                config.headers = config.headers || {}; 
                /* Fill authorization data */
                config.headers['Content-Type'] = 'application/json';
                config.headers['auth-scheme'] = 'token';
                // token here
                config.headers['token'] = userData.token; 
            };

            return config;
        };
        
        // response method
        var _response = function (response) {            
            return response;
        };

        var _responseError = function (rejection) {            
            return rejection;
        };

        return {
            request: _request,
            response: _response,
            responseError: _responseError,
        };
    };
    
    /* Interceptor to fill authentication data on each http send 
    call and to check if response error is 401 (UNAUTHORIZED) */
    httpInterceptor.$inject = ['$q', '$injector'];

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    /* REQ_GOOD_TRANSPORT */
    var REQ_GOOD_TRANSPORT_sref = coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.REQ_GOOD_TRANSPORT].sref;
    var REQ_GOOD_TRANSPORT_url = coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.REQ_GOOD_TRANSPORT].url;
    var REQ_GOOD_TRANSPORT_templateUrl = coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.REQ_GOOD_TRANSPORT].templateUrl;
    /* SEARCH_TRANSPORT */
    var SEARCH_TRANSPORT_sref = coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.SEARCH_TRANSPORT].sref;
    var SEARCH_TRANSPORT_url = coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.SEARCH_TRANSPORT].url;
    var SEARCH_TRANSPORT_templateUrl = coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.SEARCH_TRANSPORT].templateUrl;
    /* RQGT_DETAILS_PUBLISH */
    var RQGT_DETAILS_PUBLISH_sref = coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.RQGT_DETAILS_PUBLISH].sref;
    var RQGT_DETAILS_PUBLISH_url = coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.RQGT_DETAILS_PUBLISH].url;
    var RQGT_DETAILS_PUBLISH_templateUrl = coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.RQGT_DETAILS_PUBLISH].templateUrl;
    /* TRANSPORTAV_DETAILS_SHOW */
    var TRANSPORTAV_DETAILS_SHOW_sref = coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.TRANSPORTAV_DETAILS_SHOW].sref;
    var TRANSPORTAV_DETAILS_SHOW_url = coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.TRANSPORTAV_DETAILS_SHOW].url;
    var TRANSPORTAV_DETAILS_SHOW_templateUrl = coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.TRANSPORTAV_DETAILS_SHOW].templateUrl;
    /* SEARCH_RQGT */
    var SEARCH_RQGT_sref = coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.SEARCH_RQGT].sref;
    var SEARCH_RQGT_url = coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.SEARCH_RQGT].url;
    var SEARCH_RQGT_templateUrl = coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.SEARCH_RQGT].templateUrl;
    /* TRANSPORT_DETAILS_PUBLISH */
    var TRANSPORT_DETAILS_PUBLISH_sref = coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.TRANSPORT_DETAILS_PUBLISH].sref;
    var TRANSPORT_DETAILS_PUBLISH_url = coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.TRANSPORT_DETAILS_PUBLISH].url;
    var TRANSPORT_DETAILS_PUBLISH_templateUrl = coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.TRANSPORT_DETAILS_PUBLISH].templateUrl;
    /* RQGT_DETAILS_SHOW */
    var RQGT_DETAILS_SHOW_sref = coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.RQGT_DETAILS_SHOW].sref;
    var RQGT_DETAILS_SHOW_url = coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.RQGT_DETAILS_SHOW].url;
    var RQGT_DETAILS_SHOW_templateUrl = coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.RQGT_DETAILS_SHOW].templateUrl;

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

        .state('app.events', {
            url: '/events',
            views: {
                'menuContent': {
                    templateUrl: 'templates/events.html'
                }
            }
        })

        .state('app.event-details', {
            url: '/event-details',
            views: {
                'menuContent': {
                    templateUrl: 'templates/event-Details.html'
                }
            }
        })

    .state(SEARCH_TRANSPORT_sref, {
        url: SEARCH_TRANSPORT_url,
        views: {
            'menuContent': {
                templateUrl: SEARCH_TRANSPORT_templateUrl
            }
        }
    })

    .state('app.books', {
        url: '/books',
        views: {
            'menuContent': {
                templateUrl: 'templates/books.html'
            }
        }
    })

        .state('app.search-book-results', {
            url: '/search-book-results',
            views: {
                'menuContent': {
                    templateUrl: 'templates/search-book-results.html'
                }
            }
        })

        .state('app.book-details', {
            url: '/book-details',
            views: {
                'menuContent': {
                    templateUrl: 'templates/book-details.html',
                }
            }
        })

    .state('app.gallery', {
        url: '/gallery',
        views: {
            'menuContent': {
                templateUrl: 'templates/gallery.html',
                controller: 'GalleryCtrl'
            },
            'fabContent': {
                template: '<button id="fab-gallery" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-gallery').classList.toggle('on');
                    }, 600);
                }
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

        .state('externalGoTwitter', {
            url: 'https://twitter.com/librairiepax',
            external: true
        })

    .state(REQ_GOOD_TRANSPORT_sref, {
        url: REQ_GOOD_TRANSPORT_url,
        views: {
            'menuContent': {
                templateUrl: REQ_GOOD_TRANSPORT_templateUrl
            },
            'fabContent': {
                template: ''
            }
        }
    })

.state(RQGT_DETAILS_PUBLISH_sref, {
    url: RQGT_DETAILS_PUBLISH_url,
    views: {
        'menuContent': {
            templateUrl: RQGT_DETAILS_PUBLISH_templateUrl
        },
        'fabContent': {
            template: ''
        }
    }
})
.state(TRANSPORTAV_DETAILS_SHOW_sref, {
    url: TRANSPORTAV_DETAILS_SHOW_url,
    views: {
        'menuContent': {
            templateUrl: TRANSPORTAV_DETAILS_SHOW_templateUrl
        },
        'fabContent': {
            template: ''
        }
    }
})
.state(SEARCH_RQGT_sref, {
    url: SEARCH_RQGT_url,
    views: {
        'menuContent': {
            templateUrl: SEARCH_RQGT_templateUrl
        },
        'fabContent': {
            template: ''
        }
    }
})
.state(TRANSPORT_DETAILS_PUBLISH_sref, {
    url: TRANSPORT_DETAILS_PUBLISH_url,
    views: {
        'menuContent': {
            templateUrl: TRANSPORT_DETAILS_PUBLISH_templateUrl
        },
        'fabContent': {
            template: ''
        }
    }
})
        .state(RQGT_DETAILS_SHOW_sref, {
            url: RQGT_DETAILS_SHOW_url,
            views: {
                'menuContent': {
                    templateUrl: RQGT_DETAILS_SHOW_templateUrl
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.rqgt-search-list', {
            url: '/SearchTransportCtrl',
            views: {
                'menuContent': {
                    templateUrl: 'templates/req-good-search-list.html'
                },
                'fabContent': {
                    template: ''
                }
            }
        })

        //.state('app.search-transport', {
        //    url: '/search-transport',
        //    views: {
        //        'menuContent': {
        //            templateUrl: 'templates/search-transport.html'
        //            //,controller: 'ReqGoodTransportCtrl'
        //        }
        //    }
        //})

    .state('app.about-pax', {
        url: '/about-pax',
        views: {
            'menuContent': {
                templateUrl: 'templates/about-pax.html'
                //,controller: 'ReqGoodTransportCtrl'
            }
        }
    })

    .state('app.first-choice', {
        url: '/first-choice',
        views: {
            'menuContent': {
                templateUrl: 'templates/first-choice.html'
                //,controller: 'ReqGoodTransportCtrl'
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    //$urlRouterProvider.otherwise('/app/login');
    //$urlRouterProvider.otherwise('/app/first-choice'); 
    $urlRouterProvider.otherwise('/app/reqGoodTransport');
});
