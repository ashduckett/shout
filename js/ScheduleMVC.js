let Model = function() {
    // This is capable of loading the projects
    this.projects = new SchedulingProjectModel();
};

let Controller = function(element) {
    this.view = new View(element, this);
    this.model = new Model();
    this.rowColumnController = null;

    let self = this;

    this.model.projects.loadProjects(function() {
        // It's not until the model is loaded that we can create the RowColumnController
        self.rowColumnController = new RowColumnController(self.view.rowColumnSubview, self.model.projects);
        
        // Draw the menu and the row column stuff
        self.update();
    });
};

Controller.prototype.update = function() {
    this.view.draw();

};

// Ideally we'd be passing in an instance of project here...
Controller.prototype.addProject = function(project) {
    console.log('controller about to add project');
    this.model.projects.addItem(project);
    this.update();
};

let View = function(element, controller) {
    this.element = element;
    this.controller = controller;
    this.rowColumnSubview = $(document.createElement('div'));
};

View.prototype.getSideBar = function() {
    let sidebar = $(document.createElement('div'));
    sidebar.addClass('sidebar');

    // List of items
    let sideBarListing = $(document.createElement('ul'));
    sideBarListing.addClass('sidebar-listing');

    // One header
    let socialMediaHeader = $(document.createElement('li'));
    socialMediaHeader.text('Social Media');
    socialMediaHeader.addClass('sidebar-header');

    let mnuItemNewProject = $(document.createElement('li'));
    mnuItemNewProject.text('New Project');
    mnuItemNewProject.addClass('sidebar-item');
    mnuItemNewProject.attr('id', 'new-project');

    let mnuItemNewImport = $(document.createElement('li'));
    mnuItemNewImport.text('Import...');
    mnuItemNewImport.addClass('sidebar-item');
    mnuItemNewImport.addClass('disabled');

    let mnuItemAddItem = $(document.createElement('li'));
    mnuItemAddItem.text('Add Item...');
    mnuItemAddItem.addClass('sidebar-item');
    mnuItemAddItem.addClass('disabled');

    let projectHeader = $(document.createElement('li'));
    projectHeader.text('Project');
    projectHeader.addClass('sidebar-header');

    let mnuItemGenerateSchedule = $(document.createElement('li'));
    mnuItemGenerateSchedule.text('Generate Schedule...');
    mnuItemGenerateSchedule.addClass('sidebar-item');
    mnuItemGenerateSchedule.addClass('disabled');
    mnuItemGenerateSchedule.attr('id', 'generate-schedule');


    let mnuItemImportTo = $(document.createElement('li'));
    mnuItemImportTo.text('Import To...');
    mnuItemImportTo.addClass('sidebar-item');
    mnuItemImportTo.addClass('disabled');

    let mnuItemExportFrom = $(document.createElement('li'));
    mnuItemExportFrom.text('Export From...');
    mnuItemExportFrom.addClass('sidebar-item');
    mnuItemExportFrom.addClass('disabled');

    let mnuItemAdvanced = $(document.createElement('li'));
    mnuItemAdvanced.text('Advanced...');
    mnuItemAdvanced.addClass('sidebar-item');
    mnuItemAdvanced.addClass('disabled');

    sideBarListing.append(socialMediaHeader);
    sideBarListing.append(mnuItemNewProject);
    sideBarListing.append(mnuItemNewImport);
    sideBarListing.append(projectHeader);
    sideBarListing.append(mnuItemAddItem);
    sideBarListing.append(mnuItemGenerateSchedule);
    sideBarListing.append(mnuItemImportTo);
    sideBarListing.append(mnuItemExportFrom);
    sideBarListing.append(mnuItemAdvanced);

    sidebar.append(sideBarListing);


    // Make the new project menu item work

    var _this = this;

    mnuItemNewProject.click(function() {
    
        var modal = new Modal(500, 200, 'Add Project', rootFolder + '/modal_layouts/add_project.php');

        modal.addButton('Save', 'primary', function () {
            var name = $('#project-name').val();
            var projectName = $('#project-name').val();

            $.post("../save_project.php", { name: projectName }, function (data) {
                var newProject = new SchedulingProject(data, projectName);
                _this.controller.addProject(newProject);
                modal.hideModal();
            });
        });

        modal.addButton('Close', 'default', function () {
            modal.hideModal();
        });

        modal.showModal();
    });

    return sidebar
};


// We need a draw function
View.prototype.draw = function() {
    this.element.html('');
    // Draw the sidebar
    this.element.append(this.getSideBar());

    // Add the empty row column stuff
    this.element.append(this.rowColumnSubview);

    // Update the rows and the columns
    this.controller.rowColumnController.update();
};