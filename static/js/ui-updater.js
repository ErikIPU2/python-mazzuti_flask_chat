let rooms_cache = null;
let active_room_id = null;

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
    function found_room(room_id) {
        for (let room of rooms_cache) {
            if (room.id === room_id) return room;
        }
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

    if (!!rooms_cache) {
        let room = found_room(room_id);
        active_room_id = room.id;
        $('#room_name').html(room.name);

        $.ajax({
            type: 'GET',
            url: `message/${active_room_id}`,
            success: (data) => {
                if (!data.status) {
                    alert(data.message)
                } else {
                    let html_template = '';

                    for (let message of data.messages) {
                        if (message.user_id === USERNAME_ID) {
                            html_template += `<section class="message -right" >
                                            <div class="nes-balloon from-right">
                                                <p>${message.message}</p>
                                            </div>
                                        </section>`;
                        } else {
                            html_template += `<section class="message -left" >
                                            <div class="nes-balloon from-left">
                                                <p>${message.message}</p>
                                            </div>
                                        </section>`;
                        }
                    }
                    $('#messages').html(html_template);
                }
            }
        })
    }
}