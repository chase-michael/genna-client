import axios from 'axios';

export async function getGuidedByAiOptions() {

  try {
    const response = await axios.post('https://stark-forest-35371-d6c7fd4f4fa3.herokuapp.com/openai/getGuidedByAiOptions')
    return response.data;

  } catch (error) {
    console.log(error)
  }
}
