import axios from 'axios';

export const NETWORK_DELAY = process.env.NEXT_PUBLIC_NETWORK_DELAY;

const httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// Add a request interceptor
httpClient.interceptors.request.use(function (config) {
  // Todo
  return config;
  // Do something before request is sent
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default httpClient;
