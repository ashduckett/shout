let Controller = function(element) {
    this.view = new View(element, this);
    this.model = new SchedulingProjectModel();
    this.rowColumnController = null;

    let self = this;

    this.model.loadProjects(function() {
        // It's not until the model is loaded that we can create the RowColumnController
        self.rowColumnController = new RowColumnController(self.view.rowColumnSubview, self.model, self);
        
        // Draw the menu and the row column stuff
        self.update();
    });
};

Controller.prototype.update = function() {
    this.view.draw();
};

Controller.prototype.addProject = function(callback) {
    // First construct a project
    let self = this
    let projectName = this.view.getProjectName();

    $.post("../save_project.php", { name: projectName }, function (data) {
        // Create a new project based on the view and where data is the id
        var newProject = new SchedulingProject(data, projectName);
        
        self.model.addItem(newProject);
        self.rowColumnController.view.jsonModel = JSON.stringify(self.model);
        self.update();

        if(callback && typeof callback === 'function') {
            callback();
        }
    });
};

let View = function(element, controller) {
    this.element = element;
    this.controller = controller;
    this.rowColumnSubview = $(document.createElement('div'));

    // The latest project name
    this.projectName = null;
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
    mnuItemNewProject.text('New Schedule');
    mnuItemNewProject.addClass('sidebar-item');
    mnuItemNewProject.attr('id', 'new-project');

    let mnuItemNewImport = $(document.createElement('li'));
    mnuItemNewImport.text('Import...');
    mnuItemNewImport.addClass('sidebar-item');
    mnuItemNewImport.addClass('disabled');

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
            _this.setProjectName($('#project-name').val());

            _this.controller.addProject(function() {
                _this.controller.update();
                
                
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

View.prototype.setProjectName = function(name) {
    this.projectName = name;
};

View.prototype.getProjectName = function(name) {
    return this.projectName;
};


// We need a draw function
View.prototype.draw = function() {
    
    // Clear out the element's html
    this.element.html('');
    
    // Draw the sidebar
    this.element.append(this.getSideBar());

    // Add the project/shout view
    this.element.append(this.rowColumnSubview);

    // Update the rows and the columns

    // What is rowColumnController? It's an instance of RowColumnController
    this.controller.rowColumnController.update();
};