import axios from 'axios';

const mockURL = 'http://localhost:3000/';

export const api = axios.create({
    baseURL: mockURL
})