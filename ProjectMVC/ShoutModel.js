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
}

// I think the model
ShoutModel.prototype.setToFirstPage = function (project_id, callMeOnSuccess) {
    // Update the model
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

ShoutModel.prototype.loadShouts = function (project_id, pageNo, callMeOnSuccess) {
    // This is getting called once for each item, this item inclusive downwards. How weird!
    // I think this must be where you've attached the event handler in the view.
    var _this = this;

    _this.shouts = {};
    $.getJSON('../get_shout_page.php', { page_no: pageNo, project_id: project_id }, function (data) {
        var allShouts = data.shouts;

        // On to data, place the total number of pages
        _this.totalNumberOfPages = data.page_count;
        //console.log('setting totalnumberofpages ' + _this.totalNumberOfPages);
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