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

    this._view.addButtonClicked.attach(function () {
        _this.addItem();
    });

    ShoutController.prototype.addItem = function () {
        var modal = new Modal(300, 200, 'Add Shout', '../modal_layouts/add_shout.php');

        modal.addButton('Save', 'primary', function () {
            projectId = $('li.selected').data('id');

            var shoutDate = moment($('.calendar').val(), "L").format('YYYY-MM-DD 00:00:00');
            var shoutTime = moment($('.clock').val(), "h:mm A").format('YYYY-MM-DD HH:mm:00');
            var shoutText = $('#shoutText').val();

            $.post("../save_shout.php", { shoutDate: shoutDate, shoutTime: shoutTime, projectId: projectId, shoutText: shoutText }, function (data) {
                var newShout = new Shout(data, projectId, shoutText, shoutDate, shoutTime);
                _this._model.addItem(newShout);

                modal.hideModal();
            });
        });

        modal.addButton('Cancel', 'default', function () {
            modal.hideModal();
        });

        modal.showModal();
    };
    
    this._view.deleteShoutButtonClicked.attach(function (sender, args) {

        var yesNoModal = new CommonModal("Title passed in", "Are you sure you want to delete this Shout?", CommonModal.YES_NO);

        yesNoModal.addYesHandler(function () {
            $.post("../API.php", { object_id: args.shout_id, method: 'delete_by_id', type: 'Shout' })
               .done(function (data) {
                   yesNoModal.hide();
                   _this._model.removeItem(args);
               }
            );
        });
        yesNoModal.show();
    });
}
 