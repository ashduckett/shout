
function SchedulingProjectController(model, view) {
    this._model = model;
    this._view = view;

    var _this = this;

    this._view.addButtonClicked.attach(function () {
        _this.addItem();
    });
}

SchedulingProjectController.prototype = {

    // This function will need to add a new item that is an instance of project


    // The id theory has been proven.
    // So, we need to hit a script that will save the SchedulingProject and get hold of its id as a return value.
    // It'll be that id that's added to the model.
    addItem: function () {
        var item = window.prompt('Add item:', '');

        // Since the key is always null in this case, and we don't have an id, it's only capable of adding one
        // at a time.
        var project = new SchedulingProject(null, item);


        if (item) {
            this._model.addItem(project);
        }
    
    
    
    
    
    
    
    
        var item = window.prompt('Add item:', '');

        // Since the key is always null in this case, and we don't have an id, it's only capable of adding one
        // at a time.
        var project2 = new SchedulingProject(5, item);


        if (item) {
            this._model.addItem(project2);
        }
    
    
    
    }






};

/*
    This was an experiment. You should be able to put this into action with database involvement.

    It might take a bit of thinking before you fully grasp this.
*/