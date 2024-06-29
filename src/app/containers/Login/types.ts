import history from "app/router/history";
import { AppPages } from "app/types";
import { toast } from "react-toastify";
import axiosInstance from "service/apiClient";

/* --- STATE --- */
export interface LoginState {
  work: string;
  name: string;
  from: string;
  step: number;
}

export type ContainerState = LoginState;

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const result = await axiosInstance.post("auth/refresh-token", {
      refreshToken,
    });

    const { accessToken } = result.data;

    // Set another timeout for the next refresh
    return accessToken;
  } catch (error) {
    console.error("Error refreshing token", error);
    toast.error("Session expired. Please log in again.");
    history.push(AppPages.Login);
  }
};
