(function () {

    app.controller('ReqGoodTransportCtrl', ReqGoodTransportCtrl);
    ReqGoodTransportCtrl.$inject = ['$scope', '$stateParams', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion', '$controller', 'Books', '$state', 'ErrorMng', '$sce', 'Events', 'ionicDatePicker', 'Rqgt', '$ionicPopup', '$interval', '$ionicActionSheet', 'Transport'];

    function ReqGoodTransportCtrl($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $controller, Books, $state, ErrorMng, $sce, Events, ionicDatePicker, Rqgt, $ionicPopup, $interval, $ionicActionSheet, Transport) {

        var vm = this;

        vm.booksLoaded = false;
        vm.bestSellersBooksLoaded = false;
        vm.booksDetailsLoaded = false;

        /* all document table data */
        vm.heartBooks = [];
        vm.bestSellersBooks = [];
        vm.pocheDuMois = {};

        /* Link to pax global object to allow binding to the view */
        vm.coGlobal = coGlobal;

        vm.setMotion = function () {
            $timeout(function () {
                ionicMaterialMotion.blinds({
                    startVelocity: 3000
                });
            }, 100);
        };        

        /* ATTENZIONE ALLE PERFORMANCES qui !! */
        $("body").on("click", ".ionic_datepicker_popup .popup-buttons button", function () {
            /* Date 'prima possibile' clicked, then set model value */
            vm.date = undefined;
            vm.dateShown = 'Prima Possibile';
        });

        /* From Address */
        vm.onFromAddressSelection = function (location) {
            vm.fromAddress = location;
        };

        /* Destination Address */
        vm.onDestAddressSelection = function (location) {
            vm.destAddress = location;
        };
        
        /* go to next page where rqgt details are inserted */
        vm.selectHasCamionOrHasGood = function () {
            /* Check if all fields have been correctly filled */
            /* TO BE TOGGLED */
            if (!true) {
            //if (!vm.autocompleteFrom && !vm.autocompleteTo) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Dati non completi',
                    template: 'Inserisci una localita\' di partenza o di destinazione'
                });
                return;
            }

            /* Select camion or Good */
            vm.showActionSheet_CG();
        }

        vm.testGoLogin = function () {
            $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.LOGIN_SIGNIN].sref);
        };

        vm.testGoLogout = function () {
            $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.PERSONAL_DATA].sref);
        };

        /* Show Action sheet for camion or good selection */
        vm.showActionSheet_CG = function () {
            vm.hideSheet = $ionicActionSheet.show({
                buttons: [{
                    text: 'Ho un camion'
                }, {
                    text: 'Ho della merce'
                }],
                //destructiveText: 'Delete',
                //titleText: 'Seleziona la tua necessita\'',
                cancelText: 'Cancel',
                cancel: function () {
                    // add cancel code..
                },
                buttonClicked: function (index) {
                    vm.hideSheet();
                    if (index == 0) {
                        /* User has a camion */
                        vm.goToRqgtSearchList();
                    } else if (index == 1) {
                        /* User has good to transport */
                        vm.goToTransportSearchList();
                    };
                }
            });
        };

        /* Go to transport search good view or publish availability*/
        vm.goToTransportSearchList = function () {
            Rqgt.currentRqgt = {
                fromAddress: vm.fromAddress,
                destAddress: vm.destAddress,
                date: vm.date,
                dateShown: vm.dateShown
            };
            /* First set service loaded results to false, in order to load new results */
            $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.SEARCH_TRANSPORT].sref);
        };

        /* Go to rqgt search camion view or publish request */
        vm.goToRqgtSearchList = function () {
            Transport.currentTransport = {
                fromAddress: vm.fromAddress,
                destAddress: vm.destAddress,
                date: vm.date,
                dateShown: vm.dateShown
            };
            /* First set service loaded results to false, in order to load new results */
            Rqgt.loadedRqgtResults = false;
            /* Go to SEARCH_RQGT view */
            $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.SEARCH_RQGT].sref);
        };
        
        /* Add callback to datepicker */
        vm.datepickerDate = coGlobal.datepickerDate;
        vm.datepickerDate.callback = function (val) {  //Mandatory
            vm.date = new Date(val);
            vm.dateShown = vm.date.toLocaleDateString('it-IT');
        };

        /* Init datepicker */
        vm.openDatePicker = function () {
            ionicDatePicker.openDatePicker(vm.datepickerDate);
        };

        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/
        /*  ------------------------------------------------------  END CARRY ON METHOD  ------------------------------------------------------*/
        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/



        /* Load all heart books */
        vm.loadHeartBooks = function () {
            // If data has not been loaded yet, then load it from server
            if (Books.booksLoaded === false) {
                vm.loadBooks();
            } else {
                vm.heartBooks = Books.heartBooks;
                vm.pocheDuMois = Books.pocheDuMois;
                vm.setMotion();

            };
        };

        /* Load all books data from server */
        vm.loadBooks = function () {
            Books.GetBooks(coGlobal.BookListTypeEnum.HEART).then(
                function (result) {
                    if (result.operationResult === true) {
                        /* service state */
                        Books.heartBooks = result.resultData.booksList;
                        Books.pocheDuMois = result.resultData.monthBook;
                        Books.booksLoaded = true;
                        /* vm state */
                        vm.booksLoaded = Books.booksLoaded;
                        vm.heartBooks = Books.heartBooks;
                        vm.pocheDuMois = Books.pocheDuMois;
                        vm.setMotion();

                    } else {
                        // handle error here
                        ErrorMng.showSystemError(result.msg);
                    };
                },
                function (error) {
                    // handle error here
                    ErrorMng.showSystemError(error.msg ? error.msg : error);
                });
        };

        /* Load all details for heart books */
        vm.loadDetailsForHeartBooks = function () {
            // If data has not been loaded yet, then load it from server
            if (Books.detailsForHeartBooksLoaded === false) {
                Books.getDetailsForHeartBooks();
            };
        };

        /* Load all best sellers books */
        vm.loadBestSellers = function () {
            // If data has not been loaded yet, then load it from server
            if (Books.bestSellersBooksLoaded === false) {
                vm.loadBestSellersBooks();
            } else {
                vm.bestSellersBooks = Books.bestSellersBooks;
                //vm.setMotion();

            };
        };

        /* Load all events data from server */
        vm.loadEventsFromServer = function () {
            Events.GetEvents().then(
                function (result) {
                    if (result.operationResult === true) {
                        Events.heartEvents = result.resultData.events;
                        Events.eventsLoaded = true;

                    } else {
                        // handle error here
                        ErrorMng.showSystemError(result.msg);
                    };
                },
                function (error) {
                    // handle error here
                    ErrorMng.showSystemError(error.msg);
                });
        };

        /* Load all events */
        vm.loadEvents = function () {
            // If data has not been loaded yet, then load it from server
            if (Events.eventsLoaded != true) {
                vm.loadEventsFromServer();
            };
        };

        /* Load all books data from server */
        vm.loadBestSellersBooks = function () {
            Books.GetBooks(coGlobal.BookListTypeEnum.BEST_SELLERS).then(
                function (result) {
                    if (result.operationResult === true) {
                        /* service state */
                        Books.bestSellersBooks = result.resultData.booksList;
                        Books.bestSellersBooksLoaded = true;
                        /* vm state */
                        vm.bestSellersBooksLoaded = Books.bestSellersBooksLoaded;
                        vm.bestSellersBooks = Books.bestSellersBooks;
                        //vm.setMotion();

                    } else {
                        // handle error here
                        ErrorMng.showSystemError(result.msg);
                    };
                },
                function (error) {
                    // handle error here
                    ErrorMng.showSystemError(error.msg);
                });
        };

        /* Go to details book */
        vm.goToBookDetails = function (book) {
            /* First set current book */
            Books.currentBook = book;
            $state.go('app.book-details');
        };

        /* Execute search books and go to results list */
        vm.goToSearchBookResults = function () {
            /* First set service searchBook key */
            Books.searchBookKey = vm.searchBookKey;
            $state.go('app.search-book-results');
        };

        /* Go to 'Poche du mois' page */
        vm.goToPocheDuMois = function () {
            /* First set current book */
            Books.currentBook = vm.pocheDuMois;
            Books.currentBook.isPocheDuMois = true;
            $state.go('app.book-details');
        };

        /* Load all heart books */
        vm.loadDetailsOfHeartBooks = function () {
            // If data has not been loaded yet, then load it from server
            if (Books.booksLoaded === false) {
                vm.loadBooks();
            } else {
                vm.heartBooks = Books.heartBooks;
            };
        };

        vm.initAllIsLoadedFlags = function () {
            Books.booksLoaded = false;
            Books.detailsForHeartBooksLoaded = false;
            Books.bestSellersBooksLoaded = false;
            Events.eventsLoaded = false;
        };

        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/
        /*  ------------------------------------------------------     INIT FUNCTIONS     ------------------------------------------------------*/
        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/


        /* Init controller function */
        vm.initController = function () {
            /* If a notification comes occurred, then reset all 'isLoaded' flags 
             * in order to force the app to reload data from the server */
            if (coGlobal.NotificationOccurred === true) {
                vm.initAllIsLoadedFlags();
                coGlobal.NotificationOccurred = false;
            };
            
            vm.loadHeartBooks();
            vm.loadDetailsForHeartBooks();
            vm.loadBestSellers();
            vm.loadEvents();
        };

        /* Call init controller */
        vm.initController();

        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/
        /*  ------------------------------------------------------  STYLE - Animations - Headers  ------------------------------------------------------*/
        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/

        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        //        // Set Motion
        //        $timeout(function () {
        //            ionicMaterialMotion.slideUp({
        //                selector: '.slide-up'
        //            });
        //        }, 10000);
        //
        //        $timeout(function () {
        //            ionicMaterialMotion.fadeSlideInRight({
        //                startVelocity: 3000
        //            });
        //        }, 10000);

        // Set Ink
        ionicMaterialInk.displayEffect();

        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/
        /*  ------------------------------------------------------  STYLE - Animations - Headers  ------------------------------------------------------*/
        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/

    };

})();