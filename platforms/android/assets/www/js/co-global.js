coGlobal = {};

/* ---- App url ---- */ 
//coGlobal.appUrl = '';
// Debug
//coGlobal.appUrl = 'http://localhost:57493/';
// IIS
coGlobal.appUrl = 'http://localhost:8083/';
// Azure
//coGlobal.appUrl = 'http://carryonwebapi.azurewebsites.net/';

coGlobal.getPaxUrl = function getAppUrl() {
    return 'http://paxwebapi.azurewebsites.net/';
};

coGlobal.getAppUrl = function getAppUrl() {
    if (coGlobal.appUrl) {
        return coGlobal.appUrl;
    } else {
        var url = location.protocol + '//' + location.host + '/';
        coGlobal.appUrl = url;
        return url;
    };
};
/* ---- App url ---- */
coGlobal.NotificationOccurred = false;
/* ---- Notifications variables ---- */

/* ---- Notifications variables ---- */

/* ENUM - CO filter status */

// app.reqGoodTransport
// app.search-transport
// app.rqgt-details-publish
// app.rqgt-search-list  -- DELETED

coGlobal.CoStatusEnum = {
    REQ_GOOD_TRANSPORT: 0,
    SEARCH_TRANSPORT: 1,
    RQGT_DETAILS_PUBLISH: 2,
    TR_AV_DETAILS: 3,
    SEARCH_RQGT: 4,
    TRANSPORT_DETAILS_PUBLISH: 5,
    RQGT_DETAILS_SHOW: 6,
    properties: {
        0: {
            translate_id: 'view.filters.REQ_GOOD_TRANSPORT', value: '', translate_main_title_id: 'menu.pageTitles.REQ_GOOD_TRANSPORT',
            sref: 'app.reqGoodTransport',
            url: '/reqGoodTransport',
            templateUrl: 'templates/start-input-data.html' 
        },
        1: {
            translate_id: 'view.filters.SEARCH_TRANSPORT', value: '', translate_main_title_id: 'menu.pageTitles.SEARCH_TRANSPORT',
            sref: 'app.search-transport',
            url: '/search-transport',
            templateUrl: 'templates/search-transport.html'
        },
        2: {
            translate_id: 'view.filters.RQGT_DETAILS_PUBLISH', value: '', translate_main_title_id: 'menu.pageTitles.RQGT_DETAILS_PUBLISH',
            sref: 'app.rqgt-details-publish',
            url: '/rqgtDetailsPublish',
            templateUrl: 'templates/rqgt-details-publish.html'
        },
        3: {
            translate_id: 'view.filters.TR_AV_DETAILS', value: '', translate_main_title_id: 'menu.pageTitles.TR_AV_DETAILS',
            sref: 'app.tr-av-details',
            url: '/trAvDetails',
            templateUrl: 'templates/tr-av-details.html'
        },
        4: {
            translate_id: 'view.filters.SEARCH_RQGT', value: '', translate_main_title_id: 'menu.pageTitles.SEARCH_RQGT',
            sref: 'app.search-rqgt',
            url: '/search-rqgt',
            templateUrl: 'templates/search-rqgt.html'
        },
        5: {
            translate_id: 'view.filters.TRANSPORT_DETAILS_PUBLISH', value: '', translate_main_title_id: 'menu.pageTitles.TRANSPORT_DETAILS_PUBLISH',
            sref: 'app.transport-details-publish',
            url: '/transportDetailsPublish',
            templateUrl: 'templates/transport-details-publish.html'
        },
        6: {
            translate_id: 'view.filters.RQGT_DETAILS_SHOW', value: '', translate_main_title_id: 'menu.pageTitles.RQGT_DETAILS_SHOW',
            sref: 'app.rqgt-details-show',
            url: '/rqgtDetailsShow',
            templateUrl: 'templates/rqgt-details-show.html'
        }
    }
};

/* ---- BookListType Enum ---- */
coGlobal.BookListTypeEnum = {
    HEART: 0,
    BEST_SELLERS: 1
};

/* Add replaceAll method */
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

/* Google maps autocomplete */
coGlobal.MapsJsApiLoaded = false;
coGlobal.LoadMapsApi = function () {
    if (coGlobal.MapsJsApiLoaded === false) {
        /* Load Google maps js API */
        $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAVMtS3LU2vAmzllAek_mI4BcJlWsp6Oqg&signed_in=true&libraries=places", function () {
            /* Address Autocomplete callback */
            vm.initAutocomplete();
            coGlobal.MapsJsApiLoaded = true;
        });
    } else {
        vm.initAutocomplete();
    };
};

coGlobal.runDigest = function refreshScope($scope) {
    if (!$scope.$$phase) {
        $scope.$digest();
    }
}