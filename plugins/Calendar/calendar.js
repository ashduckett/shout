(function ($) {
    $.fn.calendar = function () {
        var globalTextField = null;
        var calString = "";
        calString += '<div class="date-picker">';
        calString += '<div class="month-controls">';
        calString += '<a class="month-changer minus-month" href="#" style="float: left;"><</a>';
        calString += '<span class="month"></span>';
        calString += '<a class="month-changer plus-month" href="#" style="float: right;">></a>';
        calString += '</div>';
        calString += '<table class="calendar-table">';
        calString += '</table>';
        calString += '</div>';
        
        var currentMomentDate = new moment();
        var locale = window.navigator.userLanguage || window.navigator.language;

        // Get hold of user's browser locale       
        moment.locale(locale);
        
        function drawCalendar() {

            if (!($(globalTextField).val() === "")) {
                // This will be the case if it hasn't been clicked
                currentMomentDate.locale(locale);
                currentMomentDate = moment(globalTextField.val(), "L");
            } else {
                currentMomentDate = new moment();
            }

            var today = currentMomentDate.toDate();

            // Get hold of the number of days in the month
            var daysInMonth = new Date(today.getYear(), today.getMonth() + 1, 0).getDate();
            today.setDate(1);      // Set to the first day of the month so we can work out which day of the week we start on.

            var experimentalRow = "<tr>";
            var dayNo = 1;

            // Draw the first row of days, excluding any days of the month not part of the first full week.
            for (var i = 0; i < 7; i++) {
                if (i >= today.getDay()) {
                    experimentalRow += '<td class="dayNo" data-day="' + dayNo + '">' + dayNo + '</td>';
                    dayNo++;
                } else {
                    experimentalRow += '<td></td>';
                }
            }

            experimentalRow += '</tr>';

            var colNo = 0;

            experimentalRow += '<tr>';

            for (var x = dayNo; x <= daysInMonth; x++) {
                experimentalRow += '<td class="dayNo" data-day="' + dayNo + '">' + dayNo + '</td>';
                dayNo++;
                colNo++;

                if (colNo === 7) {
                    experimentalRow += '<tr></tr>';
                    colNo = 0;
                }
            }

            experimentalRow += '</tr>';

            strDays = '<tr>';
            strDays += '<td>Su</td>';
            strDays += '<td>Mo</td>';
            strDays += '<td>Tu</td>';
            strDays += '<td>We</td>';
            strDays += '<td>Th</td>';
            strDays += '<td>Fr</td>';
            strDays += '<td>Sa</td>';
            strDays += '</tr>';


            $('.month').text(currentMomentDate.format("MMMM") + ' ' + currentMomentDate.format("YYYY"));
            $('div.date-picker > table.calendar-table tr').remove();
            $('div.date-picker > table.calendar-table').append(strDays);
            $('div.date-picker > table.calendar-table').append(experimentalRow);
        }

        function setupDayClickEvents(cal) {
            // When one of the day squares is clicked...
            $('.dayNo').click(function () {
                var day = $(this).data('day');                  // Get hold of the day value

                currentMomentDate.locale(locale);               // Set locale of currentMomentDate
                currentMomentDate.date(day);                    // Set the day on currentMomentDate
                $(cal).val(currentMomentDate.format("L"));      // Set the value of the text field
            });
        }

        $('.calendar').click(function () {

            var cal = $(this);
            globalTextField = $(this);
            if (!($('.date-picker').is(':visible'))) {
                $('.date-picker').remove();
                $(cal).after(calString);
                $('.date-picker').css('left', cal.position().left + 'px');
                drawCalendar();

                $('.plus-month').click(function () {
                    currentMomentDate.add(1, 'months');
                    currentMomentDate.locale(locale);
                    $(cal).val(currentMomentDate.format("L"));
                    drawCalendar();
                    setupDayClickEvents(cal);

                });

                $('.minus-month').click(function () {
                    currentMomentDate.locale(locale);
                    currentMomentDate.add(-1, 'months');
                    $(cal).val(currentMomentDate.format("L"));
                    drawCalendar();
                    setupDayClickEvents(cal);
                });

                setupDayClickEvents(cal);

                $(document).mouseup(function (e) {
                    var container = $('.date-picker');

                    if (!container.is(e.target) && container.has(e.target).length === 0) {
                        container.hide();
                    }
                });
            }
        });


    };
})(jQuery);