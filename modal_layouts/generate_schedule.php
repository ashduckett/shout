<p>
    <input type="radio" name="schedule-type" value="one-date"> Specify a single time from which to start.
</p>
<p>
    <label>Date:</label><input type="text" value="" class="calendar" style="width: 100%; box-sizing: border-box;"/>
    <label>Time:</label><input type="text" value="" class="clock" style="width: 100%;  box-sizing: border-box;"/>
</p>
<p>
    <label>Interval:</label>
</p>
<p>
    <input type="radio" name="schedule-type" value="range"> Specify a range.
</p>

<script>

    $('.calendar').calendar();
    $('.clock').clock();
</script>

<!--
In both cases, the one where you specify a range, and the one where you're specifying a single date, you're always asking for a start date.


Maybe you could have one option where the end date is optional.
-->