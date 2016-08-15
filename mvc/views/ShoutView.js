function ShoutView(model, element) {
    this.model = model;                 
    this.element = element;
    var _this = this;
    
    this.prevButtonClicked = new Event(this);
    this.nextButtonClicked = new Event(this);
    this.firstPageButtonClicked = new Event(this);
    this.lastPageButtonClicked = new Event(this);
    this.deleteShoutButtonClicked = new Event(this);
    
    // Attach the model's event handlers
    this.model.pageChanged.attach(function () {
        _this.rebuildList();
    });

    this.model.itemRemoved.attach(function () {
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

    var shoutTableTextColHeadText = document.createElement('th');
    shoutTableTextColHeadText.classList.add('row-text');
    shoutTableTextColHeadText.innerHTML = 'Text';

    var shoutTableEditColHeadText = document.createElement('th');
    shoutTableEditColHeadText.classList.add('row-edit');
    shoutTableEditColHeadText.innerHTML = 'Edit';

    var shoutTableDateColHeadText = document.createElement('th');
    shoutTableDateColHeadText.classList.add('row-date');
    shoutTableDateColHeadText.innerHTML = 'Date';

    var shoutTableTimeColHeadText = document.createElement('th');
    shoutTableTimeColHeadText.classList.add('row-time');
    shoutTableTimeColHeadText.innerHTML = 'Time';

    var shoutTableBody = document.createElement('tbody');
    shoutTableTopRow.appendChild(shoutTableTextColHeadText);
    shoutTableTopRow.appendChild(shoutTableEditColHeadText);


    shoutTableTopRow.appendChild(shoutTableDateColHeadText);
    shoutTableTopRow.appendChild(shoutTableTimeColHeadText);
    //shoutTableTopRow.appendChild(shoutTableInvisibleEditCol);

    shoutTableHeader.appendChild(shoutTableTopRow);
    shoutTable.appendChild(shoutTableHeader);


    $(shoutTable).mouseleave(function () {
        $('.button-box').hide();
    });

    $.each(_this.model.shouts, function (key, val) {
        var experimentRow = document.createElement('tr');

        $(experimentRow).attr('data-id', val.id);
        var col2 = document.createElement('td');
        var editCol = document.createElement('td');
        var col3 = document.createElement('td');
        var col4 = document.createElement('td');

        $(experimentRow).mouseover(function () {
            $('.button-box').hide();
            $(this).find('.button-box').show();
        });

        moment.locale('en-GB');

        // col1.innerHTML = 'Drag Here';
        col2.innerHTML = val.text;
        col3.innerHTML = moment(val.date).format("L");
        col3.style.textAlign = "center";
        col4.innerHTML = moment(val.time).format("h:mm A");
        col4.style.textAlign = "center";
        //   col5.style.textAlign = "center";

        // col5.innerHTML = 'Drag Here';

        var buttonBox = document.createElement('div');
        buttonBox.classList.add('button-box');


        var editButton = document.createElement('a');
        //var linkText = document.createTextNode('Edit');
        //editButton.appendChild(linkText);
        editButton.href = '#';
        editButton.classList.add('btn-default');
        editButton.classList.add('btn-hover-shout');
        editButton.classList.add('fa');
        editButton.classList.add('fa-edit');
        editButton.style.float = 'right';
        editButton.style.marginRight = '8px';
        editButton.style.marginLeft = '8px';
        editButton.style.backgroundColor = 'inherit';

        /*editButton.classList.add('center-v');*/
        //editButton.style.textAlign = 'center';
        // editButton.style.borderStyle = 'border-box';
        // editButton.style.width = '50%';


        _this.deleteButton = document.createElement('a');
        _this.deleteButton.href = '#';
        _this.deleteButton.classList.add('btn-default');
        _this.deleteButton.classList.add('btn-hover-shout');
        _this.deleteButton.style.backgroundColor = 'inherit';

        _this.deleteButton.style.marginRight = '8px';
        _this.deleteButton.style.marginLeft = '8px';

        /*deleteButton.classList.add('center-v');*/
        _this.deleteButton.style.float = 'right';
        //deleteButton.style.width = '50%';
        _this.deleteButton.classList.add('fa');
        _this.deleteButton.classList.add('fa-trash');
        _this.deleteButton.classList.add('delete-shout-button');

        $(_this.deleteButton).click(function () {
            // Get the id of the shout you've hit the delete button for
            var id = $(this).parent().parent().parent().data('id');
            var project_id = $('li.selected').attr('data-id');


            _this.deleteShoutButtonClicked.notify({ shout_id: id, project_id: project_id});
        });

        buttonBox.appendChild(_this.deleteButton);
        buttonBox.appendChild(editButton);

        editCol.appendChild(buttonBox);

        experimentRow.appendChild(col2);
        experimentRow.appendChild(editCol);
        experimentRow.appendChild(col3);
        experimentRow.appendChild(col4);

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
    $('.button-box').hide();
};

ShoutView.prototype.rebuildList = function () {
     this.draw();
};



