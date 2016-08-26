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
    this.currentPage = 1;
    this.totalNumberOfPages = 0;
    this.pageChanged = new Event(this);
    this.itemRemoved = new Event(this);
    this.itemAdded = new Event(this);
}


ShoutModel.prototype.removeItem = function (args) {

    var _this = this;

    delete this.shouts[args.shout_id];
    this.itemRemoved.notify({ id: args.shout_id });

    // reload the page...maybe I should ditch the extra visits to the db and load everything
    // at once?
    this.loadShouts(args.project_id, _this.currentPage, function () {
        _this.pageChanged.notify();
    });
}

/*

SchedulingProjectModel.prototype.addItem = function (project) {
    this.projects[project.id] = project;
    this.itemAdded.notify({ item: project });
};*/

ShoutModel.prototype.addItem = function (shout) {
    //this.projects[project.id] = project;
    //this.itemAdded.notify({ item: project });

    
    this.shouts[shout.id] = shout;
    this.itemAdded.notify({item: shout});
};


ShoutModel.prototype.setToFirstPage = function (project_id, callMeOnSuccess) {
    var _this = this;
    this.currentPage = 1;
    this.loadShouts(project_id, _this.currentPage, function () {
        _this.pageChanged.notify();
        callMeOnSuccess();
    });
};

ShoutModel.prototype.setNextPage = function (project_id, callMeOnSuccess) {
    var _this = this;

    if (this.totalNumberOfPages > this.currentPage) {
        this.currentPage++;
        this.loadShouts(project_id, this.currentPage, function () {
            _this.pageChanged.notify();
        });
    }
};

ShoutModel.prototype.setPrevPage = function (project_id, callMeOnSuccess) {
    var _this = this;

    if (this.currentPage != 1) {
        this.currentPage--;
        this.loadShouts(project_id, this.currentPage, function () {
            _this.pageChanged.notify();
        });
    }
};

ShoutModel.prototype.setToLastPage = function (project_id, callMeOnSuccess) {
    var _this = this;

    if (this.totalNumberOfPages > 0) {
        this.currentPage = this.totalNumberOfPages;
        this.loadShouts(project_id, this.totalNumberOfPages, function () {
            _this.pageChanged.notify();
        });
    }
}

ShoutModel.prototype.loadShouts = function (project_id, pageNo, callMeOnSuccess) {
    var _this = this;

    _this.shouts = {};
    $.getJSON('../get_shout_page.php', { page_no: pageNo, project_id: project_id }, function (data) {
        var allShouts = data.shouts;

        _this.totalNumberOfPages = data.page_count;

        $.each(allShouts, function (key, val) {
            _this.shouts[val.data.id] = new Shout(val.data.id, val.data.project_id, val.data.text, val.data.date, val.data.time);
        });
        callMeOnSuccess();
    });
};

ShoutModel.prototype.getShouts = function () {
    return this.projects;
};

ShoutModel.prototype.getShoutById = function (id) {
    return this.shouts[id];
};