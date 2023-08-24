import axios from 'axios';

export async function saveFinalWork(url, title) {

  const artistId = JSON.parse(localStorage.getItem('userData'))._id;

  try {
    const response = await axios.post('https://stark-forest-35371-d6c7fd4f4fa3.herokuapp.com/upload/saveFinalWork', { url, title, artistId })
    return response.data;

  } catch (error) {
    console.log(error)
  }
}
