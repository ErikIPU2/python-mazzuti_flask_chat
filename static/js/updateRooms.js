$(document).ready(() => {
    $('#room_list_button').click(() => {
        $.ajax({
            type: 'GET',
            url: 'rooms',
            success: (data) => {
                let html = ``;
                for (let room of data) {
                    html += `<a href="#!" class="collection-item">
                                <li room-id="${room.id}" class="room"><span class="badge">0</span>${room.name}</li>
                             </a>`;
                }
                $('#room_list').html(html);
                document.getElementById('conversas').showModal();
            }
        })
    })
});