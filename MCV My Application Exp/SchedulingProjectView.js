function SchedulingProjectView(model, element) {
    this.model = model;
    this.element = element;
    var _this = this;

    this.addButtonClicked = new Event(this);
    this.delButtonClicked = new Event(this);

    
    /*
        Here is where one time setup goes. No adding of items to the list happens here.
    */
    
    this.addItemButton = document.createElement('a');
    this.addItemButton.innerHTML = 'Add Item';
    this.addItemButton.href = '#';



    this.model.itemAdded.attach(function () {                          // Attach a listener to the item addede method. This tells the model to rebuild the list when the itemAdded gets notify called on it.
        _this.rebuildList();
    });



    this.addItemButton.addEventListener("click", function () {
        _this.addButtonClicked.notify();
    });

}

SchedulingProjectView.prototype.draw = function () {
    var _this = this;
    var list = document.createElement('ul');
    var projects = this.model.getProjects();

    this.element.innerHTML = "";
    for (var i in projects) {
        var newItem = document.createElement('li');
        newItem.innerHTML = this.model.getProjectById(i).name;
        list.appendChild(newItem);
    }

    var listItem = document.createElement('li');
    listItem.innerHTML = 'A';
    list.appendChild(listItem);
    this.element.appendChild(list);

    
    this.element.appendChild(this.addItemButton);



    
};

SchedulingProjectView.prototype.rebuildList = function () {
     this.draw();
};