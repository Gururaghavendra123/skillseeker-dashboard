
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface OnboardingDialogProps {
  open: boolean;
  onComplete: () => void;
}

export const OnboardingDialog: React.FC<OnboardingDialogProps> = ({ open, onComplete }) => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { updateProfile, user } = useAuth();
  const navigate = useNavigate();
  
  const handleNext = () => {
    if (step === 1 && !username.trim()) {
      toast({
        title: 'Username required',
        description: 'Please enter a username to continue',
        variant: 'destructive'
      });
      return;
    }
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };
  
  const handleComplete = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      await updateProfile({
        username,
        bio,
        interests
      });
      
      toast({
        title: 'Profile setup complete!',
        description: 'Your profile has been successfully set up',
      });
      
      onComplete();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to complete profile setup',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDestinationClick = (path: string) => {
    navigate(path);
    onComplete();
  };
  
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-background to-secondary/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {step === 1 ? 'Welcome to SkillSeeker!' : 
             step === 2 ? 'Tell us about yourself' : 
             'What would you like to do?'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {step === 1 ? 'Let\'s set up your profile to get started' : 
             step === 2 ? 'This helps us personalize your experience' : 
             'You\'re all set! Where would you like to go next?'}
          </DialogDescription>
        </DialogHeader>
        
        {step === 1 && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio" 
                placeholder="Tell us a bit about yourself"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="interests">Interests</Label>
              <Textarea 
                id="interests" 
                placeholder="What topics are you interested in?"
                rows={2}
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-3">
              <Button 
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary justify-between"
                onClick={() => handleDestinationClick('/courses')}
              >
                <span>Explore Courses</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                className="justify-between"
                onClick={() => handleDestinationClick('/skills')}
              >
                <span>Manage My Skills</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                className="justify-between"
                onClick={() => handleDestinationClick('/dashboard')}
              >
                <span>Go to Dashboard</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        
        {step < 3 && (
          <Button 
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Continue'}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};
