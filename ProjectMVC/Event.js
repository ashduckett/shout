// This Event type declaration might need to be moved when it starts getting used elsewhere
function Event(sender) {
    this._sender = sender;
    this._listeners = [];
}

Event.prototype = {
    attach: function (listener) {
        this._listeners.push(listener); // these functions will get called when this specific event gets a notify
    },
    notify: function (args) {
        var index;

        for (index = 0; index < this._listeners.length; index += 1) {           // Iterate over the listeners array once attached. It will call each listener method listening for this event.
            this._listeners[index](this._sender, args);
        }
    }
};