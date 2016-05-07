function SchedulingProjectView(model, element) {
    this.model = model;
    this.element = element;
    var _this = this;

    this.addButtonClicked = new Event(this);
    this.delButtonClicked = new Event(this);
    this.editButtonClicked = new Event(this);
    this.projectItemClicked = new Event(this);

    this.model.itemAdded.attach(function () {
        _this.rebuildList();
    });

    this.model.itemRemoved.attach(function () {
        _this.rebuildList();
    });

    this.model.itemUpdated.attach(function () {
         _this.rebuildList();
    });



    $('#new-project').click(function () {
        _this.addButtonClicked.notify();
    });


    // We also need to think about the delete button and edit button.
    // The difference here between those and the add button is that there is
    // an edit and delete button on each project, rather than just the one.


   // An event handler for the add project button will need to be attached to the menu thing.
    //this.addItemButton.addEventListener("click", function () {
    //    _this.addButtonClicked.notify();
    //});
}

SchedulingProjectView.prototype.draw = function () {

    // shout-table




    var _this = this;
    var list = document.createElement('ul');
    var projects = this.model.getProjects();

    _this.element.innerHTML = "";

    for (var i in projects) {

        var element = document.createElement('li');
        element.setAttribute('data-id', this.model.getProjectById(i).id);

        var listViewHeader = document.createElement('div');
        listViewHeader.setAttribute('class', 'listview-header');
        listViewHeader.innerHTML = this.model.getProjectById(i).name;

        var listViewSubHeader = document.createElement('div');
        listViewSubHeader.setAttribute('class', 'listview-subheader');
        listViewSubHeader.innerHTML = 'Next Shout: N/A';

        var listViewText = document.createElement('div');
        listViewText.setAttribute('class', 'listview-text');
        listViewText.innerHTML = 'N/A';

        element.appendChild(listViewHeader);
        element.appendChild(listViewSubHeader);
        element.appendChild(listViewText);
        element.style.position = 'relative';

        var icon = document.createElement('div');
        icon.classList.add('icon-area');
        icon.style.height = '15px';
        icon.style.width = '40px';
        icon.style.float = 'right';
        icon.style.position = 'absolute';
        icon.style.top = '0px';
        icon.style.right = '0px';
        icon.style.display = 'none';
        icon.style.padding = '4px';

        var editSpan = document.createElement('span');
        editSpan.style.color = 'rgb(102, 102, 102)';
        editSpan.setAttribute('class', 'fa fa-pencil-square-o edit-side-icon');
        icon.appendChild(editSpan);

        var deleteSpan = document.createElement('span');
        deleteSpan.style.color = 'rgb(102, 102, 102)';
        deleteSpan.setAttribute('class', 'fa fa-trash-o delete-side-icon');
        icon.appendChild(deleteSpan);
        deleteSpan.style.marginLeft = '5px';
        element.appendChild(icon);

        $(this.element).append($(element));
    };

    $('.delete-side-icon, .edit-side-icon').hover(function () {
        $(this).css('color', 'black');
    }, function () {
        $(this).css('color', 'rgb(102, 102, 102)');
    });
    
    $(this.element).children('li').hover(function () {

        if ($(this).hasClass('selected')) {
            $(this).css('background', 'rgb(191, 212, 234)');
        } else {
            $(this).css('background', 'rgb(229, 238, 248)');
        }

        $(this).children('.icon-area').css('display', 'block');
    }, function () {
        if ($(this).hasClass('selected')) {
            $(this).css('background', 'rgb(213, 229, 242)');
        } else {
            $(this).css('background', 'white');
        }
        $(this).children('.icon-area').css('display', 'none');
    });
    
    $(this.element).children('li').click(function () {
        alert('fired!');

        $('ul.listview > li').css('background', 'white');
        $(this).css('background', 'rgb(191, 212, 234)');
        $('ul.listview > li').removeClass('selected');
        $(this).addClass('selected');

        // Get hold of the id
        var id = $(this).data('id');
        _this.projectItemClicked.notify({ id: id });
    });



    $('.delete-side-icon').click(function (event) {
        var id = this.parentElement.parentElement.getAttribute('data-id');

        // deleteCallback(id);

        _this.delButtonClicked.notify({ id: id });
        event.stopPropagation();
    });



    $('.edit-side-icon').click(function (event) {

        var id = this.parentElement.parentElement.getAttribute('data-id');

        // Now you can get hold of the project from the current list
        var projectToUpdate = _this.model.getProjectById(id);

        // Update the project with a new name
        _this.editButtonClicked.notify({ project: projectToUpdate });

        event.stopPropagation();
    });

};

SchedulingProjectView.prototype.rebuildList = function () {
     this.draw();
};