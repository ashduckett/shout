jQuery.fn.splitterView = function () {

    // Create the splitter and add it to the page
    var splitter = $(document.createElement('div'));

    splitter.addClass('splitter');

    var left = this.find('.left');
    var right = this.find('.right');


    left.after(splitter);

    var clickX = null;
    var clickY = null;

    var elementBeingDragged = null;
    var parentWidth = right.parent().width();

    // Left is 17...because the content hasn't loaded at that point.
    // When the content is loaded, the size of the left pane changes.
    // At which time, the 17px reported here is invalid.

    // How can you get hold of this 133 before the content's loaded?
    // Maybe I need MVC stuff...

    // I think you need to notify the splitpane control that data has been loaded

    var amountToMinus = $('.splitter').width() + $('.left').width();


    $('.right').css('width', 'calc(100% - ' + amountToMinus + 'px)');


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

                // This value should be the value of the left of the element being dragged

                $('.left').width(position.left - 200);

                var parentWidth = $('.right').parent().width();


                var amountToMinus = $('.splitter').width() + $('.left').width();


                $('.right').css('width', 'calc(100% - ' + amountToMinus + 'px)');
            }
        }
    });







};