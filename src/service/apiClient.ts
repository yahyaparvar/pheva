import history from "app/router/history";
import { AppPages } from "app/types";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { LocalStorageKeys, storage } from "store/storage";

export const AuthBaseUrl = `https://auth.base.url`;
export const baseURL = `https://pheva-backend.vercel.app/`;

interface ErrorResponse {
  message: string;
  status: number;
  response?: {
    status: number;
  };
  config?: InternalAxiosRequestConfig;
}

interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 60000, 
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.read(LocalStorageKeys.USER_INFO)?.access_token;
    const refreshToken = storage.read(
      LocalStorageKeys.USER_INFO
    )?.refresh_token;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (refreshToken) {
      config.headers["x-refresh-token"] = refreshToken;
    }
    return config;
  },
  (error: ErrorResponse) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Update the access token if a new one is provided by the backend
    if (response.data.newAccessToken) {
      storage.write(LocalStorageKeys.USER_INFO, {
        ...storage.read(LocalStorageKeys.USER_INFO),
        access_token: response.data.newAccessToken,
      });
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401 || error.response?.status === 500) {
      storage.clear();
      history.push(AppPages.Login);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
