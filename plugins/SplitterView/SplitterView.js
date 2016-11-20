jQuery.fn.splitterView = function () {
    var context = this;
    // Create the splitter and add it to the page
    var splitter = $(document.createElement('div'));

    // the left pane of the right splitpane has no width.

    // Where should spl2 get its width from? Its content? Somewhere it's getting set to 200.


    splitter.addClass('splitter');

    console.log('just added the splitter class to something');

    var left = this.children('.left');
    var right = this.children('.right');


    left.after(splitter);

    var clickX = null;
    var clickY = null;

    var elementBeingDragged = null;
    var amountToMinus = splitter.width() + left.width();
    right.css('width', 'calc(100% - ' + amountToMinus + 'px)');


    $(splitter).mousedown(function (event) {
        var parentOffset = $(this).offset();
        clickX = event.pageX - parentOffset.left;
        elementBeingDragged = event.target;

        // Escape default mouse down behaviour
        return false;
    });

    $('html').mouseup(function (event) {
        elementBeingDragged = null;
    });

    $('html').mousemove(function (event) {
        if (event.pageX - clickX > 5 && event.pageX - clickX <= 1000) {
            if (elementBeingDragged != null) {

                elementBeingDragged.style.left = (event.pageX - clickX) + 'px';

                var position = $(elementBeingDragged).position();

                left.width(position.left - this.offset().left);

                var amountToMinus = splitter.width() + left.width();
                right.css('width', 'calc(100% - ' + amountToMinus + 'px)');
            }
        }
    } .bind(this));







};