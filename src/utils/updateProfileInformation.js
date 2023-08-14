import axios from 'axios';

export async function updateProfileInformation(displayName, bio, slug) {

  const authToken = localStorage.getItem('authToken');

  try {
    const response = await axios.post('http://localhost:3005/auth/updateProfileInformation', { authToken, displayName, bio, slug })
    return response.data;

  } catch (error) {
    console.log(error)
  }
} 