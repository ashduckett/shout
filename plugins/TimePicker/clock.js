(function ($) {
    // Clock doesn't use moment. It probably should. It would be very cool to be able to pass in a time with a setTime() function and have it interpret that time.
    $.fn.clock = function (time) {
        var now = new Date();
        var str = "";

        str += '<div class="clock-container">';
        str += '    <div class="hours-control">';
        str += '        <div class="hours-up">';
        str += '            <a href="#"><i class="fa fa-chevron-up"></i></a>';
        str += '        </div>';
        str += '        <div class="hours-container">';
        str += '            <span class="hours"></span>';
        str += '        </div>';
        str += '        <div class="hours-down">';
        str += '            <a href="#"><i class="fa fa-chevron-down"></i></a>';
        str += '        </div>';
        str += '    </div>';


        str += '    <div class="mins-control">';
        str += '        <div class="mins-up">';
        str += '            <a href="#"><i class="fa fa-chevron-up"></i></a>';
        str += '        </div>';
        str += '        <div class="mins-container">';
        str += '            <span class="mins"></span>';
        str += '        </div>';
        str += '        <div class="mins-down">';
        str += '            <a href="#"><i class="fa fa-chevron-down"></i></a>';
        str += '        </div>';
        str += '    </div>';

        str += '    <div class="ampm-control">';
        str += '        <div class="ampm-up">';
        str += '            <a href="#"><i class="fa fa-chevron-up"></i></a>';
        str += '        </div>';
        str += '        <div class="ampm-container">';
        str += '            <span class="ampm">AM</span>';
        str += '        </div>';
        str += '        <div class="ampm-down">';
        str += '            <a href="#"><i class="fa fa-chevron-down"></i></a>';
        str += '        </div>';
        str += '    </div>';
        str += '</div>';



        $('.clock').click(function () {
            var textField = $(this);
            if (!($('.clock-container').is(':visible'))) {
                $('.clock-container').remove();



                $(this).after(str);

                if ($(this).val() === "") {
                    var now = new Date();
                    var hours = now.getHours();
                    var mins = now.getMinutes();

                    if (hours > 12) {
                        $('.ampm').html('PM');
                        hours -= 12;
                    } else {
                        $('.ampm').html('AM');
                    }

                    $('.hours').html(hours);
                    $('.mins').html(mins < 10 ? '0' + mins : mins);
                    $(this).val($('.hours').html() + ':' + $('.mins').html() + ' ' + $('.ampm').html());


                } else {
                    $('.clock-container').css('left', textField.position().left + 'px');
                    var date = new Date();
                    date.setFullYear(0000);
                    date.setDate(1);
                    date.setHours(0);
                    date.setMinutes(0);
                    date.setSeconds(0);

                    var pattern = /\d+/gi
                    var matches = $(this).val().match(pattern);

                    var hours = matches[0];
                    var mins = matches[1];

                    var amPm = /.M/g
                    var matches2 = $(this).val().match(amPm);
                    var afternoon = matches2[0];

                    $('.hours').html(hours);
                    $('.mins').html(mins);
                    $('.ampm').html(afternoon);
                }
            } else {
                $('.clock-container').remove();
            }

            $('.ampm-up, .ampm-down').click(function () {
                $('.ampm').html() === "AM" ? $('.ampm').html('PM') : $('.ampm').html('AM');
                textField.val($('.hours').html() + ':' + $('.mins').html() + ' ' + $('.ampm').html());

            });

            $('.hours-up').click(function () {
                var curHour = parseInt($('.hours').html());
                $('.hours').html(curHour !== 12 ? ++curHour : 1);
                textField.val($('.hours').html() + ':' + $('.mins').html() + ' ' + $('.ampm').html());
            });

            $('.hours-down').click(function () {
                var curHour = parseInt($('.hours').html());
                $('.hours').html(curHour !== 1 ? --curHour : 12);
                textField.val($('.hours').html() + ':' + $('.mins').html() + ' ' + $('.ampm').html());
            });

            $('.mins-up').click(function () {
                var curMin = parseInt($('.mins').html());
                curMin = curMin !== 59 ? ++curMin : 0;
                $('.mins').html(curMin < 10 ? '0' + curMin : curMin);
                textField.val($('.hours').html() + ':' + $('.mins').html() + ' ' + $('.ampm').html());
            });

            $('.mins-down').click(function () {
                var curMin = parseInt($('.mins').html());
                curMin = curMin !== 0 ? --curMin : 59;
                $('.mins').html(curMin < 10 ? '0' + curMin : curMin);
                textField.val($('.hours').html() + ':' + $('.mins').html() + ' ' + $('.ampm').html());
            });


            $(document).mouseup(function (e) {
                var container = $('.clock-container');

                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    container.hide();
                }
            });












        });
    };
})(jQuery);