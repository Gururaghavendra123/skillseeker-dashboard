
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

interface ProfileSetupProps {
  onComplete: () => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete }) => {
  const { updateProfile, user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });
  
  const { formState } = form;
  const isSubmitting = formState.isSubmitting;

  const onSubmit = async (data: FormValues) => {
    try {
      await updateProfile({
        username: data.username
      });
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully set up!',
      });
      
      setStep(2);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    }
  };

  const handleComplete = () => {
    onComplete();
  };
  
  const navigateTo = (path: string) => {
    navigate(path);
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md border-none shadow-lg bg-gradient-to-b from-background to-secondary/10">
        {step === 1 ? (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome to SkillSeeker!</CardTitle>
              <CardDescription>Let's set up your profile to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Choose a username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Continue'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">You're all set!</CardTitle>
              <CardDescription>Where would you like to go next?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => navigateTo('/courses')} 
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
              >
                Browse Courses
              </Button>
              <Button 
                onClick={() => navigateTo('/skills')} 
                variant="outline" 
                className="w-full"
              >
                Update Your Skills
              </Button>
              <Button 
                onClick={() => navigateTo('/dashboard')} 
                variant="outline" 
                className="w-full"
              >
                Go to Dashboard
              </Button>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleComplete} 
                variant="ghost" 
                className="w-full text-muted-foreground"
              >
                Maybe Later
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};
