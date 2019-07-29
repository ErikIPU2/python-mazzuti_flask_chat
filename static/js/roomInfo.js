$(document).ready(() => {
    $('#participant_button').click(() => {
        if (actualRoomId) {
            $.ajax({
                type: 'GET',
                url: `get_participants_users/${actualRoomId}`,
                success: (data) => {
                    const participants = data.participants;
                    const partcipants_cont = participants.length;
                    let htmlTemplate = '';

                    for (let participant of participants) {
                        htmlTemplate += `<p>${participant.username}</p>`
                    }

                    $('#participant_cont').html(partcipants_cont);
                    $('#participant_list').html(htmlTemplate);
                    document.getElementById('participantes').showModal();
                }
            });
        }
    })
});