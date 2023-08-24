import axios from 'axios';

export async function updateProfileImage(profileImage) {

  const authToken = localStorage.getItem('authToken');

  try {
    let formData = new FormData();
    formData.append('authToken', authToken);
    formData.append('profileImage', profileImage);
    const config = {     
      headers: { 'content-type': 'multipart/form-data' }
    }
    const response = await axios.post('https://stark-forest-35371-d6c7fd4f4fa3.herokuapp.com/upload/updateProfileImage', formData, config)
    return response;
  } catch (error) {
    console.log(error)
  }
}