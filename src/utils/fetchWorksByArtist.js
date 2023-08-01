import axios from 'axios';

export async function fetchWorksByArtist(artistId) {
  try {
    const response =
      await axios.get('http://localhost:3005/fetch/worksByArtist',
        { params: { artistId } });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}