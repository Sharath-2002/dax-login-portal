
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
  const [name, setName] = useState('');
  const [registrationData, setRegistrationData] = useState<RegisterData | null>(null);
  const [step, setStep] = useState<'registration-details' | 'otp-verification' | 'password-setup'>('registration-details');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Step 1: Collect user details and request OTP
  const handleInitialSubmit = async (data: { name: string, email: string }) => {
    setIsLoading(true);
    try {
      setName(data.name);
      setEmail(data.email);
      await authService.requestRegistrationOtp(data.email);
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
    setStep('password-setup');
  };

  // Step 3: Complete Registration
  const handleRegister = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      setRegistrationData(data);
      await authService.completeRegistration({
        name: name,
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
      case 'registration-details':
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Create an Account</CardTitle>
            </CardHeader>
            <CardContent>
              <AuthForm 
                type="register-initial" // New type for initial registration
                onSubmit={handleInitialSubmit} 
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

      case 'password-setup':
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
                type="resetPassword" // We reuse the resetPassword form type for password fields
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
