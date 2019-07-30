$(document).ready(() => {
    // Gerate list of users to add
    $('#button_add_participant').click(() => {
        document.getElementById('add_participant_dialog').showModal();

        $.ajax({
            type: 'POST',
            url: 'get_not_participant_users',
            data: {room_id: active_room_id},
            success: (data) => {
                let html_template = "";
                for (let participant of data.participants) {
                    html_template += `<label>
                                        <input type="radio" class="nes-radio" name="radio_add_participant" value="${participant.id}" />
                                        <span>${participant.username}</span>
                                      </label>
                                      <br>`
                }
                $('#participants_checkbox').html(html_template);
            }
        })
    });

    $('#dialog_button_add_participant').click(() => {
        let users_to_add = $("#form_add_participant_dialog").serializeArray()[0];
        $.ajax({
            type: 'POST',
            url: 'add_participant',
            data: {
                room_id: active_room_id,
                user_id: users_to_add.value
            },
            success: (data) => {
                if (!data.status) {
                    alert(data.message)
                }
            }
        })
    });
});