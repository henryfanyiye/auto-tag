import axios from 'axios';

export const postClient = (url, data) => {
    return axios.post(url, data).then(res => {
        return true;
    }).catch(err => {
        return false;
    });
};