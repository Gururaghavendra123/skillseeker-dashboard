
import React, { createContext, useState, useEffect, useContext } from 'react';
import { ProfileSetup } from '@/components/onboarding/ProfileSetup';
import { useAuth } from '@/contexts/AuthContext';

type OnboardingContextType = {
  isOnboarded: boolean;
  completeOnboarding: () => void;
  showOnboarding: () => void;
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
      const storedOnboarding = localStorage.getItem(`onboarded-${user.id}`);
      
      if (onboardingComplete || storedOnboarding === 'true') {
        setIsOnboarded(true);
        setShowSetup(false);
      } else {
        setIsOnboarded(false);
        setShowSetup(true);
      }
    }
  }, [user, profile]);

  const completeOnboarding = () => {
    if (user) {
      setIsOnboarded(true);
      setShowSetup(false);
      localStorage.setItem(`onboarded-${user.id}`, 'true');
    }
  };
  
  const showOnboarding = () => {
    setShowSetup(true);
  };

  return (
    <OnboardingContext.Provider value={{ isOnboarded, completeOnboarding, showOnboarding }}>
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
