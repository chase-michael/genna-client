import axios from 'axios';

export async function fetchArtistById(artistId) {
    try {
        const response =
            await axios.get('http://localhost:3005/search/getArtistById', { params: { artistId: artistId } });
            return response.data;

    } catch (error) {
        console.log(error);
    }
}
