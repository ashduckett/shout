<?php
    // This will be what's presented to the user when they register.
    // I wonder if I could handle this all in one file rather than posting to register.php?


    // First name
// Second name
// Business address
// Email
// Password
// cust_id should be added for you

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title></title>
    </head>
    <body>
        <h1>Enter ya details and get registered...</h1>
        <form action="register.php" method="post">
            <input type="text" placeholder="organisationname" name="orgname">
            <input type="text" placeholder="firstname" name="firstname">
            <input type="text" placeholder="surname" name="secondname">
            <input type="text" placeholder="email" name="email">
            <input type="text" placeholder="password" name="password">
            <input type="submit" value="send">
        </form>
    </body>
</html>


