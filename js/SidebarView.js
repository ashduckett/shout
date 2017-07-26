class SidebarView {
    constructor(element, controller) {
        this.element = element;
        this.controller = controller;
        this.rowColumnSubview = $(document.createElement('div'));

        // The latest project name. Can this go now?
        this.projectName = null;
    }

    getSideBar() {
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
                // Currently this is my way of notifying the controller.
                _this.userDidCreateNewProject($('#project-name').val());
                modal.hideModal();
            });

            modal.addButton('Close', 'default', function () {
                modal.hideModal();
            });

            modal.showModal();
        });
        return sidebar
    }

    userDidCreateNewProject(name) {
        this.controller.userDidCreateNewProject(name);
    }

    draw() {
        this.rowColumnSubview.append(this.getSideBar())
        this.element.append(this.rowColumnSubview);
    }
}

