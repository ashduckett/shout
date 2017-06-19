var Column = function(element, rowMethods) {
    this.domElement = element;
    this.rowMethods = rowMethods;
};


(function($) {
    $.fn.DraggableColsAndRows = function () {
        // Get hold of container height
        var desiredColHeight = this.height();
        var desiredColWidth = 200;
        var desiredTop = this.position().top;

        // Get hold of each column
        var columns = $(this).children('.inner-column');

        //  How about a column object that holds both the domElement as well as the row methods.

        // We want a dictionary
        //var columnsArray = new Array();
        var columnsArray = {};

        var currentLeft = 0;
        var context = this;

        var methods = {
            addColumn: function() {
                col = $(document.createElement('div'));
                col.width(desiredColWidth);
                col.height(desiredColHeight);
                col.offset({left: currentLeft, top: desiredTop});
                col.css('box-sizing', 'border-box');
                col.css('height', '100%');
                col.css('border', '10px solid darkgray');
                col.css('background-color', 'lightgray');
                col.css('float', 'left');
               // col.css('position', 'absolute');
                col.addClass('inner-column');

                $(context).append(col);
                
                var setters = $(col).draggable(null, null, function() {
                    

                    // Get hold of each column
                    var columns = $('.column-container').children('.inner-column');

                    $(columns).each(function(index, col) {
                        
                        if(!$(col).hasClass('dragging')) {
                            if(event.pageX > $(col).offset().left && event.pageX < $(col).offset().left + $(col).width()) {
                                // If we are inside one of the columns not being dragged, move the column
                                // we're dragging over to the returnPosition, and update the returnPosition
                                // to be that of the column that just moved

                                // Get the starting position of the column we're dragging over
                                var tempReturn = $(col).position();

                                var returnPosition = setters.getReturnPosition();

                                $(col).css({left: returnPosition.left, top: returnPosition.top});
                                returnPosition = tempReturn;
                                setters.setReturnPosition(tempReturn.top, tempReturn.left);
                                return false;
                            }


                        }
                    });
                });
                currentLeft += desiredColWidth + 1;
                columnsArray[this.columnCount()] = new Column(col, null);
                return col;
            },
            columnCount: function() {
                return Object.keys(columnsArray).length;
            },
            addRowToColumn: function(colIndex, content) {
                var col = columnsArray[colIndex];

                if(columnsArray[colIndex].rowMethods == undefined) {
                    columnsArray[colIndex].rowMethods = col.domElement.DraggableRow();
                }
                columnsArray[colIndex].rowMethods.addRow(content);
            }
        };
        return methods;
    }
}(jQuery));