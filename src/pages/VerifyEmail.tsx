
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import VerificationMessage from '../components/VerificationMessage';
import { authService } from '../services/authService';
import { useToast } from '@/components/ui/use-toast';

const VerifyEmail: React.FC = () => {
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = location.state?.email || 'your email';
  const { toast } = useToast();

  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        setVerifying(true);
        try {
          await authService.verifyEmail(token);
          setVerified(true);
          toast({
            title: 'Email Verified!',
            description: 'Your email has been verified successfully.',
          });
        } catch (error) {
          console.error('Verification error:', error);
          toast({
            variant: 'destructive',
            title: 'Verification Failed',
            description: 'Invalid or expired verification token.',
          });
        } finally {
          setVerifying(false);
        }
      };
      verifyToken();
    }
  }, [token, toast]);

  let content;
  if (token) {
    if (verifying) {
      content = (
        <VerificationMessage
          title="Verifying Your Email"
          message="Please wait while we verify your email address..."
        />
      );
    } else if (verified) {
      content = (
        <VerificationMessage
          title="Email Verified!"
          message="Your email has been verified successfully. You can now log in to your account."
          action={{ label: 'Log In', link: '/login' }}
        />
      );
    } else {
      content = (
        <VerificationMessage
          title="Verification Failed"
          message="Invalid or expired verification token. Please request a new verification email."
          action={{ label: 'Back to Login', link: '/login' }}
        />
      );
    }
  } else {
    content = (
      <VerificationMessage
        title="Verify Your Email"
        message={`We've sent a verification link to ${email}. Please check your inbox and click the link to verify your account.`}
        action={{ label: 'Back to Login', link: '/login' }}
      />
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 p-4">
        {content}
      </div>
    </div>
  );
};

export default VerifyEmail;
