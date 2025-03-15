
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface EnrollButtonProps {
  courseId: string;
  isEnrolled?: boolean;
  onEnrollmentChange?: () => void;
  variant?: 'default' | 'outline' | 'secondary';
}

export function EnrollButton({ 
  courseId, 
  isEnrolled = false, 
  onEnrollmentChange,
  variant = 'default'
}: EnrollButtonProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleEnrollment = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to enroll in courses",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      if (isEnrolled) {
        // Unenroll
        const { error } = await supabase
          .from('enrollments')
          .delete()
          .eq('user_id', user.id)
          .eq('course_id', courseId);

        if (error) throw error;

        toast({
          title: "Unenrolled",
          description: "You have been unenrolled from this course",
        });
      } else {
        // Enroll
        const { error } = await supabase
          .from('enrollments')
          .insert({
            user_id: user.id,
            course_id: courseId,
            enrolled_at: new Date().toISOString()
          });

        if (error) throw error;

        toast({
          title: "Enrolled",
          description: "You have successfully enrolled in this course",
        });
      }

      // Notify parent of enrollment change
      if (onEnrollmentChange) {
        onEnrollmentChange();
      }
    } catch (error) {
      console.error('Error with enrollment:', error);
      toast({
        title: "Error",
        description: `Failed to ${isEnrolled ? 'unenroll from' : 'enroll in'} course`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleEnrollment}
      disabled={loading}
      variant={variant}
      className={`${!isEnrolled ? 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary' : ''}`}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {isEnrolled ? 'Unenrolling...' : 'Enrolling...'}
        </>
      ) : (
        isEnrolled ? 'Unenroll' : 'Enroll Now'
      )}
    </Button>
  );
}
