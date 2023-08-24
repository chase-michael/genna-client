import axios from 'axios';

export async function fetchSampleWorks(numberOfWorks) {
  try {
    const response =
      await axios.get('https://stark-forest-35371-d6c7fd4f4fa3.herokuapp.com/fetch/sampleWorks',
        { params: { numberOfWorks } });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}