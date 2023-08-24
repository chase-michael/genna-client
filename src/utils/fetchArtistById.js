import axios from 'axios';

export async function fetchArtistById(artistId) {
    try {
        const response =
            await axios.get('https://stark-forest-35371-d6c7fd4f4fa3.herokuapp.com/search/getArtistById', { params: { artistId: artistId } });
            return response.data;

    } catch (error) {
        console.log(error);
    }
}
