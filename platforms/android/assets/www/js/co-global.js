coGlobal = {};

/* ---- App url ---- */ 
//coGlobal.appUrl = '';
// Debug
//coGlobal.appUrl = 'http://localhost:51267/';
// IIS
//coGlobal.appUrl = 'http://localhost:8091/';
// Azure
coGlobal.appUrl = 'http://paxwebapi.azurewebsites.net/';

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