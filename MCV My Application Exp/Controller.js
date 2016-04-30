/*
    An instance of this object well be created when the project modal appears. I think.
*/

function Event(sender) {
    this._sender = sender;
    this._listeners = [];
}

Event.prototype = {
    attach: function (listener) {
        this._listeners.push(listener);
    },
    notify: function (args) {                                                   // This function will
        var index;                                                              // Declare an index

        for (index = 0; index < this._listeners.length; index += 1) {           // Iterate over the listeners array once attached. It will call each listener method listening for this event.
            this._listeners[index](this._sender, args);
        }
    }
};

function ListModel(items) {
    this._items = items;                                // Store what's passed in as items. This is actually just an array of strings
    this._selectedIndex = -1;                           // Set a default selected value

                                                        // MODEL EVENTS
    this.itemAdded = new Event(this);                   // Create an event for itemAdded
    this.itemRemoved = new Event(this);                 // Create an event for itemRemoved
    this.selectedIndexChanged = new Event(this);        // Create an event for selectedIndexChanged
}

ListModel.prototype = {
    getItems: function () {
        return [].concat(this._items);                  // Return items as an array
    },
    addItem: function (item) {                          // Push item to the _items list
        this._items.push(item);
        this.itemAdded.notify({ item: item });          // Call notify on the itemAdded event passing in the item. What does this actually do?
    },
    removeItemAt: function (index) {                    
        var item;                           

        item = this._items[index];                      // Get hold of the item to remove by its numeric index
        this._items.splice(index, 1);                   // Remove the item?
        this.itemRemoved.notify({ item: item });        // Call the notify function on the itemRemoved function, passing in the item that was removed. What is this for?

        if (index === this._selectedIndex) {            // If the item removed was the selected item, then deselect everything
            this.setSelectedIndex(-1);
        }
    },
    getSelectedIndex: function () {                     
        return this._selectedIndex;                     // Return the currently selected index
    },
    setSelectedIndex: function (index) {            
        var previousIndex;              
        previousIndex = this._selectedIndex;                            // Get the currently selected indes
        this._selectedIndex = index;                                    // Set a new index
        this.selectedIndexChanged.notify({ previous: previousIndex });  // Call the notify method on the selectedIndexChanged method, passing int the previousIndex in an object?
    }
};


/*
    This object has a model as created first, and the actual html elements passed in.
*/
function ListView(model, elements) {
    this._model = model;                                                // Store the model
    this._elements = elements;                                          // Store the elements

    this.listModified = new Event(this);                                // A view event for when the list is modified
    this.addButtonClicked = new Event(this);                            // A view event for when the add button is clicked
    this.delButtonClicked = new Event(this);                            // A view event for when the del button is clicked

    var _this = this;                                                   // Store the outer context

    this._model.itemAdded.attach(function () {                          // Attach a listener to the item addede method. This tells the model to rebuild the list when the itemAdded gets notify called on it.
        _this.rebuildList();
    });

    this._model.itemRemoved.attach(function () {                        // Same for itemRemoved
        _this.rebuildList();
    });

    this._elements.list.change(function(e) {                            // When the list changes, according to the javascript change event, notify on listModified.
        _this.listModified.notify({index: e.target.selectedIndex }); 
    });

    this._elements.addButton.click(function () {                        // Call notify on addButtonClicked

        _this.addButtonClicked.notify();
    });

    this._elements.delButton.click(function () {                        // Call notify on delButtonClicked
        _this.delButtonClicked.notify();
    });


}

ListView.prototype = {
    show: function () {
        this.rebuildList();
    },

    rebuildList: function () {
        var list, items, key;

        list = this._elements.list;



        list.html("");

        items = this._model.getItems();

        for (key in items) {
            if (items.hasOwnProperty(key)) {
                list.append($('<option>' + items[key] + '</option>'));
            }
        }
        this._model.setSelectedIndex(-1);
    }
};


function ListController(model, view) {
    this._model = model;
    this._view = view;

    var _this = this;

    this._view.listModified.attach(function (sender, args) {
        _this.updateSelected(args.index);
    });

    this._view.addButtonClicked.attach(function () {
        _this.addItem();
    });

    this._view.delButtonClicked.attach(function () {
        _this.delItem();
    });
}

ListController.prototype = {
    addItem: function () {
        var item = window.prompt('Add item:', '');
        if (item) {
            this._model.addItem(item);
        }
    },
    delItem: function () {
        var index;
        index = this._model.getSelectedIndex();
        if (index !== -1) {
            this._model.removeItemAt(this._model.getSelectedIndex());
        }
    },

    updateSelected: function (index) {
        this._model.setSelectedIndex(index);
    }
};