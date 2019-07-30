let actualRoomId = null;

$(document).ready(() => {
   $('body').on('click', '.room', function() {
       let roomId = parseInt($(this).attr('room-id'));
       let roomName = $(this).attr('room-name');
       $('#room_name').html(roomName);

       htmlCache.setContent(roomId);
       actualRoomId = roomId;
   })
});