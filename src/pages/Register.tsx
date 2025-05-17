
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AuthForm from '../components/AuthForm';
import OtpVerification from '../components/OtpVerification';
import { RegisterData, VerifyOtpData } from '../types/auth';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { authService } from '../services/authService';
import { useToast } from '@/hooks/use-toast';

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [registrationData, setRegistrationData] = useState<RegisterData | null>(null);
  const [step, setStep] = useState<'email-input' | 'otp-verification' | 'registration'>('email-input');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Step 1: Request OTP
  const handleRequestOtp = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      await authService.requestRegistrationOtp(data.email);
      setEmail(data.email);
      setStep('otp-verification');
      toast({
        title: 'OTP Sent!',
        description: 'Please check your email for the verification code.',
      });
    } catch (error) {
      console.error('OTP request error:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to Send OTP',
        description: 'Please check your email and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP if needed
  const handleResendOtp = async (): Promise<void> => {
    try {
      await authService.requestRegistrationOtp(email);
    } catch (error) {
      console.error('Error resending OTP:', error);
      throw error;
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (data: VerifyOtpData): Promise<void> => {
    try {
      await authService.verifyOtp(data);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  };

  // After OTP verification
  const handleOtpVerified = () => {
    setStep('registration');
  };

  // Step 3: Complete Registration
  const handleRegister = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      setRegistrationData(data);
      await authService.completeRegistration({
        email: email, // Use the verified email
        password: data.password,
        confirmPassword: data.confirmPassword
      });
      toast({
        title: 'Registration Successful!',
        description: 'You can now log in with your credentials.',
      });
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: 'Please check your information and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'email-input':
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Create an Account</CardTitle>
            </CardHeader>
            <CardContent>
              <AuthForm 
                type="forgotPassword" // We reuse the forgotPassword form type as it only has email field
                onSubmit={handleRequestOtp} 
                isLoading={isLoading} 
              />
            </CardContent>
            <CardFooter className="flex justify-center text-sm">
              <div>
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-800">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        );

      case 'otp-verification':
        return (
          <OtpVerification
            email={email}
            onVerified={handleOtpVerified}
            onResendOtp={handleResendOtp}
            onVerifyOtp={handleVerifyOtp}
          />
        );

      case 'registration':
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Complete Registration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-center text-sm text-gray-600">
                Email verified: <span className="font-medium">{email}</span>
              </div>
              <AuthForm 
                type="resetPassword" // We reuse the resetPassword form type as it only has password fields
                onSubmit={handleRegister} 
                isLoading={isLoading} 
              />
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 p-4">
        {renderStep()}
      </div>
    </div>
  );
};

export default Register;
