function ProjectController(model, view) {
    this._model = model;
    this._view = view;
    
    var _this = this;

    /*this._view.listModified.attach(function (sender, args) {
        _this.updateSelected(args.index);
    });*/

    this._view.editButtonClicked.attach(function (sender, args) {
        _this.updateItem(args.project);
    });

    this._view.addButtonClicked.attach(function () {
        _this.addItem();
    });

    this._view.delButtonClicked.attach(function (sender, args) {
        _this.delItem(args.id);
    });

    this._view.projectItemClicked.attach(function (sender, args) {
        //alert('click!');
        _this.updateShoutTable(args.id);
    });
}

ProjectController.prototype.addItem = function () {
    var _this = this;
    var modal = new Modal(500, 200, 'Add Project', '../modal_layouts/add_project.php');

    modal.addButton('Save', 'primary', function () {
        var name = $('#project-name').val();
        var projectName = $('#project-name').val();
        $.post("../save_project.php", { name: projectName }, function (data) {
            var newProject = new SchedulingProject(data, projectName);
            _this._model.addItem(newProject);
            modal.hideModal();
        });
    });

    modal.addButton('Close', 'default', function () {
        modal.hideModal();
    });

    modal.showModal();
};

ProjectController.prototype.delItem = function (id) {
    var _this = this;
    var deleteProjectModal = new Modal(400, 100, "Confirm", "modal_layouts/delete_project.php");

    deleteProjectModal.addButton('No!', 'default', function () {
        deleteProjectModal.hideModal();
    });

    deleteProjectModal.addButton('Yip!', 'primary', function () {
        $.post("delete_scheduled_project.php", { projId: id })
        .done(function (data) {
            _this._model.removeProjectWithId(id);
            deleteProjectModal.hideModal();
        });
    });
    deleteProjectModal.showModal();
};

ProjectController.prototype.updateItem = function (project) {
    this.name = project.name;
    var _this = this;
    
    var modal = new Modal(500, 200, 'Add Project', '../modal_layouts/add_project.php', function () {
        $('#project-name').val(_this.name);
    });

    modal.addButton('Save', 'primary', function () {
        var projectName = $('#project-name').val();
        var projectId = project.id;
        
        $.post('../update_project.php', { id: projectId, name: projectName }, function () {
            var project = new SchedulingProject(projectId, projectName);
            _this._model.updateProject(project);
            modal.hideModal();
        });
    });

    modal.addButton('Close', 'default', function () {
        modal.hideModal();
    });

    modal.showModal();
}

ProjectController.prototype.updateShoutTable = function (id) {
    // Here we need to know the project id.
    // Also, which page to draw. Which will be 1.


    var shoutModel = new ShoutModel();

    // Once this is called, the shouts will exist on the ShoutModel object

    // So you need to know which project has just been clicked on.

    // Nothing should be loaded until the project is clicked. So you need an event on each project that brings out the id.
    shoutModel.loadShouts(id, function () {

        var element = document.getElementsByClassName('shout-table');
        var shoutView = new ShoutView(shoutModel, element);

        console.log('about to call draw on shout view');

        // This is fixed. It needs to be dynamic!
        shoutView.draw();


        // Get hold of the element to put the table on
    });



};