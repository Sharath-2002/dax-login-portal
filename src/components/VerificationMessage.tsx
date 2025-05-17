
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface VerificationMessageProps {
  title: string;
  message: string;
  action?: {
    label: string;
    link: string;
  };
}

const VerificationMessage: React.FC<VerificationMessageProps> = ({
  title,
  message,
  action,
}) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription className="text-center">
          {message}
        </CardDescription>
      </CardHeader>
      {action && (
        <CardContent className="flex justify-center">
          <Button asChild>
            <Link to={action.link}>{action.label}</Link>
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default VerificationMessage;
