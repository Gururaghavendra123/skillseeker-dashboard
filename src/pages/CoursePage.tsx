
import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CourseDetail } from '@/components/courses/CourseDetail';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';

const CoursePage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { shouldShowOnboarding, completedOnboarding } = useOnboarding();
  
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    } else if (!isLoading && user && shouldShowOnboarding && !completedOnboarding) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate, shouldShowOnboarding, completedOnboarding]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20 pb-20">
        <CourseDetail />
      </main>
      
      <Footer />
    </div>
  );
};

export default CoursePage;
