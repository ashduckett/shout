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



    this._view.editShoutButtonClicked.attach(function (sender, args) {
        var shout = _this._model.getShoutById(args.shout_id);

        _this.updateItem(shout);
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


    // How are you going to know which to update? How to populate the modal? You'll need both the project and
    // the shout id. Or just the shout id. Or a shout that already contains the correct id, that might do it.
    // Project's equivalent of this function gets passed an actual project.
    ShoutController.prototype.updateItem = function (shout) {
        // Now we have a shout to update!
        var modal = new Modal(300, 200, 'Edit Shout', '../modal_layouts/add_shout.php');
        
        // This should be part of the calendar plugin functionality via a setTime method or something similar.
        // This'll do for now...
        var time = moment(shout.time, "'YYYY/MM/DD HH:mm:ss'").format('h:mm A');
        var date = moment(shout.date, "'YYYY/MM/DD HH:mm:ss'").format('L');
        
        modal.addButton('Save', 'primary', function () {
            projectId = $('li.selected').data('id');

            var shoutDate = moment($('.calendar').val(), "L").format('YYYY-MM-DD 00:00:00');
            var shoutTime = moment($('.clock').val(), "h:mm A").format('YYYY-MM-DD HH:mm:00');
            var shoutText = $('#shoutText').val();


            // This adds a new shout...you want to update a shout. This could very possibly be done better using a JSONed Shout JS object
            $.post("../updateShout.php", { shoutDate: shoutDate, shoutTime: shoutTime, projectId: projectId, shoutText: shoutText, shoutId: shout.id }, function (data) {
                
                //Shout(id, project_id, text, date, time) {
                var newShout = new Shout(shout.id, projectId, shoutText, shoutDate, shoutTime);

                

                _this._model.updateItem(newShout);

                modal.hideModal();
            });
        });

        modal.addButton('Cancel', 'default', function () {
            modal.hideModal();
        });
        

        modal.showModal(function () {
            $('.calendar').val(date);
            $('.clock').val(time);
            $('#shoutText').val(shout.text);
        });




        //var shoutDate = moment($('.calendar').val(), "L").format('YYYY-MM-DD 00:00:00');


        //var shoutTime = moment($('.clock').val(), "h:mm A").format('YYYY-MM-DD HH:mm:00');
        //var shoutText = $('#shoutText').val();
    };
    
    this._view.deleteShoutButtonClicked.attach(function (sender, args) {

        var yesNoModal = new CommonModal("Confirm", "Are you sure you want to delete this Shout?", CommonModal.YES_NO);

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
 