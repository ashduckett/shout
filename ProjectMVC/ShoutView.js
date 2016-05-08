function ShoutView(model, element) {
    this.model = model;
    this.element = element;
    var _this = this;



    // We have the element on which to draw.

    this.prevButtonClicked = new Event(this);
    this.nextButtonClicked = new Event(this);




/*    this.addButtonClicked = new Event(this);
    this.delButtonClicked = new Event(this);
    this.editButtonClicked = new Event(this);

    this.model.itemAdded.attach(function () {
        _this.rebuildList();
    });

    this.model.itemRemoved.attach(function () {
        _this.rebuildList();
    });

    this.model.itemUpdated.attach(function () {
         _this.rebuildList();
    });

    */
    // We also need to think about the delete button and edit button.
    // The difference here between those and the add button is that there is
    // an edit and delete button on each project, rather than just the one.


   // An event handler for the add project button will need to be attached to the menu thing.
    //this.addItemButton.addEventListener("click", function () {
    //    _this.addButtonClicked.notify();
    //});
}


// When this gets drawn it's could be either showing something or not. It

// Currently drawing a whole new table.
ShoutView.prototype.draw = function () {

    // This seems to be the only way to clear the table
    $('.shout-table').empty();
    var _this = this;


    // Now we need a pair of events for the next and prev buttons.




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

    $.each(_this.model.shouts, function (key, val) {
        var experimentRow = document.createElement('tr');
        var col1 = document.createElement('td');
        var col2 = document.createElement('td');
        var col3 = document.createElement('td');
        var col4 = document.createElement('td');

        moment.locale('en-GB');

        col1.innerHTML = 'Drag Here';
        col2.innerHTML = val.text;
        col3.innerHTML = moment(val.date).format("L");
        col3.style.textAlign = "center";
        col4.innerHTML = moment(val.time).format("h:mm A");
        col4.style.textAlign = "center";

        experimentRow.appendChild(col1);
        experimentRow.appendChild(col2);
        experimentRow.appendChild(col3);
        experimentRow.appendChild(col4);
        shoutTableBody.appendChild(experimentRow);
    });

    $(_this.element).css('width', '50%');
    $(_this.element).css('padding', '10px');

    $(shoutTable).css('border', '1px solid black');
    $(shoutTable).css('width', '100%');

    shoutTable.appendChild(shoutTableBody);
    $(_this.element).append(shoutTable);

    var buttonBar = document.createElement('div');
    buttonBar.classList.add('button-bar');

    _this.previousButton = document.createElement('a');
    _this.previousButton.href = "#";
    _this.previousButton.innerHTML = "Previous";
    _this.nextButton = document.createElement('a');
    _this.nextButton.href = "#";
    _this.nextButton.innerHTML = "Next";


    // Maybe you could just do a notify and pass in the next and prev parameters?
    $(_this.nextButton).attr('data-next', _this.model.nextPage);
    $(_this.previousButton).attr('data-prev', _this.model.prevPage);


    // Maybe these should be put into one page change event? Though you'd still need to know which one it was? Maybe.
    $(_this.nextButton).click(function () {
        _this.nextButtonClicked.notify();
    });

    $(_this.previousButton).click(function () {
        _this.prevButtonClicked.notify();
    });







    buttonBar.appendChild(_this.previousButton);
    buttonBar.appendChild(_this.nextButton);

    $(_this.element).append(buttonBar);
};





ShoutView.prototype.rebuildList = function () {
     //this.draw();


};