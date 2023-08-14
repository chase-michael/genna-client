import axios from 'axios';

export async function getGuidedByAiOptions() {

  try {
    const response = await axios.post('http://localhost:3005/openai/getGuidedByAiOptions')
    return response.data;

  } catch (error) {
    console.log(error)
  }
}
