document.addEventListener('DOMContentLoaded', () => {
    Auth.checkSession();
    const user = Auth.getUser();
    document.getElementById('my-username').innerText = user.username;

    const chatList = document.getElementById('chat-list');
    const users = DB.get('users');

    // Load Contact List
    chatList.innerHTML = users.map(u => `
        <div class="chat-item" onclick="selectChat(${u.id}, '${u.username}', '${u.avatar}')">
            <img src="${u.avatar}" alt="avatar">
            <div class="chat-info">
                <h4>${u.username}</h4>
                <small>${u.status}</small>
            </div>
        </div>
    `).join('');

    window.selectChat = (id, name, avatar) => {
        ChatEngine.activeChatId = id;
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('chat-window').classList.remove('hidden');
        document.getElementById('active-username').innerText = name;
        document.getElementById('active-avatar').src = avatar;
        ChatEngine.renderMessages();
    };

    // Send Event
    document.getElementById('btn-send').addEventListener('click', () => {
        const input = document.getElementById('message-input');
        if (input.value.trim()) {
            ChatEngine.sendMessage(input.value);
            input.value = '';
        }
    });

    // Enter key support
    document.getElementById('message-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') document.getElementById('btn-send').click();
    });

    // File upload handling
    document.getElementById('btn-attach').onclick = () => document.getElementById('file-input').click();
    document.getElementById('file-input').onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => ChatEngine.sendMessage("", event.target.result);
        reader.readAsDataURL(file);
    };
});
