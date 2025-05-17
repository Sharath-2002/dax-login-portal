
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  email: string;
  isVerified: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginResponse {
  user: User;
  token: string;
}
