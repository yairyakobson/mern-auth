import axios from "axios";

const apiOptions = {
  baseURL: import.meta.env.VITE_API_URL, // Vite environment variable 
  withCredentials: true
}

const TokenRefreshClient = axios.create(apiOptions);
TokenRefreshClient.interceptors.response.use((response) => response.data);

const API = axios.create(apiOptions);

API.interceptors.response.use(
  (response) => response.data, // Returns our data before our response

  (error) =>{ // Returns an error with a status code and message
    console.error("API Error:", error);
    
    if(!error.response){
      return Promise.reject({
        status: 0,
        message: "Network error or server unreachable" });
    }
    const { status, data } = error.response
    return Promise.reject({ status, ...data })
  }
);

export default API;