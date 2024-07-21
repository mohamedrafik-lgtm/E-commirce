import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://94ed-197-160-202-76.ngrok-free.app',
    timeout:1000
  });

  export default axiosInstance