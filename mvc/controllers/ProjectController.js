function ProjectController(model, view) {
     
    
    this._model = model;
    this._view = view;
    
    var _this = this;

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
        _this.updateShoutTable(args.id, 1);
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

    deleteProjectModal.addButton('Cancel', 'default', function () {
        deleteProjectModal.hideModal();
    });

    // This is where the deletion happens!
    deleteProjectModal.addButton('Confirm', 'primary', function () {
        $.post("../API.php", { object_id: id, method: 'delete_by_id', type: 'SchedulingProject' })
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
    
    var modal = new Modal(500, 200, 'Edit Project...', '../modal_layouts/add_project.php', function () {
        $('#project-name').val(_this.name);
    });

    modal.addButton('Save', 'primary', function () {
        var projectName = $('#project-name').val();
        var projectId = project.id;

        $.post('../../update_project.php', { id: projectId, name: projectName }, function () {
            var project = new SchedulingProject(projectId, projectName);
            _this._model.updateProject(project);
            modal.hideModal();
        });
    });

    modal.addButton('Close', 'default', function () {
        modal.hideModal();
    });

    modal.showModal();
};

// This is only called when the project is clicked. It just gets the first page. How about a method on the model called getFirstPage(), getNext(), getLast(), getPrev()
ProjectController.prototype.updateShoutTable = function (id, pageNo) {

    var element = document.getElementsByClassName('shout-table');
    var shoutModel = new ShoutModel();

    shoutModel.setToFirstPage(id, function () {
        console.log('first page loaded');
        
        var element = document.getElementsByClassName('shout-table')[0];
        var shoutView = new ShoutView(shoutModel, element);
        var controller = new ShoutController(shoutModel, shoutView);
        shoutView.draw();
    });
};