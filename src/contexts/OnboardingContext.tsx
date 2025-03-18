
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

type OnboardingContextType = {
  shouldShowOnboarding: boolean;
  completedOnboarding: boolean;
  setCompletedOnboarding: (completed: boolean) => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedOnboarding, setCompletedOnboarding] = useState(false);
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);
  const { user, profile, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user && profile) {
      // Check if the user has completed the necessary profile fields
      const hasCompletedProfile = !!profile.username;
      setCompletedOnboarding(hasCompletedProfile);
      setShouldShowOnboarding(true);
    }
  }, [user, profile, isLoading]);

  return (
    <OnboardingContext.Provider value={{ 
      shouldShowOnboarding, 
      completedOnboarding, 
      setCompletedOnboarding
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
