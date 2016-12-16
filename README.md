# Shout

## How to run
In order to run this, once cloned, you would need a PHP server, a web browser and a MySQL database. The SQL required for setting up the database
is included in a sql directory. You should call your database Marakash and assuming your database server can be found it should connect automatically.
You should find that any credentials that need to be set can be found in the DBObject superclass which will be in the DBObjects directory.

## Structure
There are too many files to mention. However there are some clearly defined areas of the application.

### Initial Setup
Once you've got your database setup and your PHP server and can run this application, you'll need to register as a user. Once done,
the system won't redirect you so if you go to 8000:login I think it is, you'll see that you then have the opportunity to log into
the application.

### Database PHP
Each object that needs to be saved to the database is inside a class that extends the DBObject class. This class contains all the methods it
needs to connect to the database and perform other generic database duties.

### Scheduling
I've not got very far with this, but the idea is that you can create such a thing as projects. These represent groups of Shouts. Shouts are
generic social media posts that may be for any of the supported social media sites. Currently the user can only add their twitter account
to the site, but I hope to alter the code to allow for as many as I can get to work.

### Note: 

Much more work on this is needed. The scheduling itself should be easy enough, but getting it to look right, and behave well is going
to take some time. The code needs a lot of tidying/ripping out. What I'm proud of though is that all of the HTML/CSS/JavaScript/JQuery and PHP
is practically all written by me. Even if it looks Bootstrappy in places.
