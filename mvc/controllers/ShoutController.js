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
        console.log('first page button clicked');
    });

    this._view.lastPageButtonClicked.attach(function (sender, args) {
        console.log('last page button');
        _this._model.setToLastPage(args.id, function () { });

    });

    
}
 