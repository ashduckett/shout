let MyModel = function() {

    // Model bit
    let numbers = [];


    this.addItem = function(number) {
        numbers.push(number);
        this.broadcast(number, 'addition')
    };
    
    this.subscribers = {
        any: []
    };

    // Stash the function, indexed by type
    this.subscribe = function(fn, type) {
        // If there is no type, set it to any
        type = type || 'any';
        
        // If there's no entry for the type, as an index in subscribers, create it
        // and make it an empty array        
        if(typeof this.subscribers[type] === 'undefined') {
            this.subscribers[type] = [];
        }

        // Store in an array, indexed by type, the function
        this.subscribers[type].push(fn);
    };

    this.unsubscribe = function(fn, type) {
        this.callSubscribingMethods('unsubscribe', fn, type);
    };

    this.broadcast = function(item, type) {
        this.callSubscribingMethods('addition', item, type);
    };

    this.callSubscribingMethods = function(action, arg, type) {
        
        // If there's no type, set it to any. This is the type of subscription.
        let pubtype = type || 'any';

        // Grab hold of the array of subscribing methods for the type passed in
        let subscribers = this.subscribers[pubtype];
        let i;
        let max = subscribers.length;
        
        for(i = 0; i < max; i += 1) {
            if(action === 'addition') {
               subscribers[i](arg);
            } 
        }
    }
};