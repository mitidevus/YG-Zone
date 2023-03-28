import axios from 'axios';
export default axios.create({
    baseURL: 'https://db.ygoprodeck.com/api/v7',
});