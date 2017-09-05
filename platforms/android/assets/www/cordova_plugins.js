cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/call-number/www/CallNumber.js",
        "id": "call-number.CallNumber",
        "clobbers": [
            "call"
        ]
    },
    {
        "file": "plugins/cordova-plugin-firebase/www/firebase.js",
        "id": "cordova-plugin-firebase.FirebasePlugin",
        "clobbers": [
            "FirebasePlugin"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/mobi.moica.whatsapp/www/whatsapp.js",
        "id": "mobi.moica.whatsapp.whatsapp",
        "clobbers": [
            "cordova.plugins.Whatsapp"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "call-number": "0.0.2",
    "cordova-plugin-firebase": "0.1.21",
    "cordova-plugin-splashscreen": "4.0.1",
    "cordova-plugin-statusbar": "2.2.3-dev",
    "cordova-plugin-whitelist": "1.3.1",
    "mobi.moica.whatsapp": "0.0.1"
};
// BOTTOM OF METADATA
});