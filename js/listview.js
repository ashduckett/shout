(function ($) {


    // MVC will mean that you don't need to pass in these callbacks. I think.





    $.fn.listView = function (data, deleteCallback, editCallback, projectClickCallback) {
        //var listItems = [];
        var element = null;
        var context = this;


        /*$.each(data, function (key, val) {
            var element = document.createElement('li');
            element.setAttribute('data-id', val.data.id);



            var listViewHeader = document.createElement('div');
            listViewHeader.setAttribute('class', 'listview-header');
            listViewHeader.innerHTML = val.data.name;

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
            //icon.style.backgroundColor = 'red';
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
            //     deleteSpan.setAttribute('class', 'delete-side-icon');
            icon.appendChild(deleteSpan);


            deleteSpan.style.marginLeft = '5px';


            element.appendChild(icon);
            $(context).append($(element));





        });*/


        $('.delete-side-icon').click(function (event) {

               var id = this.parentElement.parentElement.getAttribute('data-id');

            deleteCallback(id);


            event.stopPropagation();
        });



        $('.edit-side-icon').click(function (event) {

            // Easy to get the modal to appear
            // Also easy to get it to delete by hitting a backend
            // script BUT
            // This isn't particularly reusable

            // For now you could pass in a callback for
            // edit and delete and the callbacks could
            // take an id?

            // The callback for delete would create a modal,
            // ask the user if they're sure and then hit the
            // script to perform the delete based on the id passed
            // in from here

            var id = this.parentElement.parentElement.getAttribute('data-id');

            editCallback(id);


            event.stopPropagation();
        });


        $('.listview li').click(function () {
            var id = $(this).data('id');
            projectClickCallback(id);
        });
        
        $('.delete-side-icon, .edit-side-icon').hover(function () {
            $(this).css('color', 'black');
        }, function () {
            $(this).css('color', 'rgb(102, 102, 102)');
        });

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

})(jQuery);