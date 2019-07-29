$(document).ready(() => {
    $('body').on('click', '#button_remove_participant', () => {
         $.ajax({
            type: 'GET',
            url: `get_participants_users/${actualRoomId}`,
            success: (data) => {
                let html_template = "";
                for (let participant of data.participants) {
                    html_template += `<label>
                                        <input type="checkbox" class="nes-checkbox" name="${participant.username}" value="${participant.id}" />
                                        <span>${participant.username}</span>
                                      </label>
                                      <br>`
                }
                $('#remove_participants_checkbox').html(html_template);
            }
        });

        document.getElementById('remove_participant_dialog').showModal();
    });

    $("#dialog_button_remove_participant").click(() => {
        let users_to_remove = $('#form_remove_participant_dialog').serializeArray();
        for (let user of users_to_remove) {
            $.ajax({
                type: 'POST',
                url: 'remove_participant',
                data: {
                    room_id: actualRoomId,
                    user_id: user.value
                },
                success: (data) => {
                    if (!data.status) {
                        alert(data.message);
                    }
                }
            })
        }
    })
});