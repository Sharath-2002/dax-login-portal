
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AuthForm from '../components/AuthForm';
import { RegisterData } from '../types/auth';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { authService } from '../services/authService';
import { useToast } from '@/components/ui/use-toast';

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      await authService.register(data);
      toast({
        title: 'Registration Successful!',
        description: 'Please check your email to verify your account.',
      });
      navigate('/verify-email', { state: { email: data.email } });
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Create an Account</CardTitle>
          </CardHeader>
          <CardContent>
            <AuthForm 
              type="register" 
              onSubmit={handleRegister} 
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
      </div>
    </div>
  );
};

export default Register;
