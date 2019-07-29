$(document).ready(() => {
    $('#send_message_button').click(() => {
        let textarea = $('#message_textarea');
        let text = $(textarea).val();

        if (text && actualRoomId) {
            $.ajax({
                type: 'POST',
                url: 'send',
                data: {
                    room_id: actualRoomId,
                    message: text
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