var Row = function(domElement) {
    this.id = null;
    this.domElement = domElement;
};


var Column = function(domElement) {
    // Database id
    this.id = null;

    // Row DOM elements
    this.rows = {};

    // The column DOM element
    this.domElement = domElement;
};

// When in use, this should be the only thing we need.
var RowColumnController = function(element, projectModel, parentController) {

    this.parentController = parentController

    this.model = projectModel;

    // Create an instance of the view, telling it the model.
    this.view = new RowColumnView(element, projectModel, this);

    // Now that this has run, update will be called from outside.
};

RowColumnController.prototype.update = function() {
    this.view.draw();
};

RowColumnController.prototype.addColumn = function() {
    this.view.addColumn();
}

RowColumnController.prototype.addRow = function(rowIndex) {
    this.view.addRow(rowIndex);
};

RowColumnController.prototype.addShout = function(shout) {
    this.model.projects[shout.project_id].shouts.push(shout);
    this.view.draw();
};

RowColumnController.prototype.deleteProject = function(projectId) {
    this.model.removeProjectWithId(projectId);
    this.view.draw();
};

/* View code */
var RowColumnView = function(element, model, controller) {
    this.element = $(element);
    this.model = model;         // this shouldn't be here
    this.controller = controller;

    /* Setup CSS */
    this.element.css('width', '100%');
    this.element.css('height', '100%');
    this.element.css('position', 'relative');

    // Dictionary to hold columns by project id.
    // Start with Column objects because these hold an array for rows. This will eventually have to be a dictionary as well.
    // How then do we deal with order?
    this.columnsByProjectId = {};
};

// You know you need to store the dom element.
// But this should live in the view.
// It should also be indexed by the project id.

RowColumnView.prototype.draw = function() {
    var elementToDrawTo = this.element;

    // Clear out the element for a fresh redraw
    this.element.html('');

    var currentLeft = 0;
    var self = this;

    var currentIndex = 0;
    var currentTop = 0;

    this.model.projects.forEach(function(element) {

        col = this.addColumn(currentLeft, element.id);
        currentLeft += 250 + 1;

        // New storage system
        this.columnsByProjectId[element.id] = col;
        this.columnsByProjectId[element.id].id = element.id;

        element.shouts.forEach(function(shout) {
            console.log(shout);
            this.columnsByProjectId[element.id].rows[shout.id] = this.addRow(element.id, currentIndex, currentTop + 26, shout);
            currentTop += 200 + 1;
        }, this);

        currentTop = 0;
        currentIndex++;
    }, this);
};

// This is called once, via RowColumnController.view when it loads.
// It is actually only adding a single column
// It creates the column, and then it adds it to the column array.
// So you can't just run it and have all your columns.
// Since it has to be called for each column, it kind of makes sense to leave it in
// its own method.
// The draw method, however, should be the only thing that calls it.
RowColumnView.prototype.addColumn = function(left, projectId) {
    var column = $(document.createElement('div'));

    // Setup CSS
    column.css('width', '250px');
    column.css('height', '100%');
    column.css('background-color', 'gray');
    column.css('position', 'absolute');
    column.css('top', '0');
    column.css('left', left);
    column.css('overflow-y', 'auto');

    let toolbar = $(document.createElement('div'));
    toolbar.css('width', '100%');
    toolbar.css('height', '25px');
    toolbar.css('background-color', 'rgb(150, 150, 150)');
    toolbar.css('text-align', 'right');
    toolbar.css('pointer-events', 'none');
    toolbar.css('display', 'flex');
    toolbar.addClass('toolbar');

    let addShoutLink = $(document.createElement('a'));
    addShoutLink.attr('href', '#');
    let icon = $(document.createElement('i'));
    icon.addClass('fa');
    icon.addClass('fa-plus');
    icon.attr('aria-hidden', 'true');
    addShoutLink.append(icon);
    addShoutLink.css('pointer-events', 'auto');
    addShoutLink.addClass('link');
    addShoutLink.css('margin-left', 'auto');
    addShoutLink.css('margin-right', '7px');
    addShoutLink.css('margin-top', 'auto');
    addShoutLink.css('margin-bottom', 'auto');
    addShoutLink.css('text-decoration', 'none');
    addShoutLink.css('color', 'white');

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

    addShoutLink.click(function() {
        var modal = new Modal(300, 200, 'Add Shout', '../modal_layouts/add_shout.php');

        modal.addButton('Save', 'primary', function () {

            var shoutDate = moment($('.calendar').val(), "L").format('YYYY-MM-DD 00:00:00');
            var shoutTime = moment($('.clock').val(), "h:mm A").format('YYYY-MM-DD HH:mm:00');
            var shoutText = $('#shoutText').val();

            $.post("../save_shout.php", { shoutDate: shoutDate, shoutTime: shoutTime, projectId: projectId, shoutText: shoutText }, function (data) {
                var newShout = new Shout(data, projectId, shoutText, shoutDate, shoutTime);

                self.controller.addShout(newShout);
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
            $.post("../API.php", { object_id: projectId, method: 'delete_by_id', type: 'SchedulingProject' })
                .done(function (data) {
        
                self.controller.deleteProject(projectId);
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
               // console.log(element)
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


    // We need to add something to the column.
    // We also need the id of the project



    this.element.append(column);




    // Maybe you don't need to store an entire Column object. We already have the model?
    // If you took it out, though, you couldn't iterate over for when you want to do swapsies.
    
    var newColumn = new Column(column);
    
    return newColumn;
};

// Change this to work like addColumn with storing the things by id.`
// This is wrong, don't pass the shout into the view. Use the controller to get the shout...
RowColumnView.prototype.addRow = function(projectId, columnIndex, top, shout) {
    
    // This will still work. I wanted them stored by id!
    var column = this.columnsByProjectId[projectId];


    var row = $(document.createElement('div'));
    row.addClass('row');
    row.css('height', '200px');
    row.css('width', '100%');
    row.css('background-color', 'white');
    row.css('z-index', '999999999999999999');
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
    
        return new Row(row);
};


// Get the project ids stored into the Column object.
// Indexing by id is only so useful since you need to be able to get hold of your data and getting the key of
// an object seems inunituitive.