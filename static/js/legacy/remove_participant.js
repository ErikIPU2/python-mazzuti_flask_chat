$(document).ready(() => {
    $('#button_remove_participant').click(() => {
        document.getElementById('remove_participant_dialog').showModal();

        $.ajax({
            type: 'POST',
            url: 'get_participants_users',
            data: {room_id: active_room_id},
            success: (data) => {
                let html_template = "";
                for (let participant of data.participants) {
                    html_template += `<label>
                                        <input type="radio" class="nes-radio" name="radio_remove_participants" value="${participant.id}" />
                                        <span>${participant.username}</span>
                                      </label>
                                      <br>`
                }
                $('#remove_participants_checkbox').html(html_template);
            }
        });
    });

    $("#dialog_button_remove_participant").click(() => {
        let users_to_remove = $('#form_remove_participant_dialog').serializeArray()[0];
        $.ajax({
            type: 'POST',
            url: 'remove_participant',
            data: {
                room_id: active_room_id,
                user_id: users_to_remove.value
            },
            success: (data) => {
                if (!data.status) {
                    alert(data.message);
                }
            }
        })
    })
});