var dialogsPlugin = {
    version : '1.0.0',

    init : function () {
        return JSON.stringify(navigator.notification);
    },
    // Register your function that will call the dialogs
    hook : function () {
        // You can listen to 'click', but 'touch' by passes the inherent delay.
        document.getElementById("alertButton").addEventListener("touch", dialogsPlugin.alert, false);
        document.getElementById("confirmButton").addEventListener("touch", dialogsPlugin.confirm, false);
        document.getElementById("promptButton").addEventListener("touch", dialogsPlugin.prompt, false);
        document.getElementById("beepButton").addEventListener("touch", dialogsPlugin.beep, false);
    },
    //
	alert : function () {
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
        // Android has a maximum of three (3) buttons.
        // for how the 'this' operator is working see:
        // https://github.com/jessemonroy650/top-phonegap-mistakes/blob/master/using-this-correctly.md
        navigator.notification.confirm(
            "The plugin.confirm() message",
            this.genericCallback.bind(this),
            "confirm title",
            ['button 1', 'button 2', 'button 3']
        );
        document.getElementById('dialogStatus').innerHTML = "confirm button pressed";
    },
    //
	prompt : function () {
        // Android has a maximum of three (3) buttons.
        // This callback is to a global function, or at least file scoped.
        navigator.notification.prompt(
            "The plugin.prompt() message",
            promptResponseCallback,
            "prompt title",
            ['button 1', 'button 2', 'button 3']
        );
        document.getElementById('dialogStatus').innerHTML = "prompt button pressed";
    },
    //
	beep : function () {
        navigator.notification.beep(4);
    },
    // We are breaking modularity rules to make a specific point about how to use 'this'.
    // Namely, we only ever expect this particular function to be called with via the confirm() function.
    genericCallback : function (index) {
        document.getElementById('dialogCallback').innerHTML = "confirm() button: " + index;
    }
}
//
function promptResponseCallback(buttonIdx) {
    document.getElementById('dialogCallback').innerHTML = "prompt() button: " + buttonIdx
}

