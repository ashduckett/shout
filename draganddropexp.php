
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title></title>
        <script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>
   
        
        
            <style>
                
                .draggable {
                    background-color: blue;
                    height: 50px;
                    width: 200px;
                    position: absolute;
                    }
                
                
            </style>
        
        
        
         </head>
    <body>

        


       <div class="draggable">
       
       </div>

        <div class="draggable drag-target">
       
       </div>




        <script>

            $(document).ready(function () {

                var clickX = null;
                var clickY = null;
                var mouseDown = null;
                var elementBeingDragged = null;

                $('.draggable').mousedown(function (event) {
                    var parentOffset = $(this).offset();
                    clickX = event.pageX - parentOffset.left;
                    clickY = event.pageY - parentOffset.top;
                    mouseDown = true;
                    elementBeingDragged = $(this);
                });

                $('.draggable').mouseup(function (event) {
                    mouseDown = false;
                    elementBeingDragged = null;
                });

                $('html').mousemove(function (event) {

                    if (elementBeingDragged != null) {
                        $(elementBeingDragged).css({ top: event.pageY - clickY,
                            left: event.pageX - clickX
                        });
                    }
                });

                $('.draggable').mousemove(function (event) {
                    if (mouseDown == true && clickY != null) {
                        $(elementBeingDragged).css({ top: event.pageY - clickY,
                            left: event.pageX - clickX
                        });
                    }
                    event.stopPropagation();
                });

            });

        </script>


        
    </body>
</html>
