function SchedulingProject(id, name) {
    this.id = id;
    this.name = name;
    this.shouts = [];
}

function SchedulingProjectModel() {
    this.projects = [];
    this.itemAdded = new Event(this);
    this.itemRemoved = new Event(this);
    this.itemUpdated = new Event(this);
}



SchedulingProjectModel.prototype.loadProjects = function (callMeOnSuccess) {
    var _this = this;

    $.post('../API.php', { method: 'get_all', type: 'SchedulingProject' }, function (data) {
        var obj = JSON.parse(data);
        $.each(obj, function (key, val) {
            _this.projects[val.data.id] = new SchedulingProject(val.data.id, val.data.name);
            var project_id = val.data.id;
        });

        var model = new ShoutModel();
        model.loadAllShouts(function() {
            if(model.shouts.length > 0) {
                model.shouts.forEach(function(element) {
                    _this.projects[element.project_id].shouts.push(element);
                    
                });
            }

        callMeOnSuccess();   

        });

        /*
            Each project should have an array. Each project should be obtainable by id. Each project is currently in memory.

            // Step one: Allow all projects to load completely.
            // Step two: Load all of the shouts in the callback.
            // Step three: Get hold of the project in memory by id and append its shout.

        */



         
    });
    
};

SchedulingProjectModel.prototype.getProjects = function () {
    return this.projects;
};

SchedulingProjectModel.prototype.getProjectById = function (id) {
    return this.projects[id];
};

// Event handlers for these are attached in the view.

// Call this method and you're notifying the event that something's been added.
// The view knows then to do something.
SchedulingProjectModel.prototype.addItem = function (project) {
    this.projects[project.id] = project;
    this.itemAdded.notify({ item: project });
};

SchedulingProjectModel.prototype.removeProjectWithId = function (id) {
    var project = this.projects[id];
    delete this.projects[id];
    this.itemRemoved.notify({ item: project });
};

SchedulingProjectModel.prototype.updateProject = function (project) {
    this.projects[project.id] = project;
    this.itemUpdated.notify({ item: project });
};