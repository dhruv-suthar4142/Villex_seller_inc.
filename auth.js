const Auth = {
    login(username, password) {
        // Simple demo auth logic
        const user = { id: 1, username: username, avatar: 'https://i.pravatar.cc/150?u=me' };
        localStorage.setItem('vx_session', JSON.stringify(user));
        window.location.reload();
    },

    getUser() {
        return JSON.parse(localStorage.getItem('vx_session')) || { id: 1, username: 'Guest' };
    },

    checkSession() {
        if (!localStorage.getItem('vx_session')) {
            window.location.href = 'login.html';
        }
    }
};
