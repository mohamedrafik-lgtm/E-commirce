import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5190',
    timeout:13000
  });

  export default axiosInstance