
import React, { useState } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Plus, Check, Loader2 } from 'lucide-react';

interface EnrollButtonProps extends ButtonProps {
  courseId: string;
  isEnrolled: boolean;
  onEnrollmentChange?: () => void;
}

export function EnrollButton({ 
  courseId, 
  isEnrolled, 
  onEnrollmentChange,
  className, 
  ...props 
}: EnrollButtonProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEnrollment = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to enroll in courses",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    setLoading(true);
    
    try {
      if (isEnrolled) {
        // Unenroll from course
        const { error } = await supabase
          .from('enrollments')
          .delete()
          .eq('user_id', user.id)
          .eq('course_id', courseId);
          
        if (error) throw error;
        
        toast({
          title: "Unenrolled successfully",
          description: "You've been unenrolled from this course",
        });
      } else {
        // Enroll in course
        const { error } = await supabase
          .from('enrollments')
          .insert({
            user_id: user.id,
            course_id: courseId,
          });
          
        if (error) throw error;
        
        toast({
          title: "Enrolled successfully",
          description: "You've been enrolled in this course",
        });
      }
      
      // Call the onEnrollmentChange callback if provided
      if (onEnrollmentChange) {
        onEnrollmentChange();
      }
    } catch (error: any) {
      console.error('Enrollment error:', error);
      
      toast({
        title: `Failed to ${isEnrolled ? 'unenroll from' : 'enroll in'} course`,
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleEnrollment}
      disabled={loading}
      className={`${className} ${isEnrolled 
        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : isEnrolled ? (
        <Check className="h-4 w-4 mr-2" />
      ) : (
        <Plus className="h-4 w-4 mr-2" />
      )}
      {isEnrolled ? "Enrolled" : "Enroll Now"}
    </Button>
  );
}
