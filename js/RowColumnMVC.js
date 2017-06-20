var Column = function(domElement) {
    
    // Row DOM elements
    this.rows = [];

    // The column DOM element
    this.domElement = domElement;
};

// When in use, this should be the only thing we need.
var RowColumnController = function(element, projectModel) {
    // Here we should build up the model.
    // Once all this code has run, the update method is called from outside in shcedule.php.js

    // Keep model
    this.model = projectModel;

    // Create an instance of the view, telling it the model.
    this.view = new RowColumnView(element, projectModel);
    
    
    // In theory, now, the view can be built using the data it has of the model.

    // There has to be a better way to do this.
    // Somehow I want to be wiser...
    var index = 0;
    this.model.projects.forEach(function(element) {

        

       // this.addColumn();

        var shouts = element.shouts;

        shouts.forEach(function(element) {
        //    this.addRow(index);

        }, this);
        index++;

    }, this);     
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

/* View code */
var RowColumnView = function(element, model) {
    this.element = $(element);
    this.model = model;
    /* Setup CSS */
    
    this.element.css('width', '100%');
    this.element.css('height', '100%');
    this.element.css('position', 'relative');

    // This will store objects of type Column.
    // Try to get rid of this in favour of the one below.
    this.columns = [];

    this.columnsByProjectId = [];
};

// You know you need to store the dom element.
// But this should live in the view.
// It should also be indexed by the project id.

RowColumnView.prototype.draw = function() {
    // Using only the model, we should be able to construct the view.

    var elementToDrawTo = this.element;
    
    var currentLeft = 0;
    var self = this;

    var currentIndex = 0;
    var currentTop = 0;

    this.model.projects.forEach(function(element) {
        this.addColumn(currentLeft);
        currentLeft += 100 + 1;

        element.shouts.forEach(function() {
            
            this.addRow(currentIndex, currentTop);
            currentTop += 65 + 1;
        }, this);
        currentTop = 0;
        currentIndex++;



    }, this);




    /*



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
*/
};

// This is called once, via RowColumnController.view when it loads.
// It is actually only adding a single column
// It creates the column, and then it adds it to the column array.
// So you can't just run it and have all your columns.
// Since it has to be called for each column, it kind of makes sense to leave it in
// its own method.
// The draw method, however, should be the only thing that calls it.
RowColumnView.prototype.addColumn = function(left) {
    var column = $(document.createElement('div'));

    // Setup CSS
    column.css('width', '100px');
    column.css('height', '100%');
    column.css('background-color', 'gray');
    column.css('position', 'absolute');
    column.css('top', '0');
    column.css('left', left);

    // we need to set the left on each iteration and we can't do that when adding a single column.
    // Need a new plan. I still like the idea of maybe getColumnElement(left) 

    var self = this;

    // At which point is self.columns populated?
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
    console.log(column);
   this.element.append(column);

    // Maybe you don't need to store an entire Column object. We already have the model?
    // If you took it out, though, you couldn't iterate over for when you want to do swapsies.
    this.columns.push(new Column(column));
};

RowColumnView.prototype.addRow = function(columnIndex, top) {
    
    // This will still work. I wanted them stored by id!
    var column = this.columns[columnIndex];
    
    var row = $(document.createElement('div'));
    row.css('height', '65px');
    row.css('width', '100%');
    row.css('background-color', 'orange');
    row.css('z-index', '999999999999999999');
    console.log(top);
    row.css('top', top + 'px');


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
    $(column.domElement).append(row);
    column.rows.push(row);
};