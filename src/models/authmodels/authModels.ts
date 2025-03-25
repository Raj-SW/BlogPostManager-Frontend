export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
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

