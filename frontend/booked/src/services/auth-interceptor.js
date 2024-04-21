import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create();

// Add an interceptor to handle outgoing HTTP requests
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the token from local storage
        const token = localStorage.getItem('token');
        
        // If a token is found, add it to the authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Return the modified config
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

export default axiosInstance;
