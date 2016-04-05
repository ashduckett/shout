(function ($) {
    $.showModal = function (width, height, url, extraCallback) {
        var modalStr = "";
        modalStr += '<div class="background"></div>';
        modalStr += '<div class="content"></div>';

        $('body').prepend(modalStr);


        $('.content').width(width);
        $('.content').height(height);

        var halfHeight = height / 2;
        var halfWidth = width / 2;


        $('.content').load(url, function () {
            $('.background').fadeIn('slow');

            // Set the top of the modal to be half a screen's worth of height away.
            $('.content').css('top', '-50%');
            $('.content').css('left', '50%');
            $('.content').css('margin-left', '-' + halfWidth + 'px');
            $('.content').css('display', 'block');

            $('.content').animate({
                'top': '50%',
                'margin-top': '-' + halfHeight + 'px'
            }, 600);



            // Maybe instead of extraCallback, you should just include the stuff in the ajax called html.
            // The buttons could be called anything since you provide them in your html ajaxed.
            extraCallback();
        });
    };

    $.hideModal = function () {
        $('.background').fadeOut('slow');

        $('.content').animate({
            'top': '-50%'
        }, 600);

        $('body > .background').remove();
    };
})(jQuery);