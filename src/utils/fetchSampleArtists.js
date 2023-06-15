import axios from 'axios';

export async function fetchSampleArtists(numberOfArtists) {
  try {
    const response =
      await axios.get('http://localhost:3005/fetch/sampleArtists',
        { params: { numberOfArtists } });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}