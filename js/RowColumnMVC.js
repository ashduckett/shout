var Column = function(domElement) {
    
    // Row DOM elements
    this.rows = [];

    // The column DOM element
    this.domElement = domElement;
};

// When in use, this should be the only thing we need.
var RowColumnController = function(element, projectModel) {
    this.view = new RowColumnView(element);
    this.model = projectModel;

    // There has to be a better way to do this.
    // Somehow I want to be wiser...
    var index = 0;
    this.model.projects.forEach(function(element) {

        // We need a link between database objects and the view.
        // If I want to delete something, how will it be done? This feels lame. Can we even get the id of the thing we want to delete?

        // Step one in this direction is to print out what type of thing you've just clicked on and be able to spit out an id.
        // Maybe each column/row could be associated within the controller? When we add a column we could stash the DOM element along with an ID?
        
        // When we remove a column we NEED an id.

        this.addColumn();

        var shouts = element.shouts;

        shouts.forEach(function(element) {
            this.addRow(index);

        }, this);
        index++;

    }, this);     
};

RowColumnController.prototype.update = function() {
    this.view.draw();
};

RowColumnController.prototype.addColumn = function() {
    var column = document.createElement('div');
    this.view.addColumn();
}

RowColumnController.prototype.addRow = function(rowIndex) {
    this.view.addRow(rowIndex);
};

/* View code */
var RowColumnView = function(element) {
    this.element = $(element);

    /* Setup CSS */
    
    this.element.css('width', '100%');
    this.element.css('height', '100%');
    this.element.css('position', 'relative');

    // This will store objects of type Column.
    this.columns = [];
};



RowColumnView.prototype.draw = function() {
    var currentLeft = 0;
    this.columns.forEach(function(element) {
        element.domElement.css('left', currentLeft + 'px');
        currentLeft += element.domElement.width() + 1;

        var currentTop = 0;
        element.rows.forEach(function(row) {
            row.css('top', currentTop + 'px');
            element.domElement.append(row);
            currentTop += row.height() + 1;
        });
        this.element.append(element.domElement);
    }, this);

};

RowColumnView.prototype.addColumn = function() {
    var column = $(document.createElement('div'));

    // Setup CSS
    column.css('width', '100px');
    column.css('height', '100%');
    column.css('background-color', 'gray');
    column.css('position', 'absolute');
    column.css('top', '0');

    var self = this;
    var setters = $(column).draggable(null, null, function() {

        self.columns.forEach(function(element) {
            var element = element.domElement;
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
        });
    });
    
    this.columns.push(new Column(column));
};

RowColumnView.prototype.addRow = function(columnIndex) {
    var column = this.columns[columnIndex];
    
    var row = $(document.createElement('div'));
    row.css('height', '65px');
    row.css('width', '100%');
    row.css('background-color', 'orange');

    var setters = $(row).draggable(null, null, function() {
        var rows = column.rows;

        $(rows).each(function(index, row) {
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
        });
    });
    column.rows.push(row);
};