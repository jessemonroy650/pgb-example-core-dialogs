var dialogsPlugin = {
    version : '1.0.0',

    init : function () {
        return JSON.stringify(navigator.notification);
    },
    // Register your function that will call the dialogs
    hook : function () {
        document.getElementById('status0').innerHTML = "hook() called";
        // You can listen to 'click', but 'touch' by passes the inherent delay.
        // See: https://www.w3schools.com/jsref/dom_obj_event.asp
        document.getElementById("alertButton").addEventListener("click", dialogsPlugin.alert, false);
        document.getElementById("confirmButton").addEventListener("touchend", dialogsPlugin.confirm, false);
        document.getElementById("promptButton").addEventListener("touchend", dialogsPlugin.prompt, false);
        document.getElementById("beepButton").addEventListener("touchend", dialogsPlugin.beep, false);
    },
    //
	alert : function () {
        document.getElementById('status0').innerHTML = "alert() called";
        navigator.notification.alert(
            "The plugin.alert() message",
            function () { document.getElementById('dialogCallback').innerHTML = "Alert() dismissed" },
            "Alert title",
            "alert button"
        );
        document.getElementById('dialogStatus').innerHTML = "dialog button pressed";
    },
    //
	confirm : function () {
        document.getElementById('status0').innerHTML = "confirm() called";
        // Android has a maximum of three (3) buttons.
        navigator.notification.confirm(
            "The plugin.confirm() message",
            dialogsPlugin.genericCallback,
            "confirm title",
            ['button 1', 'button 2', 'button 3']
        );
        document.getElementById('dialogStatus').innerHTML = "confirm button pressed";
    },
    //
	prompt : function () {
        document.getElementById('status0').innerHTML = "prompt() called";
        // Android has a maximum of three (3) buttons.
        // This callback is to a global function, or at least file scoped.
        navigator.notification.prompt(
            "The plugin.prompt() message",
            promptResponseCallback,
            "prompt title",
            ['button 1', 'button 2', 'button 3'],
            "default response"
        );
        document.getElementById('dialogStatus').innerHTML = "prompt button pressed";
    },
    //
	beep : function () {
        document.getElementById('status0').innerHTML = "beep() called";
        navigator.notification.beep(4);
    },
    //
    genericCallback : function (index) {
        document.getElementById('dialogCallback').innerHTML = "confirm() button: " + index;
    }
}
//
function promptResponseCallback(buttonIdx) {
    document.getElementById('dialogCallback').innerHTML = "prompt() button: " + JSON.stringify(buttonIdx);
}

