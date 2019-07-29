$(document).ready(() => {
    $('body').on('click', '#button_add_participant', () => {
        $.ajax({
            type: 'GET',
            url: `get_not_participant_users/${actualRoomId}`,
            success: (data) => {
                let html_template = "";
                for (let participant of data.participants) {
                    html_template += `<label>
                                        <input type="checkbox" class="nes-checkbox" name="${participant.username}" value="${participant.id}" />
                                        <span>${participant.username}</span>
                                      </label>
                                      <br>`
                }
                $('#participants_checkbox').html(html_template);
            }
        });

        document.getElementById('add_participant_dialog').showModal();
    });

    $('#dialog_button_add_participant').click(() => {
        let users_to_add = $("#form_add_participant_dialog").serializeArray();
        for (let user of users_to_add) {
             $.ajax({
                type: 'POST',
                url: 'add_participant',
                data: {
                    room_id: actualRoomId,
                    user_id: user.value
                },
                success: (data) => {
                    if (!data.status) {
                        alert(data.message)
                    }
                }
            })
        }
    });
});