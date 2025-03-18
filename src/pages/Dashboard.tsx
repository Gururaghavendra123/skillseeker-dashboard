
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SkillDashboard } from '@/components/dashboard/SkillDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { OnboardingDialog } from '@/components/onboarding/OnboardingDialog';
import { useOnboarding } from '@/contexts/OnboardingContext';

const Dashboard = () => {
  const { user, isLoading, profile } = useAuth();
  const navigate = useNavigate();
  const { shouldShowOnboarding, completedOnboarding } = useOnboarding();
  
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/30 to-white">
      <Header />
      
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4">
          {shouldShowOnboarding && !completedOnboarding && <OnboardingDialog />}
          <SkillDashboard />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
