const authProvider = {
    login: ({ username, password }) => {
        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('token', 'dummy-token');
            return Promise.resolve();
        }
        return Promise.reject();
    },
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
};

export default authProvider;
