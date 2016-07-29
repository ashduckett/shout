function ShoutView(model, element) {
    this.model = model;                 
    this.element = element;
    var _this = this;
    
    this.prevButtonClicked = new Event(this);
    this.nextButtonClicked = new Event(this);
    this.firstPageButtonClicked = new Event(this);
    this.lastPageButtonClicked = new Event(this);
    
    // How are you gonna know which project id?

    // Attach the model's event handlers
    this.model.pageChanged.attach(function () {
        _this.rebuildList();
    });


}

// Currently drawing a whole new table.
ShoutView.prototype.draw = function () {

    // This seems to be the only way to clear the table
    $('.shout-table').empty();

    var _this = this;

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

    var shoutTableInvisibleEditCol = document.createElement('th');
    shoutTableInvisibleEditCol.classList.add('row-edit');
    shoutTableInvisibleEditCol.innerHTML = '';



    var shoutTableBody = document.createElement('tbody');
    shoutTableTopRow.appendChild(shoutTableDragColHeadText);
    shoutTableTopRow.appendChild(shoutTableTextColHeadText);
    shoutTableTopRow.appendChild(shoutTableDateColHeadText);
    shoutTableTopRow.appendChild(shoutTableTimeColHeadText);
    shoutTableTopRow.appendChild(shoutTableInvisibleEditCol);

    shoutTableHeader.appendChild(shoutTableTopRow);
    shoutTable.appendChild(shoutTableHeader);

    $.each(_this.model.shouts, function (key, val) {
        var experimentRow = document.createElement('tr');





        var col1 = document.createElement('td');
        var col2 = document.createElement('td');
        var col3 = document.createElement('td');
        var col4 = document.createElement('td');
        var col5 = document.createElement('td');

        col5.classList.add('edit-data');


        // How you gonna use this to get a specific column's cell to show or hide? first try hiding the specific bit of the table?
        $(experimentRow).mouseover(function () {
            // Access a col from above?

            $('.edit-data').find('a').hide();
            $(col5).find('a').show();

            // You want to hide everything that has a class of edit-col
        });




        moment.locale('en-GB');

        col1.innerHTML = 'Drag Here';
        col2.innerHTML = val.text;
        col3.innerHTML = moment(val.date).format("L");
        col3.style.textAlign = "center";
        col4.innerHTML = moment(val.time).format("h:mm A");
        col4.style.textAlign = "center";
        //   col5.style.textAlign = "center";

        // col5.innerHTML = 'Drag Here';

        var editButton = document.createElement('a');
        //var linkText = document.createTextNode('Edit');
        //editButton.appendChild(linkText);
        editButton.href = '#';
        editButton.classList.add('btn-default');
        editButton.classList.add('btn-hover-shout');
        editButton.classList.add('fa');
        editButton.classList.add('fa-edit');
        /*editButton.classList.add('center-v');*/
        editButton.style.textAlign = 'center';
        editButton.style.borderStyle = 'border-box';
        editButton.style.width = '50%';


        var deleteButton = document.createElement('a');
        deleteButton.href = '#';
        deleteButton.classList.add('btn-default');
        deleteButton.classList.add('btn-hover-shout');
        /*deleteButton.classList.add('center-v');*/

        deleteButton.style.width = '50%';
        deleteButton.classList.add('fa');
        deleteButton.classList.add('fa-trash');
        deleteButton.style.textAlign = 'center';




        col5.appendChild(editButton);
        col5.appendChild(deleteButton);
        // $(col5).hide();
        experimentRow.appendChild(col1);
        experimentRow.appendChild(col2);
        experimentRow.appendChild(col3);
        experimentRow.appendChild(col4);
        experimentRow.appendChild(col5);
        shoutTableBody.appendChild(experimentRow);
    });

    $(_this.element).css('width', '70%');


    $(shoutTable).css('border', '1px solid black');
    $(shoutTable).css('width', '100%');

    shoutTable.appendChild(shoutTableBody);
    $(_this.element).append(shoutTable);

    var buttonBar = document.createElement('div');
    buttonBar.classList.add('button-bar');

    // Buttons should probably be objects...
    // first page
    _this.firstPageButton = document.createElement('a');
    _this.firstPageButton.href = "#";
    _this.firstPageButton.id = "prev-shout-page";
    _this.firstPageButton.style.width = "50px";
    _this.firstPageButton.style.textAlign = "center";
    _this.firstPageButton.classList.add('fa');
    _this.firstPageButton.classList.add('fa-fast-backward');
    _this.firstPageButton.classList.add('btn-shout-nav');

    _this.previousButton = document.createElement('a');
    _this.previousButton.href = "#";
    _this.previousButton.id = "prev-shout-page";
    _this.previousButton.style.width = "50px";
    _this.previousButton.style.textAlign = "center";
    _this.previousButton.classList.add('fa');
    _this.previousButton.classList.add('fa-step-backward');
    _this.previousButton.classList.add('btn-shout-nav');

    _this.nextButton = document.createElement('a');
    _this.nextButton.href = "#";
    _this.nextButton.id = "next-shout-page";
    _this.nextButton.style.display = "inline-block";
    _this.nextButton.style.width = "50px";
    _this.nextButton.style.textAlign = "center";
    _this.nextButton.classList.add('btn-primary');
    _this.nextButton.classList.add('btn-shout-nav');
    _this.nextButton.classList.add('fa');
    _this.nextButton.classList.add('fa-step-forward');

    // first page
    _this.lastPageButton = document.createElement('a');
    _this.lastPageButton.href = "#";
    _this.lastPageButton.id = "prev-shout-page";
    _this.lastPageButton.style.width = "50px";
    _this.lastPageButton.style.textAlign = "center";
    _this.lastPageButton.classList.add('fa');
    _this.lastPageButton.classList.add('fa-fast-forward');
    _this.lastPageButton.style.float = "right";
    _this.lastPageButton.classList.add('btn-shout-nav');




    // Notice the order that the logical expressions are in. If there are 0 pages, then the current page comes back as 1. Is that relevant?
    // This is better than it was anyway.
    var lastPageButtonEnabled = !((_this.model.totalNumberOfPages == 0) || (_this.model.currentPage == _this.model.totalNumberOfPages));
    var nextPageButtonEnabled = !((_this.model.totalNumberOfPages == 0) || (_this.model.currentPage == _this.model.totalNumberOfPages));
    var previousPageButtonEnabled = !((_this.model.totalNumberOfPages == 0) || (_this.model.currentPage == 1));
    var firstPageButtonEnabled = !((_this.model.totalNumberOfPages == 0) || (_this.model.currentPage == 1));

    if (lastPageButtonEnabled) {
        $(_this.lastPageButton).addClass('btn-primary');
        $(_this.lastPageButton).removeClass('btn-primary-disabled');
    } else {
        $(_this.lastPageButton).removeClass('btn-primary');
        $(_this.lastPageButton).addClass('btn-primary-disabled');
    }

    if (nextPageButtonEnabled) {
        $(_this.nextButton).addClass('btn-primary');
        $(_this.nextButton).removeClass('btn-primary-disabled');
    } else {
        $(_this.nextButton).removeClass('btn-primary');
        $(_this.nextButton).addClass('btn-primary-disabled');
    }

    if (previousPageButtonEnabled) {
        $(_this.previousButton).addClass('btn-primary');
        $(_this.previousButton).removeClass('btn-primary-disabled');
    } else {
        $(_this.previousButton).removeClass('btn-primary');
        $(_this.previousButton).addClass('btn-primary-disabled');
    }

    if (firstPageButtonEnabled) {
        $(_this.firstPageButton).addClass('btn-primary');
        $(_this.firstPageButton).removeClass('btn-primary-disabled');
    } else {
        $(_this.firstPageButton).removeClass('btn-primary');
        $(_this.firstPageButton).addClass('btn-primary-disabled');
    }

    // Maybe these should be put into one page change event? Though you'd still need to know which one it was? Maybe.
    // Get the id here.
    $(_this.nextButton).click(function () {
        var id = $('li.selected').attr('data-id');
        _this.nextButtonClicked.notify({ id: id });
    });

    $(_this.previousButton).click(function () {
        var id = $('li.selected').attr('data-id');
        _this.prevButtonClicked.notify({ id: id });
    });

    $(_this.firstPageButton).click(function () {
        var id = $('li.selected').attr('data-id');
        _this.firstPageButtonClicked.notify({ id: id });
    });

    $(_this.lastPageButton).click(function () {
        var id = $('li.selected').attr('data-id');
        _this.lastPageButtonClicked.notify({ id: id });
    });

    buttonBar.appendChild(_this.firstPageButton);
    buttonBar.appendChild(_this.previousButton);
    buttonBar.appendChild(_this.lastPageButton);
    buttonBar.appendChild(_this.nextButton);

    $(_this.element).append(buttonBar);

    // Initially hide all the edit buttons...
    $('.edit-data a').hide();
};

ShoutView.prototype.rebuildList = function () {
     this.draw();
};



