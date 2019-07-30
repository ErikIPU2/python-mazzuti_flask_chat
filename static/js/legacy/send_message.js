$(document).ready(() => {
    $('#send_message_button').click(() => {
        let textarea = $('#message_textarea');

        if (textarea && active_room_id) {
            $.ajax({
                type: 'POST',
                url: 'send',
                data: {
                    room_id: active_room_id,
                    message: textarea.val()
                },
                success: (data) => {
                    if (!data.status) {
                        alert(data.message)
                    }
                    textarea.val("");
                }
            })
        }
    })
});