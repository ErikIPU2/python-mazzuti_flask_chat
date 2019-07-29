let actualRoomId = null;

$(document).ready(() => {
   $('body').on('click', '.room', function() {
       let roomId = parseInt($(this).attr('room-id'));
       htmlCache.setContent(roomId);
       actualRoomId = roomId;
   })
});