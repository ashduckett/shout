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

ProjectController.prototype.updateShoutTable = function (id, pageNo) {
    var element = document.getElementsByClassName('shout-table');
    var shoutModel = new ShoutModel();
    var shoutView = new ShoutView(shoutModel, element);

    shoutModel.loadShouts(id, pageNo, function () {
        shoutView.nextButtonClicked.attach(function () {
            var nextPage = $(shoutView.nextButton).attr('data-next');

            shoutModel.loadShouts(id, nextPage, function () {
                var element = document.getElementsByClassName('shout-table');
                shoutView.draw();
            });
        });

        shoutView.prevButtonClicked.attach(function () {
            var prevPage = $(shoutView.previousButton).attr('data-prev');

             shoutModel.loadShouts(id, prevPage, function () {
                 var element = document.getElementsByClassName('shout-table');
                 shoutView.draw();
             });
        });


        shoutView.draw();
    });



};