import axios from 'axios';

export async function validateAuthToken() {

    try {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.post('http://localhost:3005/auth/validateAuthToken', { authToken })
        return response.data.isValid;
    } catch (error) {
        console.error(error);
    }


}