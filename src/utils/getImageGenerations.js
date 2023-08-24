import axios from 'axios';

export async function getImageGenerations(prompt) {

  try {
    const response = await axios.post('https://stark-forest-35371-d6c7fd4f4fa3.herokuapp.com/openai/getImageGenerations', { prompt })
    return response.data;

  } catch (error) {
    console.log(error)
  }
}
