<?php
        
    require_once (__DIR__ . '\DBObjects\Organisation.class.php');
    require_once (__DIR__ . '\DBObjects\User.class.php');

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);


    try {
        // Validate email
        $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);

        if(!$email) {
            throw new Exception('Invalid email');
        }

        // Validate password
        $password = filter_input(INPUT_POST, 'password');

        if(!$password || mb_strlen($password) < 8) {
            throw new Exception('Password must contain 8+ characters');
        }

        // Create password hash
        $passwordHash = password_hash(
            $password,
            PASSWORD_DEFAULT,
            ['cost' => 12]
        );

        if($passwordHash === false) {
            throw new Exception('Password hash failed');
        }
        

        // If we've got this far we can do the save

        // 1. Create a new Group, make sure you obtain the id once it's inserted

        $organisation = new Organisation(array('name' => $_POST['orgname']));
        $org_id = $organisation->insert();

        // Now we have the organisation id, we can create a user. Since an email address can only point to a single user, the user will be associated with just one organisation.
        // If a user logs in, that user has to be associated with a specific organisation, so it makes no sense to have a link table. Just have that one user, associated with that
        // one organisation.
  

        $user = new User(array(
                    'org_id' => $org_id,
                    'first_name' => $_POST['firstname'],
                    'second_name' => $_POST['secondname'],
                    'email' => $_POST['email'],
                    'password_hash' => $passwordHash
        ));

        $user->insert();


        // At this point the user and the group have both been created and added
        // to the database. The user details should now be altered to reflect what
        // would have been posted, and an organisation name should be posted as well
        // which you can use to create the group with.

        // A constraint on the email being unique would be a good idea as well. Think
        // about this. How best to inform the user and enforce constraint?

        // Now we need the login page. What needs to be done?
        // We need a way to find out if the user is logged in at any time.
        // If they're not, redirect them to the login page instead of showing them the page
          
        
        
    
   } catch(Exception $e) {
       echo $e->getMessage();
   }


// This code actually works!
// Secure login research almost done?
// Store password hashes in a varchar(255)

// What will the process be for actual logging in? It'll be easy to create a register page for the
// storage of user details. This is step 1.

// Step two will be allowing a registered user to log in.


// I suggest:
// Get registration working. Or at least a dummy page.

// Then create a login page which will post to a login script. This script will verify the user.
// This script can then redirect the user to the main marakash page.

// login_experiment should actually be called register_user_dummy_page or something,
// the idea is to use login_experiment to get hold of user details and register them.

// Once a user is registered, though, the login functionaility will be used. That should
// be the fun part. Design a login page!

// The login page could have a "Don't have an account yet? Register here link. There's motive
// to get a decent registration page.

// Think: What information do you want from users at this stage?
// First name
// Second name
// Business address
// Email
// Password
// cust_id should be added for you

// Also...form validation and error display. Should be built into modal.js.
?>

