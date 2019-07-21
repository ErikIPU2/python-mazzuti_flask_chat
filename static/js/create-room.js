$(document).ready(() => {
    $('#jf_create_create').click(() => {
        let room_name = $('#jf_create-room_name').val();

        if (room_name) {
            $.ajax({
                type: 'POST',
                url: 'create_room',
                data: {name: room_name},
                success: (data) => {
                    if (!data.status) {
                        alert(data.message)
                    }
                }
            })
        }
    });
});