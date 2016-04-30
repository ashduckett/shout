function SchedulingProjectView(model, element) {
    this.model = model;
    this.element = element;
    var _this = this;

    this.addButtonClicked = new Event(this);
    this.delButtonClicked = new Event(this);

    
    /*
        Here is where one time setup goes. No adding of items to the list happens here.
    */
    
    this.addItemButton = document.createElement('a');
    this.addItemButton.innerHTML = 'Add Item';
    this.addItemButton.href = '#';

    
    this.model.itemAdded.attach(function () {                          // Attach a listener to the item addede method. This tells the model to rebuild the list when the itemAdded gets notify called on it.
        _this.rebuildList();
        console.log('attached function called');
    });


    $('#new-project').click(function () {
        _this.addButtonClicked.notify();
            // This is working
              //alert('');
            //    _this.model.itemAdded.notify();
    });


   // An event handler for the add project button will need to be attached to the menu thing.
    //this.addItemButton.addEventListener("click", function () {
    //    _this.addButtonClicked.notify();
    //});

}

SchedulingProjectView.prototype.draw = function () {
    var _this = this;
    var list = document.createElement('ul');
    var projects = this.model.getProjects();

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




        $('.delete-side-icon, .edit-side-icon').hover(function () {
            $(this).css('color', 'black');
        }, function () {
            $(this).css('color', 'rgb(102, 102, 102)');
        });

        $(this.element).children('li').click(function () {
            $('ul.listview > li').css('background', 'white');
            $(this).css('background', 'rgb(191, 212, 234)');
            $('ul.listview > li').removeClass('selected');
            $(this).addClass('selected');


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







    };
};

SchedulingProjectView.prototype.rebuildList = function () {
     this.draw();
};