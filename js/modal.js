
function Modal(clientWidth, clientHeight, modalTitle, url) {
    this.clientWidth = clientWidth;
    this.clientHeight = clientHeight;
    this.url = url;
    this.title = modalTitle;
    this.footer = null;
    this.overlay = 10;
    context = this;

    if (typeof this.createModalContainer != "function") {

        Modal.prototype.createModalContainer = function () {

            var modalContainer = document.createElement("div");
            var headerHeight = 50;
            var footerHeight = 50;
            var width = this.clientWidth;
            var height = this.clientHeight;
            var headerText = this.title;
            var totalHeight = headerHeight + footerHeight + height;
            var header = document.createElement("div");
            var title = document.createElement("h4");

            title.innerHTML = headerText;
            title.style.padding = "5px";
            title.style.color = "#000000";
            title.style.lineHeight = headerHeight + "px";
            title.style.verticalAlign = "middle";
            title.style.paddingLeft = "15px";

            header.style.height = headerHeight + "px";
            header.style.width = width + "px";
            header.style.backgroundColor = "#FFFFFF";
            header.style.borderBottom = "1px solid rgb(229, 229, 229)";
            header.style.borderRadius = "11px 11px 0px 0px";

            header.appendChild(title);

            var body = document.createElement("div");

            body.style.height = height + "px";
            body.style.width = width + "px";

            this.footer = document.createElement("div");
            this.footer.style.height = footerHeight + "px";
            this.footer.style.width = width + "px";
            this.footer.style.borderTop = "1px solid rgb(229, 229, 229)";

            this.footer.style.borderRadius = "0px 0px 11px 11px";

            this.footer.classList.add('modal-footer');

            modalContainer.style.height = totalHeight + 'px';   // Plus 50 for header
            modalContainer.style.width = width + "px";
            modalContainer.style.backgroundColor = "#FFFFFF";
            modalContainer.style.position = "absolute";
            modalContainer.style.top = "50%";
            modalContainer.style.left = "50%";
            modalContainer.style.borderRadius = "11px";
            modalContainer.style.boxShadow = "0 8px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)";
            modalContainer.style.boxSizing = "border-box";


            var content = document.createElement("div");
            content.style.width = "100%";
            content.classList.add("modal-content");
            content.style.boxSizing = "border-box";

            content.style.padding = "20px";


            body.appendChild(content);

            modalContainer.appendChild(header);
            modalContainer.appendChild(body);
            modalContainer.appendChild(this.footer);

            // Now set the margin left to minus half the width
            modalContainer.style.marginLeft = -(width / 2) + "px";
            modalContainer.style.marginTop = -(totalHeight / 2) + "px";

            modalContainer.style.display = 'none';

            $.get(context.url, function (data) {
                $('.modal-content').html(data);
                $('.modal-content').height(height);
                //$('.modal-content').width(width);
            });

            return modalContainer;
        }

        Modal.prototype.hideModal = function () {
            $(context.overlay).fadeOut('slow', function () {
                document.body.removeChild(context.overlay);
            });

            $(this.modalContainer).fadeOut('slow', function () {
                document.body.removeChild(context.modalContainer);
            });
        };


        Modal.prototype.createOverlay = function () {

            var overlay = document.createElement("div");
            overlay.style.backgroundColor = "#000000";
            overlay.style.width = "100%";
            overlay.style.height = "100vh";
            overlay.style.opacity = "0.4";
            overlay.classList.add('modal-overlay');
            overlay.style.position = "absolute";
            overlay.style.top = 0;
            overlay.style.display = 'none';

            return overlay;
        };

        Modal.prototype.addButton = function (caption, style, callback) {
            var button = document.createElement("a");
            button.innerHTML = caption;
            button.href = "#";
            button.style.border = "1px solid black";
            button.style.padding = "6px";
            button.style.float = "right";
            button.style.display = "inline-block";
            button.style.textDecoration = "none";
            button.style.borderRadius = "5px";
            $(button).addClass('center-v');
            button.style.marginRight = "25px";




            // Primary

            switch (style) {
                case 'primary':
                    button.style.backgroundColor = "#337ab7";
                    button.style.borderColor = "#2e6da4";
                    button.style.color = "#fff";
                    break;
                case 'default':
                    button.style.backgroundColor = "#fff";
                    button.style.borderColor = "#ccc";
                    button.style.color = "#333";
                    break;

                default:
                    button.style.backgroundColor = "#fff";
                    button.style.borderColor = "#ccc";
                    button.style.color = "#333";
                    break;
            }






            $(button).click(function () {
                callback();
            });

            this.footer.appendChild(button);
        };

        Modal.prototype.showModal = function () {

            // Append currently invisible overlay
            document.body.appendChild(this.overlay);

            // Bring it into view slowly
            $(this.overlay).fadeIn('slow');

            // Append the currently invisible modal
            document.body.appendChild(this.modalContainer);

            // Bring this, too, in slowly
            $(this.modalContainer).fadeIn('slow');
        };
    }
    this.overlay = this.createOverlay();
    this.modalContainer = this.createModalContainer();
}

