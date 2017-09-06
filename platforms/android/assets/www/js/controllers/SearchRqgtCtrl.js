(function () {

    app.controller('SearchRqgtCtrl', SearchRqgtCtrl);
    SearchRqgtCtrl.$inject = ['$scope', '$stateParams', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion', '$controller', 'Books', '$state', 'ErrorMng', '$sce', '$ionicPopup', 'Events', 'ionicDatePicker', 'Rqgt', '$ionicPopup', '$interval', '$ionicActionSheet'];

    function SearchRqgtCtrl($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $controller, Books, $state, ErrorMng, $sce, $ionicPopup, Events, ionicDatePicker, Rqgt, $ionicPopup, $interval, $ionicActionSheet) {

        var vm = this;

        /* Link to pax global object to allow binding to the view */
        vm.coGlobal = coGlobal;
        vm.rqgtServ = Rqgt;

        vm.booksLoaded = false;
        vm.bestSellersBooksLoaded = false;
        vm.booksDetailsLoaded = false;
        /* all document table data */
        vm.heartBooks = [];
        vm.bestSellersBooks = [];
        vm.pocheDuMois = {};

        vm.setMotion = function () {

            $timeout(function () {
                ionicMaterialMotion.blinds({
                    startVelocity: 3000
                });
            }, 100);
        };

        vm.initLoadRqgtResults = function initLoadRqgtResults() {
            /* If data has not been loaded yet, then load it */
            if (Rqgt.loadedRqgtResults == false) {
                Rqgt.getRqgtFiltered().then(
                function (result) {
                    /* Refresh variables scope */
                    coGlobal.runDigest($scope);
                },
                function (error) {
                    // handle error here
                    coGlobal.runDigest($scope);
                });
            };
        };

        vm.goToRqgtDetails = function (rqgt) {
            /* Set current transport */
            Rqgt.currentRqgtDetails = rqgt;

            /* go to transport details page */
            $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.RQGT_DETAILS_SHOW].sref);
        };

        $("#btn-publish-transport-av").on("click", function () {
            $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.TRANSPORT_DETAILS_PUBLISH].sref);
        });

        /* Go to publish rqgt page */
        vm.goRqgtDetailsPublish = function () {
            $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.RQGT_DETAILS_SHOW].sref);
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
            vm.initLoadRqgtResults();
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

        // Set Ink
        ionicMaterialInk.displayEffect();

        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/
        /*  ------------------------------------------------------  STYLE - Animations - Headers  ------------------------------------------------------*/
        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/

    };

})();