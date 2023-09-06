import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        'cache-control': 'max-age=43200',
        'content-type': 'application/json; charset=utf-8',
        expires: '-1',
        pragma: 'no-cache',
    },
});

export default instance;