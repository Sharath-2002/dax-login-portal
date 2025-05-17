
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AuthForm from '../components/AuthForm';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { authService } from '../services/authService';
import { useToast } from '@/components/ui/use-toast';
import VerificationMessage from '../components/VerificationMessage';

const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [sentToEmail, setSentToEmail] = useState('');
  const { toast } = useToast();

  const handleForgotPassword = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      await authService.requestPasswordReset(data.email);
      setEmailSent(true);
      setSentToEmail(data.email);
      toast({
        title: 'Reset Link Sent!',
        description: 'Please check your email for password reset instructions.',
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send reset link. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 p-4">
        {!emailSent ? (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Reset Password</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-center text-sm text-gray-600">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <AuthForm
                type="forgotPassword"
                onSubmit={handleForgotPassword}
                isLoading={isLoading}
              />
            </CardContent>
            <CardFooter className="flex justify-center text-sm">
              <Link to="/login" className="text-blue-600 hover:text-blue-800">
                Back to login
              </Link>
            </CardFooter>
          </Card>
        ) : (
          <VerificationMessage
            title="Check Your Email"
            message={`We've sent a password reset link to ${sentToEmail}. Please check your inbox and follow the instructions.`}
            action={{ label: 'Back to Login', link: '/login' }}
          />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
