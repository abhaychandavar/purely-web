import axios, { AxiosRequestConfig } from 'axios';
import { getAuth, User } from 'firebase/auth';

const isClient = typeof window !== 'undefined';

// Create an Axios instance
const pAxios = axios.create({
  baseURL: '/api', // Set your base URL here
});

// Add a request interceptor to attach the Firebase ID token
pAxios.interceptors.request.use(
  async (config: any) => {
    console.log('IS CLIENT', isClient);
    if (isClient) {
      try {
        const auth = getAuth();
        const user: User | null = auth.currentUser;

        if (user) {
          // Get the Firebase ID token
          const token = await user.getIdToken();
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          } as AxiosRequestConfig['headers'];
        }
      } catch (error) {
        console.log('Failed to get Firebase token:', error);
      }
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default pAxios;
