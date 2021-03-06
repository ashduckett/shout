// Do you actually want to use JSON?
// I've read that the view should know nothing of the model.
// If you have enough controls on the view, maybe this is entirely possible

var Row = function(domElement) {
    this.id = null;                                         // model
    this.domElement = domElement;                           // view
};

var Column = function(domElement) {
    // Database id
    this.id = null;                                         // model

    // Row DOM elements
    this.rows = {};                                         // view

    // The column DOM element
    this.domElement = domElement;                           // view
};

// Purpose: To control entire view
var RowColumnController = function(element, projectModel) {
    
    // What is this?
    
    this.sidebarView = new SidebarView(element, this);
    this.element = element

    let self = this;

    // Controller needs to know about its model so this is fine.
    this.model = new ProjectCollection();

    // Initialise model
    this.model.loadProjects(function() {
        self.jsonModel = JSON.stringify(self.model);
        self.view = new RowColumnView(element, self, self.jsonModel);
        self.sidebarView.draw();
        self.view.draw();
    });
};

RowColumnController.prototype.update = function() {
    this.view.draw();
};

// passing in a shout here may not make sense since it won't have an id.
RowColumnController.prototype.addShout = function(projectId, callback) {

    let self = this;

    $.post("../save_shout.php", { shoutDate: this.view.getDate(), shoutTime: this.view.getTime(), projectId: projectId, shoutText: this.view.getText() }, function (data) {
        let newShout = new Shout(data, projectId, self.view.getText(), self.view.getDate(), self.view.getTime());

        // Use the projectId to add a shout to a project in the model.
        self.model.addShout(projectId, newShout)
        self.view.jsonModel = JSON.stringify(self.model);
        self.view.draw();
        callback();
                
    });
};

RowColumnController.prototype.userDidCreateNewProject = function(name) {
    this.addProject(name);
}

RowColumnController.prototype.deleteProject = function(projectId, callback) {
    let self = this;

    $.post("../API.php", { object_id: projectId, method: 'delete_by_id', type: 'SchedulingProject' }).done(function (data) {
        self.model.removeProjectWithId(projectId);
        self.view.jsonModel = JSON.stringify(self.model);
        self.view.draw();
        callback();
   });
};

RowColumnController.prototype.addProject = function(name) {
    // First construct a project
    let self = this

    $.post("../save_project.php", { name: name }, function (data) {
        // Create a new project based on the view and where data is the id
        var newProject = new Project(data, name);
        
        self.model.addProject(newProject);
        self.view.jsonModel = JSON.stringify(self.model);
        self.update();

      //  if(callback && typeof callback === 'function') {
      //      callback();
      //  }
    });
};

/* View code */
var RowColumnView = function(element, controller, jsonModel) {
    this.container = $(document.createElement('div'))
    this.element = $(element);
    this.controller = controller;
    this.jsonModel = jsonModel;

    /* Setup CSS */
    this.element.css('width', '100%');
    this.element.css('height', '100%');
    this.element.css('position', 'relative');

    // Dictionary to hold columns by project id.
    // Start with Column objects because these hold an array for rows. This will eventually have to be a dictionary as well.
    // How then do we deal with order?
    this.columnsByProjectId = {};

    this.date = null;
    this.time = null;
    this.text = null;
};

RowColumnView.prototype.setDate = function(date) {
    this.date = date;
};

RowColumnView.prototype.setTime = function(time) {
    this.time = time;
};

RowColumnView.prototype.setText = function(text) {
    this.text = text;
};

// Get the current view's values
RowColumnView.prototype.getDate = function() {
    return this.date;
};

RowColumnView.prototype.getTime = function() {
    return this.time;
};

RowColumnView.prototype.getText = function() {
    return this.text;
};



// We add to the model and then call draw. Where do we add to the model?
// From the controller?



// You know you need to store the dom element.
// But this should live in the view.
// It should also be indexed by the project id.

RowColumnView.prototype.draw = function() {
    let elementToDrawTo = this.element;
    let currentLeft = 0;
    let self = this;
    let currentIndex = 0;
    let currentTop = 0;

    let parsedJSON = JSON.parse(this.jsonModel);

    self.container.html('')

    $.each(parsedJSON.projects, function(index, project) {
        let col = self.getColumn(currentLeft, project.id);
        self.container.append(col.domElement)
        currentLeft += 250 + 1;

        // New storage system
        self.columnsByProjectId[project.id] = col;
        self.columnsByProjectId[project.id].id = project.id;

        project.shouts.forEach(function(shout) {
            this.columnsByProjectId[project.id].rows[shout.id] = this.getRow(project.id, currentIndex, currentTop + 26, shout);
            currentTop += 200 + 1;
        }, self);

        currentTop = 0;
        currentIndex++;
    });

    self.container.addClass('row-col-container')
    this.element.append(self.container)
};

RowColumnView.prototype.getColumn = function(left, projectId) {
    var column = $(document.createElement('div'));
    column.addClass('column');
    column.css('left', left);

    let toolbar = $(document.createElement('div'));
    toolbar.addClass('project-toolbar');

    let addShoutLink = $(document.createElement('a'));
    addShoutLink.attr('href', '#');

    let icon = $(document.createElement('i'));
    icon.addClass('fa');
    icon.addClass('fa-plus');
    icon.attr('aria-hidden', 'true');

    addShoutLink.append(icon);
    addShoutLink.addClass('addShoutLink');

    addShoutLink.mousedown(function() {
        event.preventDefault();
        event.stopPropagation();
        return false;
    });

    toolbar.mousemove(function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    });

    toolbar.mouseout(function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    });


    // This needs to pass in just the id to the controller so it knows which one to add the shout to.
    addShoutLink.click(function() {
        var modal = new Modal(300, 200, 'Add Shout', '../modal_layouts/add_shout.php');

        modal.addButton('Save', 'primary', function () {
            let shoutDate = moment($('.calendar').val(), "L").format('YYYY-MM-DD 00:00:00');
            let shoutTime = moment($('.clock').val(), "h:mm A").format('YYYY-MM-DD HH:mm:00');
            let shoutText = $('#shoutText').val();

            self.setDate(shoutDate);
            self.setTime(shoutTime);
            self.setText(shoutText);

            self.controller.addShout(projectId, function() {
                self.draw();
                modal.hideModal();
            });
        });

        modal.addButton('Cancel', 'default', function () {
            modal.hideModal();
        });

        modal.showModal();
    });


    let delProjectLink = $(document.createElement('a'));
    delProjectLink.attr('href', '#');
    let delProjIcon = $(document.createElement('i'));
    delProjIcon.addClass('fa');
    delProjIcon.addClass('fa-trash-o');
    delProjIcon.attr('aria-hidden', 'true');
    delProjectLink.append(delProjIcon);
    delProjectLink.css('pointer-events', 'auto');
    delProjectLink.addClass('link');
    delProjectLink.css('margin-left', 'auto');
    delProjectLink.css('margin-right', '7px');
    delProjectLink.css('margin-top', 'auto');
    delProjectLink.css('margin-bottom', 'auto');
    delProjectLink.css('text-decoration', 'none');
    delProjectLink.css('color', 'white');

    delProjectLink.mousedown(function() {
        event.preventDefault();
        event.stopPropagation();
        return false;
    });

    delProjectLink.click(function() {

        var deleteProjectModal = new Modal(400, 100, "Confirm", "modal_layouts/delete_project.php");
        
        deleteProjectModal.addButton('Cancel', 'default', function () {
            deleteProjectModal.hideModal();
        });

        deleteProjectModal.addButton('Confirm', 'primary', function () {
            self.controller.deleteProject(projectId, function() {
                deleteProjectModal.hideModal();
            });
        });
        deleteProjectModal.showModal();
    });

    toolbar.append(delProjectLink);
    toolbar.append(addShoutLink);
    column.append(toolbar);


    // we need to set the left on each iteration and we can't do that when adding a single column.
    // Need a new plan. I still like the idea of maybe getColumnElement(left) 

    var self = this;

    // At which point is self.columns populated?
    var setters = $(column).draggable(null, null, function() {

        // We want to iterate over all column objects (for in loops are ineffecient so find an alternative later)
        for (var property in self.columnsByProjectId) {

            // This equates to an array of three columns Column objects they are.
            var element = self.columnsByProjectId[property].domElement;
            if(!$(element).hasClass('dragging')) {

                if(event.pageX > $(element).offset().left && event.pageX < $(element).offset().left + $(element).width()) {
                    // If we are inside one of the columns not being dragged, move the column
                    // we're dragging over to the returnPosition, and update the returnPosition
                    // to be that of the column that just moved

                    // Get the starting position of the column we're dragging over
                    var tempReturn = $(element).position();
                    var returnPosition = setters.getReturnPosition();
                   
                    $(element).css({left: returnPosition.left, top: returnPosition.top});
                    returnPosition = tempReturn;
                    setters.setReturnPosition(tempReturn.top, tempReturn.left);
                    return false;
                }
            }
        }
    });

    var newColumn = new Column(column);
    return newColumn;
};

// Change this to work like addColumn with storing the things by id.`
// This is wrong, don't pass the shout into the view. Use the controller to get the shout...
RowColumnView.prototype.getRow = function(projectId, columnIndex, top, shout) {
    
    // This will still work. I wanted them stored by id!
    var column = this.columnsByProjectId[projectId];

    var row = $(document.createElement('div'));
    row.addClass('row');
    row.css('top', top + 'px');

    let id = null;

    var setters = $(row).draggable(null, null, function() {
        // Currently the rows are arrays so this is fine as it is.
        var rows = column.rows;

        for (var property in rows) {
            var row = $(rows[property].domElement);
            id = rows[property].id;

            if(!$(row).hasClass('dragging')) {
                if(event.pageY < $(row).offset().top + $(row).height() && event.pageY > $(row).offset().top) {
                    var tempReturn = $(row).position();
                    var returnPosition = setters.getReturnPosition();

                    $(row).css({left: returnPosition.left, top: returnPosition.top});
                    returnPosition = tempReturn;
                    setters.setReturnPosition(tempReturn.top, tempReturn.left);
                    return false;
                }
            }
        }
    });

    // Add row to the view
    let imageContainer = $(document.createElement('div'));
    imageContainer.width(50);
    imageContainer.height(50);
    imageContainer.css('background-color', 'red');
    imageContainer.css('margin', '10px');

    let image = $(document.createElement('img'));
    image.css('display', 'block');
    image.css('height', '100%');
    image.css('width', '100%');
    image.attr('src', 'https://unsplash.it/g/50/50');
    imageContainer.append(image);

    row.append(imageContainer);

    
    // Now an area for the text
    let textArea = $(document.createElement('div'));
    textArea.css('width', '90%');
    textArea.css('height', '60%');
    textArea.css('margin', 'auto');
    textArea.css('font-family', 'Just Another Hand')
    textArea.css('font-size', '20px')

    textArea.text(shout.text);

    row.append(textArea);


    $(column.domElement).append(row);

    // This is the only place this is instantiated
    return new Row(row);
};


// Get the project ids stored into the Column object.
// Indexing by id is only so useful since you need to be able to get hold of your data and getting the key of
// an object seems inunituitive.