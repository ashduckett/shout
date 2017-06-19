<?php
    require_once 'header.php';
?>
    <div class="sidebar">
        <ul class="sidebar-listing">
            <li class="sidebar-header">Social Media</li>
            <li class="sidebar-item" id="new-project">New Project</li>
            <li class="sidebar-item disabled">Import...</li>
            <li class="sidebar-header">Project</li>
            <li class="sidebar-item disabled" id="new-shout">Add Item...</li>
            <li class="sidebar-item disabled" id="generate-schedule">Generate Schedule...</li>
            <li class="sidebar-item disabled">Import To...</li>
            <li class="sidebar-item disabled">Export From...</li>
            <li class="sidebar-item disabled">Advanced...</li>
        </ul>
    </div>

    <div class="schedule-workspace">
        <div class="column-container"></div>
    </div>

<?php
    require_once 'footer.php';
?>

<script>

    $(function () {

        /*
    MVC

    How about we have a model. 
    The model contains
        Columns collection. And the columns collection contains the rows.

    The view contains the dom elements.

    The controller feeds the dom with the model.

*/

var Column = function(domElement) {
    
    // Row DOM elements
    this.rows = [];

    // The column DOM element
    this.domElement = domElement;
};

// When in use, this should be the only thing we need.
var RowColumnController = function(element) {
    this.view = new RowColumnView(element);
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


    var canvas = $('.column-container');
    var controller = new RowColumnController(canvas);

    // At the moment you'd have to provide the model. Currently there's no way of linking a db object to the items on the screen either.
    // The model, then, should extend my own object type. This would make sure it included an ID.
    controller.addColumn();
    controller.addColumn();
    controller.addColumn();
    controller.addRow(0);
    controller.addRow(0);
    controller.addRow(2);
    controller.addRow(2);
    controller.addRow(2);
    controller.addRow(2);
    controller.addRow(2);
    controller.addRow(2);
    controller.addRow(2);



    // It would be quite nice if this thing could be built by the model.
    // Pass in an array, build done.

    controller.update();

    // How will I set content?
    // How will I associate data?
    // How will I update data?

    // The model will need projects, which will need ids. They'll also need to store all the data a project has.
    // The model will need shouts, each of which will need ids.
    // Hopefully, this way, we end up with a model that matches the layout of the screen and can then get ids that way.
    






    });


/*
    TODO:
        Can you add a splitter bar to the add accounts section as well?
        Can you make the splitter bar completely generic?
        Can you get rid of the gap showing at the bottom of the screen?
        Can you add restrictions on how far the splitter bars will go in both directions?
        Can you make the splitter bar control look better? Maybe add a grip image?
        Can you make the table responsive based on how must space it has?

        

*/




</script>

