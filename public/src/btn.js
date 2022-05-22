$(document).ready ( function () {
    $(document).on ("click", "#show-event-btn", function () {
        console.log($('#hidden-input').val());
    });
});