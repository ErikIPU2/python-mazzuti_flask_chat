let rooms_cache = null;
let messages_cache = [];

var active_room_id = null;

function show_group_info() {
    if (active_room_id) {
        document.getElementById('group_info_dialog').showModal();
        $.ajax({
            type: 'POST',
            url: 'get_participants_users',
            data: {room_id: active_room_id},
            success: (data) => {
                let html_template = "";
                for (let participant of data.participants) {
                    html_template += `<li>${participant.username}</li>`
                }
                $('#group_info_participants_list').html(html_template);
            }
        });
    }
}

function update_rooms() {
    $.ajax({
        type: 'GET',
        url: 'rooms',
        success: (data) => {
            const roomsList = $("#rooms-list");
            let htmlTemplate = "";

            for (let i = 0; i < data.length; i++) {
                htmlTemplate += `<a href="#!" class="collection-item">
                                    <li room-id="${data[i].id}" class="room"><span class="badge">0</span>${data[i].name}</li>
                                </a>`
            }

            $(roomsList).html(htmlTemplate);
            rooms_cache = data;
        }
    })
}


async function change_messages(room_id) {
    function find_room(room_id) {
        for (let room of rooms_cache) {
            if (room.id === room_id) return room;
        }
    }

    function find_messages_inCache(room_id) {
        for (let messages of messages_cache) {
            if (parseInt(messages.room_id) === room_id) return messages;
        }
        return null;
    }

    if (!rooms_cache) {
        rooms_cache = await $.ajax({
            type: 'GET',
            url: 'rooms',
            success: (data) => {
                return data;
            }
        })
    }

    let room = find_room(room_id);
    active_room_id = room.id;
    $('#room_name').html(room.name);

    let messages = find_messages_inCache(room_id);

    if (!messages) {
        messages = await $.ajax({
            type: 'GET',
            url: `message/${active_room_id}`,
            success: (data) => {
                messages_cache.push(data);
                return data;
            }
        })
    }

    let html_template = '';

    for (let message of messages.messages) {
        let message_position = (message.user_id === USERNAME_ID) ? 'right':'left';
        html_template += `<section class="message -${message_position}" >
                              <div class="nes-balloon from-${message_position}">
                                  <p>${message.message}</p>
                              </div>
                              <p>${message.username}</p>
                          </section>`;
    }
    $('#messages').html(html_template);

}