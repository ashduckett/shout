/*(function ($) {

    var modalContainer = document.createElement("div");

    var overlay = document.createElement("div");

    $.hideModal = function () {
        $(modalContainer).hide();
        $(overlay).hide();
    };

    function setupModalContainer(clientWidth, clientHeight, title, url, buttons) {
        console.log('at the top, buttons is ' + buttons);
        var modalContainer = document.createElement("div");
        modalContainer.classList.add('modal-container');

        var headerHeight = 50;
        var footerHeight = 50;
        var width = clientWidth;
        var height = clientHeight;
        var headerText = title;

        var totalHeight = headerHeight + footerHeight + height;

        var header = document.createElement("div");

        var title = document.createElement("h4");
        title.innerHTML = headerText;
        title.style.padding = "5px";
        title.style.color = "#000000";
        title.style.lineHeight = headerHeight + "px";
        title.style.verticalAlign = "middle";
        title.style.paddingLeft = "15px";
        //      title.style.display = "inline-block";

        header.style.height = headerHeight + "px";
        header.style.width = width + "px";
        header.style.backgroundColor = "#FFFFFF";
        header.style.borderBottom = "1px solid rgb(229, 229, 229)";
        header.style.borderRadius = "11px 11px 0px 0px";

        header.appendChild(title);

        var body = document.createElement("div");
        body.style.height = height + "px";
        body.style.width = width + "px";








        // Here should be where you create all buttons and get hold of their callbacks to assign them
        // to their callbacks. Or rather...pass in an object in an array called buttons that has the following:
        //  A caption, a callback, a style



        var buttonsToAdd = [];

        for (var i in buttons) {

            var button = document.createElement("a");
            button.innerHTML = buttons[i].caption;
            button.href = "#";
            button.style.border = "1px solid black";
            button.style.padding = "6px 12px";
            button.style.float = "right";
            button.style.display = "inline-block";
            button.style.textDecoration = "none";
            button.style.borderRadius = "4px";
            $(button).addClass('center-v');
            button.style.marginRight = "25px";

            $(button).click(function () {
                buttons[i].callback();
            });

            buttonsToAdd.push(button);
        }





        var footer = document.createElement("div");
        footer.style.height = footerHeight + "px";
        footer.style.width = width + "px";
        footer.style.borderTop = "1px solid rgb(229, 229, 229)";
        footer.style.borderRadius = "0px 0px 11px 11px";

        console.log(buttonsToAdd);


        for (var button in buttonsToAdd) {
            console.log('adding button');
            footer.appendChild(buttonsToAdd[button]);

        }

        modalContainer.style.height = totalHeight + 'px';   // Plus 50 for header
        modalContainer.style.width = width + "px";
        modalContainer.style.backgroundColor = "#FFFFFF";
        modalContainer.style.position = "absolute";
        modalContainer.style.top = "50%";
        modalContainer.style.left = "50%";
        modalContainer.style.borderRadius = "25px";

        var content = document.createElement("div");
        content.classList.add("modal-content");


        body.appendChild(content);

        modalContainer.appendChild(header);
        modalContainer.appendChild(body);
        modalContainer.appendChild(footer);

        // Now set the margin left to minus half the width
        modalContainer.style.marginLeft = -(width / 2) + "px";
        modalContainer.style.marginTop = -(totalHeight / 2) + "px";


        $.get(url, function (data) {
            $('.modal-content').html(data);
            $('.modal-content').height(height);
            $('.modal-content').width(width);
        });


        return modalContainer;
    }


    $.showModal = function (clientHeight, clientWidth, title, url, buttons) {

        overlay.style.backgroundColor = "#000000";
        overlay.style.width = "100%";
        overlay.style.height = "100vh";
        overlay.style.opacity = "0.4";

        var modalContainer = setupModalContainer(clientHeight, clientWidth, title, url, buttons);

        $(modalContainer).hide();
        $(overlay).hide();

        document.body.appendChild(overlay);
        document.body.appendChild(modalContainer);

        $(overlay).fadeIn('fast');
        $(modalContainer).show();



    };
})(jQuery);

*/