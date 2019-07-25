$(document).ready(() => {
    $('#delete_room_btn').click(() => {
        let check = prompt("Você tem certeza disso?\nDigite \"Eu TeNhO\" para confimar");
        if (check === "Eu TeNhO") {
            alert("Então o grupo será excluido");
            $.ajax({
                type: 'POST',
                url: 'delete_room',
                data: {room_id: active_room_id},
                success: (data) => {
                    if (!data.status) {
                        alert(data.message);
                    }

                    update_rooms();
                    $("#messages").html(`<section class="message -left" >
                                            <div class="nes-balloon from-left">
                                                <p>Bem-Vindo ao 8-bit Chat</p>
                                            </div>
                                        </section>`);

                    $("#room_name").html("8-bit Chat");
                    $('#add-remove_buttons').hide('slow');
                }
            });
        } else {
            alert("Não foi dessa vez não")
        }
    })
});