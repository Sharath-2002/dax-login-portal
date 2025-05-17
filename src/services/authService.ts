
import { LoginCredentials, RegisterData, ResetPasswordData } from '../types/auth';

// This is a placeholder service that would connect to your Django backend
// For now, it simulates API responses
export const authService = {
  login: async (credentials: LoginCredentials) => {
    // Simulate API call to Django backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email && credentials.password) {
          resolve({
            user: {
              id: '1',
              email: credentials.email,
              isVerified: true
            },
            token: 'dummy-jwt-token'
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  },

  register: async (data: RegisterData) => {
    // Simulate API call to Django backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email && data.password === data.confirmPassword) {
          resolve({
            message: 'Registration successful! Please check your email to verify your account.'
          });
        } else {
          reject(new Error('Registration failed'));
        }
      }, 800);
    });
  },

  verifyEmail: async (token: string) => {
    // Simulate API call to Django backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token) {
          resolve({
            message: 'Email verified successfully! You can now log in.'
          });
        } else {
          reject(new Error('Invalid verification token'));
        }
      }, 800);
    });
  },

  requestPasswordReset: async (email: string) => {
    // Simulate API call to Django backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email) {
          resolve({
            message: 'Password reset link sent! Please check your email.'
          });
        } else {
          reject(new Error('Email is required'));
        }
      }, 800);
    });
  },

  resetPassword: async (token: string, data: ResetPasswordData) => {
    // Simulate API call to Django backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token && data.password === data.confirmPassword) {
          resolve({
            message: 'Password reset successful! You can now log in with your new password.'
          });
        } else {
          reject(new Error('Password reset failed'));
        }
      }, 800);
    });
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    // In a real app, validate the token with your backend
    return {
      id: '1',
      email: 'user@example.com',
      isVerified: true
    };
  }
};
