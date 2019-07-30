let socket = io();

socket.on('nm', (data) => {
    for (let id of roomIdList) {
        if (data.room_id == id) {
            htmlCache.setAsOutdated(id);
            if (id === actualRoomId) {
                htmlCache.setContent(id);
            } else {
                let actualMessageCont = parseInt($(`#message-cont-${id}`).html());
                actualMessageCont++;
                $(`#message-cont-${id}`).html(actualMessageCont);
            }
        }
    }
});