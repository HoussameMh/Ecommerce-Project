import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://nova-market-api.vercel.app'
});

export default api;