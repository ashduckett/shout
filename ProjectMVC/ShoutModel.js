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
    this.nextPage = null;
    this.prevPage = null;
}
    ShoutModel.prototype.loadShouts = function (project_id, pageNo, callMeOnSuccess) {
        // This is getting called once for each item, this item inclusive downwards. How weird!
        // I think this must be where you've attached the event handler in the view.
        var _this = this;

        // How're we gonna get the project id?
        _this.shouts = {};
        $.getJSON('../get_shout_page.php', { page_no: pageNo, project_id: project_id }, function (data) {
            var allShouts = data.shouts;

            _this.nextPage = data.next_page;
            _this.prevPage = data.prev_page;
    
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
