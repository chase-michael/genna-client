import axios from 'axios';

export async function getImageColors(image) {
  try {
      
      const response = await axios.get('http://localhost:3005/util/getImageColors', { params: { image } });
      return response.data;

  } catch (error) {
      console.log(error);
  }
}