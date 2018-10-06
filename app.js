//
//
//
var app = {
    version : '1.0.0',
}
//
//
//
function onDOMContentLoaded() {
    document.getElementById('navCodeName').innerHTML = navigator.appCodeName;
    document.getElementById('navName').innerHTML     = navigator.appName;
    document.getElementById('navVersion').innerHTML  = navigator.appVersion;
    document.getElementById('navPlatform').innerHTML = navigator.platform;
}
//
// - https://videlais.com/2014/08/21/lessons-learned-from-detecting-apache-cordova/
//
function isCordovaApp() {
    return (typeof window.cordova !== "undefined");
}
//
//
//
function isKnownDevice(obj) {
    var validPGDevices = [
          'armv7',
          'iPad',
          'iPhone',
          'iPod'
    ];
    //
    var i = 0, result = -1, answer = false;
    for (i = 0; i < validPGDevices.length; i++){
        // https://www.w3schools.com/jsref/jsref_search.asp
        result = obj.search(validPGDevices[i]);
        if (result != -1) {
            answer = validPGDevices[i]; break;
        }
    }

    return answer;
}
//
//
//
function deviceStuff() {
    var deviceStuff = "" +
        "<p class=r /><b>device.cordova:</b> "       + device.cordova +
        "<p class=g /><b>device.model:</b> "         + device.model +
        "<p class=b /><b>device.platform:</b> "      + device.platform +
        "<p class=a id=uuid /><b>device.uuid:</b> "  + device.uuid +
        "<p class=p /><b>device.version:</b> "       + device.version +
        "<p class=r /><b>device.manufacturer:</b> "  + device.manufacturer +
        "<p class=g /><b>device.isVirtual:</b> "     + device.isVirtual +
        "<p class=b /><b>device.serial:</b> "        + device.serial;
 
    document.getElementById('deviceStuff').innerHTML = deviceStuff;
}
//
function onDeviceReady() {
    alert("device ready.");
    document.getElementById('isCordovaApp').innerHTML  = isCordovaApp(window.cordova);
    document.getElementById('isKnownDevice').innerHTML = isKnownDevice(navigator.platform);
    document.getElementById('appVersion').innerHTML    = app.version;
    if (isCordovaApp()) {
        deviceStuff();
        // Let's mark sure the plugin loaded
        document.getElementById('status0').innerHTML = dialogsPlugin.init();
        // Dialogs methods are hooked here
        dialogsPlugin.hook();
    }
}
