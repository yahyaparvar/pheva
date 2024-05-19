import axios, {
  AxiosError,
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
  config?: InternalAxiosRequestConfig;
}

interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
}

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = storage.read(LocalStorageKeys.USER_INFO)?.refresh_token;
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await axios.post<RefreshTokenResponse>(
    `${baseURL}auth/refresh-token`,
    { code: refreshToken }
  );

  const { accessToken } = response.data;
  storage.write(LocalStorageKeys.USER_INFO, {
    ...storage.read(LocalStorageKeys.USER_INFO),
    access_token: accessToken,
  });
  // window.location.reload();
  return accessToken;
};

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
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshAccessToken();
          isRefreshing = false;
          onRefreshed(newToken);
        } catch (refreshError) {
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axios(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
