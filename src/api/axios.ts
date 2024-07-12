import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://10.0.2.2:3030',
  //baseURL: 'http://localhost:3030',
  baseURL: 'http://43.202.37.122:3030',
  withCredentials: true,
});

export default axiosInstance;
