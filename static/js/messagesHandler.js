const htmlCache = new LazyHtmlCache({
    elementId: 'messages',
    url: 'message',
    type: 'GET',
    id: USERNAME_ID,
    templateKey: 'messages',
    template: (message) => {
        let message_position = (message.user_id === USERNAME_ID) ? 'right':'left';
        let template = "";

        template += `<section class="message -${message_position}">`;
        template += `<div class="nes-balloon from-${message_position}">`;
        if (message_position === 'left') {
            template += `<label><span style="color: red">${message.username}</span></label>`;
        }
        template += `<p>${message.message}</p>`;
        template += `</div>`;
        template += `</section>`;

        return template;
    }
});