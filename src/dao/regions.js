import axios from 'axios';
import Url from 'url';

export default {
    fetch() {
        return axios.get('api/v0/regions');
    }
}
