    
        <div class="field" style="margin: auto;">
            <p style="padding: 0; margin: 0;width: 100%;">
                <label for="shout-time" style="display: inline-block; width: 100%; box-sizing: border-box;">
                    Date: 
                </label>
            </p>    
            <input type="text" value="" class="calendar" style="width: 100%; box-sizing: border-box;"/>
        </div>
        <div class="field" style="margin: 8px auto;">
            <p style="padding: 0; margin: 0; width: 100%;">
                <label for="shout-time" style="display: inline-block; width: 100%;  box-sizing: border-box;">
                    Time: 
                </label>
            </p>    
            <input type="text" value="" class="clock" style="width: 100%;  box-sizing: border-box;"/>
        </div>
        <div class="field" style="margin: 8px auto;">
            <p style="padding: 0; margin: 0; width: 80%;">
                <label for="shout-time" style="display: inline-block; width: 100%;  box-sizing: border-box;">
                    Text: 
                </label>
            </p>    
            <textarea style="resize: none; display: inline-block; width: 100%;  box-sizing: border-box;" id="shoutText" placeholder="Shout text..." name="projectName"></textarea>
        </div>
    


<script>
    // Add padding of 20px to the form


    // Where should this live?
    $('.calendar').calendar();
    $('.clock').clock();

</script>