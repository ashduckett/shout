jQuery.fn.splitterView = function () {

    // Create the splitter and add it to the page
    var splitter = document.createElement('div');
    $(splitter).addClass('splitter');
    this.find('.left').after(splitter);

    var clickX = null;
    var clickY = null;

    var elementBeingDragged = null;
    var parentWidth = $('.right').parent().width();
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