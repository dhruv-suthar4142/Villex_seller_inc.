const ChatEngine = {
    activeChatId: null,

    async sendMessage(text, file = null) {
        const currentUser = Auth.getUser();
        const message = {
            id: Date.now(),
            from: currentUser.id,
            to: this.activeChatId,
            text: text,
            file: file,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'sent'
        };

        const messages = DB.get('messages');
        messages.push(message);
        DB.save('messages', messages);

        this.renderMessages();
        
        // AI Bot simulation
        if(this.activeChatId == 3) {
            setTimeout(() => this.botReply(message), 1000);
        }
    },

    botReply(originalMsg) {
        const botMsg = {
            id: Date.now(),
            from: 3,
            to: originalMsg.from,
            text: `Vexa AI: I received your message: "${originalMsg.text}". How can I help you further?`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'delivered'
        };
        const messages = DB.get('messages');
        messages.push(botMsg);
        DB.save('messages', messages);
        this.renderMessages();
    },

    renderMessages() {
        const container = document.getElementById('messages-container');
        const messages = DB.getMessagesBetween(Auth.getUser().id, this.activeChatId);
        
        container.innerHTML = messages.map(m => `
            <div class="message ${m.from == Auth.getUser().id ? 'sent' : 'received'}">
                ${m.file ? `<img src="${m.file}" class="msg-image">` : `<p>${m.text}</p>`}
                <span class="msg-time">${m.time} <i class="fa-solid fa-check-double"></i></span>
            </div>
        `).join('');
        container.scrollTop = container.scrollHeight;
    }
};
