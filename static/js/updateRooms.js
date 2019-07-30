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
                 html += `<a href="#!" class="collection-item">
                              <li room-id="${room.id}" class="room"><span class="badge">0</span>${room.name}</li>
                           </a>`;
             }
             $('#room_list').html(html);
         }
     })
}