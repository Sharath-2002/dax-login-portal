
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuthFormProps {
  type: 'login' | 'register' | 'forgotPassword' | 'resetPassword';
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (type === 'login' || type === 'register' || type === 'forgotPassword') {
      if (!email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    if (type === 'login' || type === 'register' || type === 'resetPassword') {
      if (!password) {
        newErrors.password = 'Password is required';
      } else if (password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
    }
    
    if (type === 'register' || type === 'resetPassword') {
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateFields()) {
      return;
    }
    
    const data: any = {};
    
    if (type === 'login' || type === 'register' || type === 'forgotPassword') {
      data.email = email;
    }
    
    if (type === 'login' || type === 'register' || type === 'resetPassword') {
      data.password = password;
    }
    
    if (type === 'register' || type === 'resetPassword') {
      data.confirmPassword = confirmPassword;
    }
    
    onSubmit(data);
  };

  const renderFields = () => {
    return (
      <>
        {(type === 'login' || type === 'register' || type === 'forgotPassword') && (
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={cn(errors.email && "border-red-500")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>
        )}

        {(type === 'login' || type === 'register' || type === 'resetPassword') && (
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={cn(errors.password && "border-red-500")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOffIcon size={18} />
                ) : (
                  <EyeIcon size={18} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>
        )}

        {(type === 'register' || type === 'resetPassword') && (
          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className={cn(errors.confirmPassword && "border-red-500")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOffIcon size={18} />
                ) : (
                  <EyeIcon size={18} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
        )}
      </>
    );
  };

  const buttonText = {
    login: 'Sign In',
    register: 'Create Account',
    forgotPassword: 'Send Reset Link',
    resetPassword: 'Reset Password',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {renderFields()}

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Please wait...' : buttonText[type]}
      </Button>
    </form>
  );
};

export default AuthForm;
