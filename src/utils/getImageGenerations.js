import axios from 'axios';

export async function getImageGenerations(prompt) {

  try {
    const response = await axios.post('http://localhost:3005/openai/getImageGenerations', { prompt })
    return response.data;

  } catch (error) {
    console.log(error)
  }
}
