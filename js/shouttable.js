(function ($) {
    // To be called on a table.
    // This possibly shouldn't be a plugin unless I can make it generic.




    $.fn.shoutTable = function (url, obj) {
        var element = null;
        var context = this;

        context.nextButton = null;

        context.loadData = function (data) {
            var shoutTable = document.createElement('table');
            var shoutTableHeader = document.createElement('thead');
            var shoutTableTopRow = document.createElement('tr');

            var shoutTableDragColHeadText = document.createElement('th');
            shoutTableDragColHeadText.classList.add('row-drag');
            shoutTableDragColHeadText.innerHTML = 'Drag Here';

            var shoutTableTextColHeadText = document.createElement('th');
            shoutTableTextColHeadText.classList.add('row-text');
            shoutTableTextColHeadText.innerHTML = 'Text';

            var shoutTableDateColHeadText = document.createElement('th');
            shoutTableDateColHeadText.classList.add('row-date');
            shoutTableDateColHeadText.innerHTML = 'Date';

            var shoutTableTimeColHeadText = document.createElement('th');
            shoutTableTimeColHeadText.classList.add('row-time');
            shoutTableTimeColHeadText.innerHTML = 'Time';

            var shoutTableBody = document.createElement('tbody');
            shoutTableTopRow.appendChild(shoutTableDragColHeadText);
            shoutTableTopRow.appendChild(shoutTableTextColHeadText);
            shoutTableTopRow.appendChild(shoutTableDateColHeadText);
            shoutTableTopRow.appendChild(shoutTableTimeColHeadText);

            shoutTableHeader.appendChild(shoutTableTopRow);
            shoutTable.appendChild(shoutTableHeader);

            // Put the actual data, not the headers, into the table
            $.each(data.shouts, function (key, val) {
                var experimentRow = document.createElement('tr');
                var col1 = document.createElement('td');
                var col2 = document.createElement('td');
                var col3 = document.createElement('td');
                var col4 = document.createElement('td');

                moment.locale('en-GB');

                col1.innerHTML = 'Drag Here';
                col2.innerHTML = val.data.text;

                col3.innerHTML = moment(val.data.date).format("L");
                col3.style.textAlign = "center";

                col4.innerHTML = moment(val.data.time).format("h:mm A");
                col4.style.textAlign = "center";

                experimentRow.appendChild(col1);
                experimentRow.appendChild(col2);
                experimentRow.appendChild(col3);
                experimentRow.appendChild(col4);
                shoutTableBody.appendChild(experimentRow);
            });

            $(this).css('width', '50%');
            $(this).css('padding', '10px');

            $(shoutTable).css('border', '1px solid black');
            $(shoutTable).css('width', '100%');

            shoutTable.appendChild(shoutTableBody);
            $(this).append(shoutTable);



            var buttonBar = document.createElement('div');
            buttonBar.classList.add('button-bar');
            context.previousButton = document.createElement('a');
            context.previousButton.href = "#";
            context.previousButton.innerHTML = "Previous";



            context.nextButton = document.createElement('a');
            context.nextButton.href = "#";
            context.nextButton.innerHTML = "Next";


            buttonBar.appendChild(context.previousButton);
            buttonBar.appendChild(context.nextButton);


            $(this).append(buttonBar);
        }

        // Need to give it a page no. Currently 1, but there might be none.
        // How to obtain 1 or none? Maybe it already does

        $.getJSON(url, obj, function (data) {
            $('.shout-table').find('table').remove();
            $('.shout-table').find('.button-bar').remove();
            context.loadData(data);
            $(context.nextButton).attr('data-next', data.next_page);
            $(context.previousButton).attr('data-prev', data.prev_page);

            $(context.nextButton).click(function () {
                if ($(this).attr('data-next') != 'none') {
                    $('.shout-table').shoutTable(url, { project_id: obj.project_id, page_no: $(this).attr('data-next') });
                }
            });

            $(context.previousButton).click(function () {
                if ($(this).attr('data-next') != 'none') {
                    $('.shout-table').shoutTable(url, { project_id: obj.project_id, page_no: $(this).attr('data-prev') });
                }
            });

        });






        /*
        When we hit the next button, what do we need to do?

        We need to know the project ID
        We need to know what the current page is, or what the page we want next is.

        The page number is obtainable through the UI, though this seems lame.

        POST variable is one option.


        A way better option is to grab the next page and put it into the
        next link's data attribute! When you get to the end, change the 
        value to none! Or something.

        */



    };

})(jQuery);