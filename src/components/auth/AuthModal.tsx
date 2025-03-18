
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

type AuthModalProps = {
  trigger?: React.ReactNode;
  defaultView?: 'signin' | 'signup';
};

const AuthModal: React.FC<AuthModalProps> = ({ trigger, defaultView = 'signin' }) => {
  const [view, setView] = useState<'signin' | 'signup'>(defaultView);
  const [isOpen, setIsOpen] = useState(false);

  const handleViewChange = (newView: 'signin' | 'signup') => {
    setView(newView);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="ghost">Sign In</Button>}
      </DialogTrigger>
      
      <DialogContent className="w-full max-w-md gradient-card">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {view === 'signin' ? 'Welcome Back' : 'Create Your Account'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          {view === 'signin' ? (
            <SignInForm onSuccess={() => setIsOpen(false)} />
          ) : (
            <SignUpForm onSuccess={() => setIsOpen(false)} />
          )}
          
          <div className="mt-4 text-center">
            {view === 'signin' ? (
              <p className="text-sm">
                Don't have an account?{' '}
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-primary"
                  onClick={() => handleViewChange('signup')}
                >
                  Sign Up
                </Button>
              </p>
            ) : (
              <p className="text-sm">
                Already have an account?{' '}
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-primary"
                  onClick={() => handleViewChange('signin')}
                >
                  Sign In
                </Button>
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
