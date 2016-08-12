function ShoutController(model, view) {
    this._model = model;
    this._view = view;
    var _this = this;

    this._view.nextButtonClicked.attach(function (sender, args) {
        _this._model.setNextPage(args.id, function () { });
    });

    this._view.prevButtonClicked.attach(function (sender, args) {
        _this._model.setPrevPage(args.id, function () { });
    });

    this._view.firstPageButtonClicked.attach(function (sender, args) {
        _this._model.setToFirstPage(args.id, function () { });
    });

    this._view.lastPageButtonClicked.attach(function (sender, args) {
        _this._model.setToLastPage(args.id, function () { });
    });





    this._view.deleteShoutButtonClicked.attach(function (sender, args) {
        
    
    
        // Use the args.shout_id to do the delete?
        $.post("../API.php", { object_id: args.shout_id, method: 'delete_by_id', type: 'Shout' })
        .done(function (data) {
            //_this._model.removeProjectWithId(id);
            //deleteProjectModal.hideModal();
            _this._model.removeItem(args);
        });
    
    
    });



    
}
 