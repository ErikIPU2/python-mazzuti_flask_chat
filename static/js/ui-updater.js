function update_rooms() {
    $.ajax({
        type: 'GET',
        url: 'rooms',
        success: (data) => {
            const roomsList = $("#rooms-list");
            let htmlTemplate = "";

            for (let i = 0; i < data.length; i++) {
                htmlTemplate += `<a href="#!" class="collection-item">
                                    <li><span class="badge" room-id="${data[i]['id']}">0</span>${data[i]['name']}</li>
                                </a>`
            }

            $(roomsList).html(htmlTemplate)
        }
    })
}