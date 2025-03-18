
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { CheckCircle, UserPlus } from 'lucide-react';

interface EnrollButtonProps {
  courseId: string;
  isEnrolled: boolean;
  onEnrollmentChange: () => void;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function EnrollButton({ 
  courseId, 
  isEnrolled, 
  onEnrollmentChange,
  variant = "default",
  size = "default"
}: EnrollButtonProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleEnroll = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please sign in to enroll in courses",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          course_id: courseId
        });
        
      if (error) throw error;
      
      toast({
        title: "Success!",
        description: "You have successfully enrolled in this course",
      });
      
      onEnrollmentChange();
    } catch (error: any) {
      console.error('Error enrolling in course:', error);
      toast({
        title: "Enrollment failed",
        description: error.message || "An error occurred while enrolling",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnenroll = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('enrollments')
        .delete()
        .eq('user_id', user.id)
        .eq('course_id', courseId);
        
      if (error) throw error;
      
      toast({
        title: "Course removed",
        description: "You have been unenrolled from this course",
      });
      
      onEnrollmentChange();
    } catch (error: any) {
      console.error('Error unenrolling from course:', error);
      toast({
        title: "Unenrollment failed",
        description: error.message || "An error occurred while unenrolling",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isEnrolled) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size={size}
            className="flex items-center gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            Enrolled
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unenroll from course?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to unenroll from this course? You can always enroll again later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleUnenroll}
              disabled={isLoading}
            >
              {isLoading ? 'Unenrolling...' : 'Unenroll'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleEnroll}
      disabled={isLoading}
      className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary flex items-center gap-2"
    >
      {isLoading ? 'Enrolling...' : (
        <>
          <UserPlus className="h-4 w-4" />
          Enroll Now
        </>
      )}
    </Button>
  );
}
