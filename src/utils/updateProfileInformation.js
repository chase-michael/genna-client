import axios from 'axios';

export async function updateProfileInformation(displayName, bio, slug) {

  const authToken = localStorage.getItem('authToken');

  try {
    const response = await axios.post('https://stark-forest-35371-d6c7fd4f4fa3.herokuapp.com/auth/updateProfileInformation', { authToken, displayName, bio, slug })
    return response.data;

  } catch (error) {
    console.log(error)
  }
} 