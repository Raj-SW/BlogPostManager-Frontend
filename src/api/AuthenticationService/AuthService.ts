import axiosInstance from '../Axios/Axios';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface user {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  token: string;
  userId: string;
  userName: string;
}

export interface AuthResponse {
  errorMesage: [];
  isSuccess: boolean;
  resultObject: user;
}

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
    const response = await axiosInstance.post<AuthResponse>('/Authentication/NativeRegister', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
}
