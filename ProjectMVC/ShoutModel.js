// Assuming data coming in in what format?
// This is just one item, the model is a collection
function Shout(id, project_id, text, date, time) {
    this.id = id;
    this.project_id = project_id;
    this.text = text;
    this.date = date;
    this.time = time;
}

function ShoutModel() {
    this.shouts = {};

    /*this.itemAdded = new Event(this);
    this.itemRemoved = new Event(this);
    this.itemUpdated = new Event(this);*/
}

/*

        $.getJSON(url, obj, function (data) {
            $('.shout-table').find('table').remove();
            $('.shout-table').find('.button-bar').remove();
            context.loadData(data);
            $(context.nextButton).attr('data-next', data.next_page);
            $(context.previousButton).attr('data-prev', data.prev_page);

            $(context.nextButton).click(function () {
                if ($(this).attr('data-next') != 'none') {
                    $('.shout-table').shoutTable(url, { project_id: obj.project_id, page_no: $(this).attr('data-next') });
                }
            });

            $(context.previousButton).click(function () {
                if ($(this).attr('data-next') != 'none') {
                    $('.shout-table').shoutTable(url, { project_id: obj.project_id, page_no: $(this).attr('data-prev') });
                }
            });

        });

*/

/*

    $page_no = $_GET['page_no'];
    $project_id = $_GET['project_id'];


*/


// You need the project_id. Could this method live on a project? I should certainly be called from the project on click.
ShoutModel.prototype.loadShouts = function (project_id, callMeOnSuccess) {
    // This is getting called once for each item, this item inclusive downwards. How weird!
    // I think this must be where you've attached the event handler in the view.
    var _this = this;

    // How're we gonna get the project id?

    $.getJSON('../get_shout_page.php', { page_no: 1, project_id: project_id }, function (data) {
        var allShouts = data.shouts;
        $.each(allShouts, function (key, val) {
            _this.shouts[val.data.id] = new Shout(val.data.id, val.data.project_id, val.data.text, val.data.date, val.data.time);
        });
        callMeOnSuccess();
    });
};

ShoutModel.prototype.getShouts = function () {
    return this.projects;
};

ShoutModel.prototype.getShoutById = function(id) {
    return this.shouts[id];    
}

// This definitely works
//ShoutModel.prototype.addItem = function (project) {
 //   console.log('addItem method in SchedulingProjectModel hit');
    //this.projects[project.id] = project;
    //this.itemAdded.notify({ item: project });
//};

//SchedulingProjectModel.prototype.removeProjectWithId = function (id) {
//    var project = this.projects[id];
//    delete this.projects[id];
    // I'm not using the passed in project anywhere am I?
//    this.itemRemoved.notify({ item: project });
//};

//SchedulingProjectModel.prototype.updateProject = function (project) {
//    console.log('edit event fired. Do we have a project? This will be the new project, same id though');

    // Hopefully update the list?
//    this.projects[project.id] = project;
//    this.itemUpdated.notify({ item: project });


//}
