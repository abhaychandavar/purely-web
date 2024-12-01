import axios from "axios";
import config from '../config/config';

class mapsService {
    static getLocations = async ({query, pageToken}: {query?: string, pageToken?: string}) => {
        try {
            const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?${query ?`query=${query}`: `${pageToken}`}&key=${config.google.maps.apiKey}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            });
            return {
                results: data.results,
                nextPageToken: data.next_page_token
            }
        }
        catch (error) {
            console.error('Error getting location', error);
            return {results: []}
        }
    }
}

export default mapsService;