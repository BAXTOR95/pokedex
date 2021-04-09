import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://pokedex-13253-default-rtdb.firebaseio.com/'
});

export default instance;