$(document).ready(() => {
    $("body").on('click', '.room', function() {
        let room_id = parseInt($(this).attr('room-id'));
        change_messages(room_id);
        $('#add-remove_buttons').show('slow');
    })
});