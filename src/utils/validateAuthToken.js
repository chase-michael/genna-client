import axios from 'axios';

export function validateAuthToken() {
    return new Promise((resolve, reject) => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            if (localStorage.getItem('userData')){
                localStorage.removeItem('userData');
            }
            reject(new Error('in validateAuthToken: No token found'));
        } else {
            axios.post('http://localhost:3005/auth/validateAuthToken', { authToken })
                .then(response => {
                    localStorage.setItem('userData', JSON.stringify(response.data));
                    resolve(response.data);
                })
                .catch(error => {
                    reject(new Error(error.message));
                });
        }
    });
}