
import React from 'react';
import { TooltipProvider as RadixTooltipProvider } from '@radix-ui/react-tooltip';

export const TargetTooltipProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <RadixTooltipProvider>
      {children}
    </RadixTooltipProvider>
  );
};
