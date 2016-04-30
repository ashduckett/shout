
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

    /*this._view.delButtonClicked.attach(function () {
        _this.delItem();
    });*/
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
