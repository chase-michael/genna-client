import axios from 'axios';

export async function saveFinalWork(url, title) {

  const artistId = JSON.parse(localStorage.getItem('userData'))._id;

  try {
    const response = await axios.post('http://localhost:3005/upload/saveFinalWork', { url, title, artistId })
    return response.data;

  } catch (error) {
    console.log(error)
  }
}
