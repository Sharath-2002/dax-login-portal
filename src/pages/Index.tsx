
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';

const Index: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md text-center">
          <h1 className="mb-4 text-3xl font-bold">Welcome to dX Onboarding</h1>
          
          {user ? (
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                You are logged in as <span className="font-semibold">{user.email}</span>
              </p>
              <Button onClick={handleLogout}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-lg text-gray-700">
                Please sign in to your account or create a new account to continue.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button className="flex-1" onClick={handleLogin}>
                  Sign In
                </Button>
                <Button 
                  className="flex-1" 
                  variant="outline" 
                  onClick={handleRegister}
                >
                  Create Account
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
