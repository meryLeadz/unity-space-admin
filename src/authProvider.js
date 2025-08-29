const API_URL = 'https://localhost:8000/api';

const authProvider = {
    login: async ({ username, password }) => {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: username, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            return Promise.reject(new Error(error.message || 'Login failed'));
        }

        const data = await response.json();
        localStorage.setItem('token', data.token); // stocke le JWT
        return Promise.resolve();
    },

    register: async ({ email, password }) => {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const text = await response.text(); // récupérer d'abord le texte brut
        let data;
        try {
            data = JSON.parse(text); // essayer de parser JSON
        } catch {
            throw new Error('Réponse serveur non valide : ' + text);
        }

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        return Promise.resolve(data);
    },


    verifyEmail: async (token) => {
        const response = await fetch(`${API_URL}/verify?token=${token}`, {
            method: 'GET',
        });

        if (!response.ok) {
            const error = await response.json();
            return Promise.reject(new Error(error.message || 'Verification failed'));
        }

        return Promise.resolve();
    },

    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },

    checkAuth: () =>
        localStorage.getItem('token') ? Promise.resolve() : Promise.reject(),

    getPermissions: () => Promise.resolve(),
};

export default authProvider;
