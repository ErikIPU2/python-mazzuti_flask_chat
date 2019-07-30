let roomIdList = [];

$(document).ready(() => {
    $('#room_list_button').click(() => {
        updateRooms();
        document.getElementById('conversas').showModal();
    })
});

function updateRooms() {
     $.ajax({
         type: 'GET',
         url: 'rooms',
         success: (data) => {
             let html = ``;
             roomIdList = [];
             for (let room of data) {
                 roomIdList.push(room.id);
                 let messageContCache = $(`#message-cont-${room.id}`).html() | 0;
                 html += `<a href="#!" class="collection-item">
                              <li room-id="${room.id}" room-name="${room.name}" class="room"><span class="badge" id="message-cont-${room.id}">${messageContCache}</span>${room.name}</li>
                           </a>`;
             }
             $('#room_list').html(html);
         }
     })
}