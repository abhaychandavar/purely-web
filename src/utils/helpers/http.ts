import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const isServer = typeof window === 'undefined';

// Create a custom Axios instance
const createAxiosInstance = (): AxiosInstance => {
  let baseURL: string;

  if (isServer) {
    // Running on the server
    baseURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080'; // Adjust as needed
  } else {
    // Running on the client
    baseURL = window.location.origin;
  }

  // Create the Axios instance
  const instance = axios.create({
    baseURL,
  });

  // Add request interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Modify config as needed, e.g., add headers
      return config;
    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
  );

  return instance;
};

// Export a single instance
const axiosInstance = createAxiosInstance();
export default axiosInstance;
