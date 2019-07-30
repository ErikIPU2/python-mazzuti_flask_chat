$(document).ready(() => {
    $('#jf_create-create').click(() => {
        let room = $('#jf_create_room-name');
        let room_name = $(room).val();

        if (room_name) {
            $.ajax({
                type: 'POST',
                url: 'create_room',
                data: {name: room_name},
                success: (data) => {
                    if (!data.status) {
                        alert(data.message);
                    } else {
                        $(room).val("");
                        updateRooms();
                    }
                }
            })
        }
    });
});