
import React, { createContext, useState, useEffect, useContext } from 'react';
import { ProfileSetup } from '@/components/onboarding/ProfileSetup';
import { useAuth } from '@/contexts/AuthContext';

type OnboardingContextType = {
  isOnboarded: boolean;
  completeOnboarding: () => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnboarded, setIsOnboarded] = useState(true);
  const [showSetup, setShowSetup] = useState(false);
  const { user, profile } = useAuth();

  useEffect(() => {
    if (user && profile) {
      // Check if the user has completed onboarding
      const onboardingComplete = !!profile.username;
      setIsOnboarded(onboardingComplete);
      setShowSetup(!onboardingComplete);
    }
  }, [user, profile]);

  const completeOnboarding = () => {
    setIsOnboarded(true);
    setShowSetup(false);
    localStorage.setItem(`onboarded-${user?.id}`, 'true');
  };

  return (
    <OnboardingContext.Provider value={{ isOnboarded, completeOnboarding }}>
      {children}
      {showSetup && <ProfileSetup onComplete={completeOnboarding} />}
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
