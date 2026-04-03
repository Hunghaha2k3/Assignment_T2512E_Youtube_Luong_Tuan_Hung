import axios from 'axios';

const KEY = 'AIzaSyD99lBnlv9qEccw216J5horLFZHzVXEVfo';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 12,
        key: KEY,
        type: 'video'
    }
});