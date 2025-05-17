
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { VerifyOtpData } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

interface OtpVerificationProps {
  email: string;
  onVerified: () => void;
  onResendOtp: () => Promise<void>;
  onVerifyOtp: (data: VerifyOtpData) => Promise<void>;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
  email,
  onVerified,
  onResendOtp,
  onVerifyOtp
}) => {
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { toast } = useToast();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        variant: 'destructive',
        title: 'Invalid OTP',
        description: 'Please enter a valid 6-digit OTP code',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onVerifyOtp({ email, otp });
      toast({
        title: 'OTP Verified',
        description: 'Your email has been verified successfully.',
      });
      onVerified();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Verification Failed',
        description: 'Invalid OTP code. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await onResendOtp();
      toast({
        title: 'OTP Resent',
        description: 'A new OTP code has been sent to your email.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to Resend OTP',
        description: 'Please try again later.',
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Verify Your Email</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center text-sm text-gray-600">
          We've sent a 6-digit OTP to <span className="font-medium">{email}</span>. 
          Please enter the code below to verify your email address.
        </div>
        
        <div className="flex justify-center py-4">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        
        <Button 
          className="w-full" 
          onClick={handleVerify}
          disabled={isSubmitting || otp.length !== 6}
        >
          {isSubmitting ? 'Verifying...' : 'Verify OTP'}
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          variant="link" 
          onClick={handleResend}
          disabled={isResending}
        >
          {isResending ? 'Sending...' : "Didn't receive a code? Resend"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OtpVerification;
