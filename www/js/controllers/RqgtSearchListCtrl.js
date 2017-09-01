(function () {

    app.controller('RqgtSearchListCtrl', RqgtSearchListCtrl);
    RqgtSearchListCtrl.$inject = ['$scope', '$stateParams', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion', '$controller', 'Books', '$state', 'ErrorMng', '$sce', '$ionicPopup', 'Events', 'ionicDatePicker', 'Rqgt', '$ionicPopup', '$interval', '$ionicActionSheet'];

    function RqgtSearchListCtrl($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $controller, Books, $state, ErrorMng, $sce, $ionicPopup, Events, ionicDatePicker, Rqgt, $ionicPopup, $interval, $ionicActionSheet) {

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

        vm.goToTransportSearchList = function (hasGood) {
            /* TO BE DEVELOPED */
            return;

            if (hasGood) {
                Rqgt.currentRqgt = {
                    from: vm.autocompleteFrom,
                    fromShown: vm.newRqgtFrom,
                    to: vm.autocompleteTo,
                    toShown: vm.newRqgtTo,
                    date: vm.newRqgtDate,
                    dateShown: vm.newRqgtDateShown
                };
                $state.go('app.rqgt-details-publish');
            };
        };

        vm.goRqgtDetailsPublish = function () {
            $state.go('app.rqgt-details-publish');
        };


        /* Init datepicker */
        vm.datepickerDate = {
            callback: function (val) {  //Mandatory
                vm.newRqgtDate = new Date(val);
                vm.newRqgtDateShown = new Date(val);
                console.log('Return value from the datepicker popup is : ' + val, new Date(val));
            },
            inputDate: new Date(),
            titleLabel: 'Seleziona la data',
            setLabel: 'Vai',
            //todayLabel: 'Today',
            showTodayButton: false,
            closeLabel: 'Prima Possibile',
            mondayFirst: false,
            weeksList: ["S", "M", "T", "W", "T", "F", "S"],
            monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
            templateType: 'popup',
            from: new Date(2012, 8, 1),
            to: new Date(2018, 8, 1),
            dateFormat: 'dd MMMM yyyy',
            closeOnSelect: true,
            disableWeekdays: []
        };

        /* Init datepicker */
        vm.openDatePicker = function () {
            ionicDatePicker.openDatePicker(vm.datepickerDate);
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

        // Set Ink
        ionicMaterialInk.displayEffect();

        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/
        /*  ------------------------------------------------------  STYLE - Animations - Headers  ------------------------------------------------------*/
        /*  --------------------------------------------------------------------------------------------------------------------------------------------*/

    };

})();