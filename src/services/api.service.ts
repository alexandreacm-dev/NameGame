import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://namegame.willowtreeapps.com/api/v1.0/'
})