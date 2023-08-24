import axios from 'axios';

export async function getImageColors(image) {
  try {
      
      const response = await axios.get('https://stark-forest-35371-d6c7fd4f4fa3.herokuapp.com/util/getImageColors', { params: { image } });
      return response.data;

  } catch (error) {
      console.log(error);
  }
}