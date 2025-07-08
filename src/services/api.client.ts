import axios from 'axios';

const URL = process.env.EXPO_PUBLIC_FAKE_API_URL

export const apiClient = axios.create({
    baseURL: URL
})