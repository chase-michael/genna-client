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
            axios.post('https://stark-forest-35371-d6c7fd4f4fa3.herokuapp.com/auth/validateAuthToken', { authToken })
                .then(response => {
                    localStorage.setItem('userData', JSON.stringify(response.data));
                    resolve(response.data);
                })
                .catch(error => {
                    reject(new Error(error.message));
                    console.log(error);
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('userData');
                });
        }
    });
}