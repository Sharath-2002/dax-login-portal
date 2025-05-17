
import { LoginCredentials, RegisterData, ResetPasswordData, VerifyOtpData } from '../types/auth';

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

  // Step 1: Request OTP for registration
  requestRegistrationOtp: async (email: string) => {
    // Simulate API call to Django backend that sends an OTP to the user's email
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && email.includes('@')) {
          resolve({
            message: 'OTP sent to your email address.'
          });
        } else {
          reject(new Error('Invalid email address'));
        }
      }, 800);
    });
  },

  // Step 2: Verify OTP
  verifyOtp: async (data: VerifyOtpData) => {
    // Simulate API call to Django backend to verify OTP
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, let's say "123456" is our valid OTP
        if (data.otp === "123456") {
          resolve({
            message: 'OTP verified successfully.',
            verified: true
          });
        } else {
          reject(new Error('Invalid OTP'));
        }
      }, 800);
    });
  },

  // Step 3: Complete registration after OTP verification
  completeRegistration: async (data: RegisterData) => {
    // Simulate API call to Django backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email && data.password === data.confirmPassword) {
          resolve({
            message: 'Registration successful! You can now log in to your account.'
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
