
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';

export const OnboardingDialog = () => {
  const { user, profile, updateProfile } = useAuth();
  const { completedOnboarding, setCompletedOnboarding } = useOnboarding();
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    username: profile?.username || '',
    bio: profile?.bio || '',
    interests: profile?.interests || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username.trim()) {
      toast({
        title: 'Username is required',
        description: 'Please enter a username to continue.',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      await updateProfile({
        username: formData.username,
        bio: formData.bio,
        interests: formData.interests
      });
      
      setCompletedOnboarding(true);
      setIsOpen(false);
      
      toast({
        title: 'Profile updated successfully',
        description: 'Your profile has been set up. Welcome to SkillSeeker!'
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error updating profile',
        description: 'There was an error saving your profile information. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen && !completedOnboarding} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] gradient-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome to SkillSeeker!
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <p className="text-center text-muted-foreground mb-6">
            Let's set up your profile to get started on your learning journey.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username<span className="text-red-500">*</span></Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                required
              />
              <p className="text-xs text-muted-foreground">This is how others will see you on the platform</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us a bit about yourself"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="interests">Learning Interests</Label>
              <Textarea
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="What skills are you interested in learning? (e.g., Web Development, Design, Data Science)"
                rows={2}
              />
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Complete Setup'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
