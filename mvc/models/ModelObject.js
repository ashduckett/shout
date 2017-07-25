class MyModel {

    constructor() {
        this.subscribers = {
            any: []
        };
    }
    
    // Stash the function, indexed by type
    subscribe(fn, type) {
        // If there is no type, set it to any
        type = type || 'any';
        
        // If there's no entry for the type, as an index in subscribers, create it
        // and make it an empty array        
        if(typeof this.subscribers[type] === 'undefined') {
            this.subscribers[type] = [];
        }

        // Store in an array, indexed by type, the function
        this.subscribers[type].push(fn);
    }

    unsubscribe(fn, type) {
        this.callSubscribingMethods('unsubscribe', fn, type);
    }

    broadcast(item, type) {
        this.callSubscribingMethods('addition', item, type);
    }

    callSubscribingMethods(action, arg, type) {
        
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