(function ($) {
    $.fn.listView = function (jsonData) {
        alert('instance method called');
   /*     var objects = $.parseJSON(jsonData);
        var listItems = [];

        $.each(objects, function (index, item) {
            listString = '';
            listString += '<li data-id="' + item.id + '">'
            listString += '<div class="listview-header">' + item.titleField + '</div>';
            listString += '<div class="listview-subheader">Next Shout: N/A</div>';
            listString += '<div class="listview-text">N/A</div>';
            listString += '</li>';

            listItems.push(listString);
        });

        $(this).append(listItems);
    */
        $(this).children('li').click(function () {
            $('ul.listview > li').css('background', 'white');
            $(this).css('background', 'rgb(191, 212, 234)');
            $('ul.listview > li').removeClass('selected');
            $(this).addClass('selected');
        });

        $(this).children('li').hover(function () {
            if ($(this).hasClass('selected')) {
                $(this).css('background', 'rgb(191, 212, 234)');
            } else {
                $(this).css('background', 'rgb(229, 238, 248)');
            }

        }, function () {
            if ($(this).hasClass('selected')) {
                $(this).css('background', 'rgb(213, 229, 242)');
            } else {
                $(this).css('background', 'white');
            }
        });

    

    };

})(jQuery);