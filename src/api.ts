import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

export const fetchPosts = async () => {
    const response = await apiClient.get('/posts');
    return response.data;
};