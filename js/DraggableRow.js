(function($) {
    $.fn.DraggableRow = function () {
        // Get hold of container height
        var desiredRowHeight = 100;
        var desiredRowWidth = this.width();
        var desiredTop = this.offset().top;
        var desiredLeft = this.offset().left + 10;

        var currentTop = this.offset().top;
        console.log(currentTop);
        
        var context = this;


        var methods = {
            addRow: function(row) {
                row = $(row);
                row.height(desiredRowHeight);
                row.css('background-color', 'lightgray');
                row.css('float', 'left');
                row.css('position', 'absolute');
                row.addClass('inner-row');
                $(context).append(row);
 
                row.css('box-sizing', 'border-box');
                row.width(desiredRowWidth);
                row.offset({left: desiredLeft, top: currentTop});
                // This needs to happen after the parent has been set so it knows
                // what it's dealing with.
                row.css('border', '10px solid darkgray');
                
                var setters = $(row).draggable(null, null, function() {
                    
                    // Get hold of each row
                    var rows = $(context).children('.inner-row');

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

                // What should this be?
                currentTop += desiredRowHeight + 1;
            }
        };
        return methods;
    }
}(jQuery));