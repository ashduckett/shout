<!--
    What needs to be on a shout card?
        * Date
        * Time
        * Text
        * An image would be good. Perhaps the image from the account that's going to send it.
-->
<style>
    .shout-card {
        width: 325px;
        height: 100px;
        border: 1px solid black;

        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;

        border-radius: 5px;
    }

.shout-card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

</style>


<div>
    Version One
    <div class="shout-card">
        <div class="text">
            Welcome to Ashios! The site's now live!
        </div>
        <div class="date">
            Date: 30/12/1982
        </div>
        <div class="time">
            Time: 4:00pm
        </div>
    </div>
    Version Two: Here I think we can remove the yellow and add a box around the content. Also remove the labels for date and time.
    <div class="shout-card">
        <div class="text">
            Welcome to Ashios! The site's now live!
        </div>
        <div class="date">
            30/12/1982
        </div>
        <div class="time">
            4:00pm
        </div>
    </div>
    Next I suggest getting the time on the bottom left and date on the bottom right. I also suggest a border radius and a background colour of off-white.

</div>
