const DB = {
    save: (key, data) => localStorage.setItem(`vx_${key}`, JSON.stringify(data)),
    get: (key) => JSON.parse(localStorage.getItem(`vx_${key}`)) || [],
    
    // Initialize seed data if empty
    init() {
        if (!localStorage.getItem('vx_users')) {
            this.save('users', [
                { id: 1, username: 'Kanak Suthar', avatar: 'https://i.pravatar.cc/150?u=1', status: 'online' },
                { id: 2, username: 'Dhruv Suthar', avatar: 'https://i.pravatar.cc/150?u=2', status: 'online' },
                { id: 3, username: 'Vexa AI', avatar: 'https://i.pravatar.cc/150?u=ai', status: 'online', isBot: true },
            ]);
        }
        if (!localStorage.getItem('vx_messages')) {
            this.save('messages', [
                { from: 1, to: 2, text: "Welcome to Vexa Labs Engine!", time: new Date().toLocaleTimeString(), status: 'read' }
            ]);
        }
    },
    
    getMessagesBetween(u1, u2) {
        return this.get('messages').filter(m => 
            (m.from == u1 && m.to == u2) || (m.from == u2 && m.to == u1)
        );
    }
};
DB.init();
