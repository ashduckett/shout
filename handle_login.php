<?php
    require_once 'DBObjects/User.class.php';
    session_start();
    try {
        $email = filter_input(INPUT_POST, 'email');
        $password = filter_input(INPUT_POST, 'password');

        // Find the user account via the email address.
        $user = User::findByEmail($_POST['email']);
        
        // Verify password
        if(password_verify($password, $user->getValue('password_hash')) === false) {
            throw new Exception('Invalid password');
        }

        $currentHashAlgorithm = PASSWORD_DEFAULT;
        $currentHashOptions = array('cost' => 15);

        $passwordNeedsRehash = password_needs_rehash($user->getValue('password_hash', $currentHashAlgorithm, $currentHashOptions));

        if($passwordNeedsRehash === true) {
            // Find out how to update user
            $user->setValue('password_hash', $password, $currentHashAlgorithm, $currentHashOptions);
            $user->update();
        }

        $_SESSION['user_logged_in'] = 'yes';
        $_SESSION['user_email'] = $email;

        // At this point redirect user to a page
        echo 'Am I logged in? ' . $_SESSION['user_logged_in'];
        header('HTTP/1.1 302 Redirect');
        header('Location: index.php');


    } catch(Exception $e) {
        echo $e->getMessage();
    }
?>