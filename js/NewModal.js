
function Modal(clientWidth, clientHeight, modalTitle, url) {
    this.clientWidth = clientWidth;
    this.clientHeight = clientHeight;
    this.url = url;
    this.title = modalTitle;

    var context = this;
    
    function createOverlay() {
        var overlay = document.createElement("div");
        overlay.style.backgroundColor = "#000000";
        overlay.style.width = "100%";
        overlay.style.height = "100vh";
        overlay.style.opacity = "0.4";
        overlay.classList.add('modal-overlay');
        console.log('returning overlay');
        return overlay;
    }

    function createModalContainer() {
      
        var modalContainer = document.createElement("div");

        var headerHeight = 50;
        var footerHeight = 50;
        var width = context.clientWidth;
        var height = context.clientHeight;
        var headerText = context.title;
        
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

        var closeButton = document.createElement("a");
        closeButton.innerHTML = "Close";
        closeButton.href = "#";
        closeButton.style.border = "1px solid black";
        closeButton.style.padding = "6px";
        closeButton.style.float = "right";


        //closeButton.style.position = "relative";
        //closeButton.style.top = "50%";
        //closeButton.style.transform = "translateY(-50%)";

        closeButton.style.display = "inline-block";
        closeButton.style.textDecoration = "none";
        closeButton.style.borderRadius = "5px";
        $(closeButton).addClass('center-v');



        closeButton.style.marginRight = "25px";

        $(closeButton).click(function () {
            console.log('clicked close button');
            //    $.hideModal();
            //    $(modalContainer).remove();
            //    $(overlay).remove();

            //     $('document.body').remove(modalContainer);
            //    $('document.body').remove(overlay);

            context.hideModal();
        });

        var footer = document.createElement("div");
        footer.style.height = footerHeight + "px";
        footer.style.width = width + "px";
        footer.style.borderTop = "1px solid rgb(229, 229, 229)";
        footer.style.borderRadius = "0px 0px 11px 11px";
        footer.appendChild(closeButton);




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


    //    $.get('../modal_layouts/add_account.php', function (data) {
    //        $('.modal-content').html(data);
     //       $('.modal-content').height(height);
      //      $('.modal-content').width(width);
       // });

      
        return modalContainer;
    }




    if (typeof this.showModal != "function") {

        Modal.prototype.showModal = function () {
            // Create background overlay
            context.overlay = createOverlay();
            document.body.appendChild(context.overlay);
            
            //$(context.overlay).fadeIn('slow');



            // First create the modal container
            //context.modalContainer = createModalContainer();



            //$(context.modalContainer).hide();
            //$(context.modalContainer).fadeIn('slow');


            //document.body.appendChild(context.modalContainer);
            //$(modalContainer).show();
        };






        Modal.prototype.hideModal = function () {
            document.body.removeChild(context.modalContainer);
        };



    }
    
    
    
    


}

