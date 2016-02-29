<?php

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title></title>

        <style>
            p {
            /*    background-color: red; */
                width: 100%;
                padding-left: 7px;
            }
            
            label {
                width: 20%;
        
                display: inline-block;
            }
            
            .container {
                width: 940px;
                margin: auto;
              
            }
     
            
            form {
 
                width: 40%;
             
       
                margin: auto;
                   margin-top: 400px;
            }
            
 
            
            .glowing-border {
    border: 2px solid #dadada;
    border-radius: 7px;
    height: 20px;
}

.glowing-border:focus { 
    outline: none;
    border-color: #9ecaed;
    box-shadow: 0 0 10px #9ecaed;
}
        </style>

    </head>
    <body>
        <!-- Find out how to lay out forms properly -->
        
        <div class="container">

        
      
            
            <form action="handle_login.php" method="post">
                <p>
                    <label>Email</label>
                    <input type="text" name="email" class="glowing-border">
                </p>
                <p>
                    <label>Password</label>
                    <input type="password" name="password" class="glowing-border">
                </p>
                <p>
                    <input type="submit" name="submit">
                </p>
                <p>
                    Don't have an account? <a href="registration_page.php">Register here</a>
                </p>
            </form>

    
        
      
            </div>



    </body>
</html>
