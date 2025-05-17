
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import AuthForm from '../components/AuthForm';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { authService } from '../services/authService';
import { useToast } from '@/components/ui/use-toast';
import { ResetPasswordData } from '../types/auth';
import VerificationMessage from '../components/VerificationMessage';

const ResetPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { toast } = useToast();

  const handleResetPassword = async (data: ResetPasswordData) => {
    if (!token) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Invalid or missing reset token.',
      });
      return;
    }

    setIsLoading(true);
    try {
      await authService.resetPassword(token, data);
      setResetComplete(true);
      toast({
        title: 'Password Reset Successful!',
        description: 'Your password has been reset successfully.',
      });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        variant: 'destructive',
        title: 'Reset Failed',
        description: 'Failed to reset password. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 p-4">
          <VerificationMessage
            title="Invalid Reset Link"
            message="The password reset link is invalid or has expired."
            action={{ label: 'Request New Link', link: '/forgot-password' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 p-4">
        {resetComplete ? (
          <VerificationMessage
            title="Password Reset Successful!"
            message="Your password has been reset successfully. You will be redirected to the login page."
            action={{ label: 'Log In Now', link: '/login' }}
          />
        ) : (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Create New Password</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-center text-sm text-gray-600">
                Please enter your new password below.
              </p>
              <AuthForm
                type="resetPassword"
                onSubmit={handleResetPassword}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
