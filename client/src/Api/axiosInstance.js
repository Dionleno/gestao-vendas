import axios from "axios"; 

const AxiosInstance = (token) => {
  
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  axios.defaults.headers = {
    'Content-Type': 'application/json',
  }

  axios.interceptors.request.use((config) => { 
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });

  axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    const originalRequest = error.config;
    console.log(originalRequest._retry);
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      alert("Sua sessão expirou, realize o login novamente!");
    } else if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  })
}
export default AxiosInstance;