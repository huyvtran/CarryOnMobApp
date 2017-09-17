coGlobal = {};

/* ---- App url ---- */
//coGlobal.appUrl = '';
// Debug
//coGlobal.appUrl = 'http://localhost:57493/';
// IIS
//coGlobal.appUrl = 'http://localhost:8083/';
// Azure
coGlobal.appUrl = 'http://carryonwebapi.azurewebsites.net/';

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
    TRANSPORTAV_DETAILS_SHOW: 3,
    SEARCH_RQGT: 4,
    TRANSPORT_DETAILS_PUBLISH: 5,
    RQGT_DETAILS_SHOW: 6,
    LOGIN_SIGNIN: 7,
    REGISTER_USER: 8,
    RESET_PSWD: 9,
    PERSONAL_DATA: 10,
    MY_RQGT_PUBLISHED: 11,
    MY_TRANSP_AV_PUBLISHED: 12,
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
            translate_id: 'view.filters.TRANSPORTAV_DETAILS_SHOW', value: '', translate_main_title_id: 'menu.pageTitles.TRANSPORTAV_DETAILS_SHOW',
            sref: 'app.tr-av-details',
            url: '/trAvDetails',
            templateUrl: 'templates/transportav-details-show.html'
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
        },
        7: {
            translate_id: 'view.filters.LOGIN_SIGNIN', value: '', translate_main_title_id: 'menu.pageTitles.LOGIN_SIGNIN',
            sref: 'app.login-signin',
            url: '/loginSignin',
            templateUrl: 'templates/login-signin.html'
        },
        8: {
            translate_id: 'view.filters.REGISTER_USER', value: '', translate_main_title_id: 'menu.pageTitles.REGISTER_USER',
            sref: 'app.register-user',
            url: '/registerUser',
            templateUrl: 'templates/register-user.html'
        },
        9: {
            translate_id: 'view.filters.RESET_PSWD', value: '', translate_main_title_id: 'menu.pageTitles.RESET_PSWD',
            sref: 'app.reset-pswd',
            url: '/resetPswd',
            templateUrl: 'templates/reset-pswd.html'
        },
        10: {
            translate_id: 'view.filters.PERSONAL_DATA', value: '', translate_main_title_id: 'menu.pageTitles.PERSONAL_DATA',
            sref: 'app.personal-data',
            url: '/personalData',
            templateUrl: 'templates/personal-data.html'
        },
        11: {
            translate_id: 'view.filters.MY_RQGT_PUBLISHED', value: '', translate_main_title_id: 'menu.pageTitles.MY_RQGT_PUBLISHED',
            sref: 'app.my-rqgt-published',
            url: '/myRqgtPublished',
            templateUrl: 'templates/my-rqgt-published.html'
        },
        12: {
            translate_id: 'view.filters.MY_TRANSP_AV_PUBLISHED', value: '', translate_main_title_id: 'menu.pageTitles.MY_TRANSP_AV_PUBLISHED',
            sref: 'app.my-transp-av-published',
            url: '/myTranspAvPublished',
            templateUrl: 'templates/my-transp-av-published.html'
        }
    }
};

/* ---- BookListType Enum ---- */
coGlobal.BookListTypeEnum = {
    HEART: 0,
    BEST_SELLERS: 1
};

/* Go to default state */
coGlobal.goToDefaultDocumentState = function ($state) {
    $state.go(coGlobal.CoStatusEnum.properties[coGlobal.CoStatusEnum.REQ_GOOD_TRANSPORT].sref);
};

/* ---- APP CURRENT USER ---- */
coGlobal.user = {};
coGlobal.isUserLogged = false;

/* getter */
coGlobal.getUserData = function getUserData() {
    if (coGlobal.user.data) {
        /* Take data from local session */
        return coGlobal.user.data;
    } else {
        /* act consequently, for the moment return undefined */
        return undefined;
    };
};

coGlobal.setLocalStorageUserInfo = function setLocalStorageUserInfo(userData, localStorage) {
    if (userData) {
        localStorage.setItem("coUserName", userData.uten);
        localStorage.setItem("coPass", userData.pass);
        localStorage.setItem("coToken", userData.token);
        localStorage.setItem("coNome", userData.nome);
    };
};

coGlobal.cleanLocalStorageUserInfo = function cleanLocalStorageUserInfo(localStorage) {
    localStorage.removeItem("coUserName");
    localStorage.removeItem("coPass");
    localStorage.removeItem("coToken");
    localStorage.removeItem("coNome");
}; 

/* setter */
coGlobal.setUserData = function setUserData(userData, $state, isUserLoggedIn, localStorage) {
    coGlobal.setLocalStorageUserInfo(userData, localStorage);
    coGlobal.user.data = userData;

    if (isUserLoggedIn === true) {
        coGlobal.isUserLogged = true;
    } else if (isUserLoggedIn === false) {
        coGlobal.cleanLocalStorageUserInfo(localStorage);
        coGlobal.isUserLogged = false;
    };
};

/* USER NAME - Get user name */
coGlobal.getAppUserName = function getAppUserName() {
    var userData = coGlobal.getUserData();
    if (userData) {
        return userData.nome;
    } else {
        return '';
    };
};

/* Set Account Data */
coGlobal.setAccountData = function setAccountData(account) {
    if (coGlobal.user) {
        coGlobal.user.account = account;
    };
};

/* ---- END - APP CURRENT USER ---- */


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
};

coGlobal.noope = function noope() { };