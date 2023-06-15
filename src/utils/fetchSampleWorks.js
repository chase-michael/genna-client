import axios from 'axios';

export async function fetchSampleWorks(numberOfWorks) {
  try {
    const response =
      await axios.get('http://localhost:3005/fetch/sampleWorks',
        { params: { numberOfWorks } });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}