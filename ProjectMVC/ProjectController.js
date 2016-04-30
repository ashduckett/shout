
function ProjectController(model, view) {
    this._model = model;
    this._view = view;

    var _this = this;

    /*this._view.listModified.attach(function (sender, args) {
        _this.updateSelected(args.index);
    });*/

    this._view.addButtonClicked.attach(function () {
        _this.addItem();
    });

    this._view.delButtonClicked.attach(function (sender, args) {
        console.log(args.id);
        _this.delItem(args.id);
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
}

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

}
