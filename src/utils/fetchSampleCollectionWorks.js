import axios from 'axios';

export async function fetchSampleCollectionWorks(workCollection, numberOfWorks) {
  try {
    const response =
      await axios.get('http://localhost:3005/fetch/sampleCollectionWorks',
        { params: { workCollection, numberOfWorks } });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}