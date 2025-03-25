import { AuthResponse, LoginCredentials, SignupCredentials } from '../../models/authmodels/authModels';
import axiosInstance from '../axios/Axios';

export async function nativeLogin(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await axiosInstance.post<AuthResponse>('/Authentication/NativeLogin', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
}

export async function nativeSignup(credentials: SignupCredentials): Promise<AuthResponse> {
  try {
    const response = await axiosInstance.post<AuthResponse>('Authentication/NativeRegister', credentials);
    return response.data;
  } catch (error: any) {
    console.log(error)
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
}

export async function logOutAsync(): Promise<AuthResponse> {
  try {
    const response = await axiosInstance.post<AuthResponse>('/Authentication/LogoutAsync');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Log out failed');
  }
}