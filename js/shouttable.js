(function ($) {
    // To be called on a table. A
    $.fn.shoutTable = function (data) {
        var element = null;
        var context = this;

        // Build the table

        var shoutTable = document.createElement('table');
        var shoutTableHeader = document.createElement('thead');
        var shoutTableTopRow = document.createElement('tr');

        var shoutTableDragColHeadText = document.createElement('th');
        shoutTableDragColHeadText.innerHTML = 'Drag Here';

        var shoutTableTextColHeadText = document.createElement('th');
        shoutTableTextColHeadText.innerHTML = 'Text';

        var shoutTableDateColHeadText = document.createElement('th');
        shoutTableDateColHeadText.innerHTML = 'Date';

        var shoutTableTimeColHeadText = document.createElement('th');
        shoutTableTimeColHeadText.innerHTML = 'Time';

        var shoutTableBody = document.createElement('tbody');
        shoutTableTopRow.appendChild(shoutTableDragColHeadText);
        shoutTableTopRow.appendChild(shoutTableTextColHeadText);
        shoutTableTopRow.appendChild(shoutTableDateColHeadText);
        shoutTableTopRow.appendChild(shoutTableTimeColHeadText);

        shoutTableHeader.appendChild(shoutTableTopRow);
        shoutTable.appendChild(shoutTableHeader);

        $.each(data, function (key, val) {
            var experimentRow = document.createElement('tr');
            var col1 = document.createElement('td');
            var col2 = document.createElement('td');
            var col3 = document.createElement('td');
            var col4 = document.createElement('td');

            moment.locale('en-GB');

            col1.innerHTML = 'Drag Here';
            col2.innerHTML = val.data.text;
            col3.innerHTML = moment(val.data.date).format("L");
            col4.innerHTML = moment(val.data.time).format("h:mm A");

            experimentRow.appendChild(col1);
            experimentRow.appendChild(col2);
            experimentRow.appendChild(col3);
            experimentRow.appendChild(col4);
            shoutTableBody.appendChild(experimentRow);
        });










        shoutTable.appendChild(shoutTableBody);
        $(this).append(shoutTable);
    };

})(jQuery);