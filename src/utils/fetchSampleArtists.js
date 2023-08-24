import axios from 'axios';

export async function fetchSampleArtists(numberOfArtists) {
  try {
    const response =
      await axios.get('https://stark-forest-35371-d6c7fd4f4fa3.herokuapp.com/fetch/sampleArtists',
        { params: { numberOfArtists } });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}