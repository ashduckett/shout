$(document).ready(function () {
    $('.dropdown').hide();

    $('.menu-item').click(function () {
        $('.dropdown').hide();
        $($(this).next().fadeIn('slow'));
    });

    $('html').click(function () {
        $('.dropdown').hide();
    });

    $('.menu').click(function (event) {
        event.stopPropagation();
    });



});