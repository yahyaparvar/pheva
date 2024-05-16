import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { LocalStorageKeys, storage } from "store/storage";

export const AuthBaseUrl = `https://auth.base.url`;
export const baseURL = `http://localhost:8000/`;

interface ErrorResponse {
  message: string;
  status: number;
  response?: {
    status: number;
  };
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.read(LocalStorageKeys.USER_INFO)?.access_token;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: ErrorResponse) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: ErrorResponse) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized error (e.g., redirect to login)
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
