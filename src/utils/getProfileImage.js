import axios from 'axios';

export async function getProfileImage() {
    try {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:3005/auth/getProfileImage', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response.data.profileImage;

    } catch (error) {
        console.log(error);
    }
}
