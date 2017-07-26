class SidebarView {
    constructor(element, controller) {
        this.element = element;
        this.controller = controller;
        this.rowColumnSubview = $(document.createElement('div'));
    }

    createListItem(text, classNames, id) {
        let listItem = $(document.createElement('li'))
        listItem.text(text)

        for(var i = 0; i < classNames.length; i++) {
            listItem.addClass(classNames[i]);
        }

        if(id) {
            listItem.attr('id', id);
        }

        return listItem;
    }

    getSideBar() {
        let sidebar = $(document.createElement('div'));
        sidebar.addClass('sidebar');

        // List of items
        let sideBarListing = $(document.createElement('ul'));
        sideBarListing.addClass('sidebar-listing');

        let socialMediaHeader = this.createListItem('Social Media', ['sidebar-header'])
        let mnuItemNewProject = this.createListItem('New Schedule', ['sidebar-item'], 'new-project')
        let mnuItemNewImport = this.createListItem('Impore...', ['sidebar-item', 'disabled'])
        let projectHeader = this.createListItem('Project', ['sidebar-header'])
        let mnuItemGenerateSchedule = this.createListItem('Generare Schedule...', ['sidebar-item', 'disabled'], 'generate-schedule')
        let mnuItemImportTo = this.createListItem('Import To...', ['sidebar-item', 'disabled'])
        let mnuItemExportFrom = this.createListItem('Export From...', ['sidebar-item', 'disabled'])
        let mnuItemAdvanced = this.createListItem('Advanced...', ['sidebar-item', 'disabled'])

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
        //this.rowColumnSubview.append(this.getSideBar())
        this.element.append(this.getSideBar());
    }
}

