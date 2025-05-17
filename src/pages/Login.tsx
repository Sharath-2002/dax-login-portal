
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import { LoginCredentials } from '../types/auth';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data: LoginCredentials) => {
    setIsLoading(true);
    try {
      await login(data);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
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
            <CardTitle className="text-center text-2xl">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <AuthForm 
              type="login" 
              onSubmit={handleLogin} 
              isLoading={isLoading} 
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 text-center text-sm">
            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800">
              Forgot your password?
            </Link>
            <div>
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-800">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
