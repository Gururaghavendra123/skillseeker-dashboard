
import { toast } from '@/components/ui/use-toast';

export const handleApiError = (error: any, defaultMessage: string = "An error occurred") => {
  console.error(error);
  
  const errorMessage = error?.message || defaultMessage;
  
  toast({
    title: "Error",
    description: errorMessage,
    variant: "destructive",
  });
  
  return null;
};

export const withErrorHandling = async <T,>(
  promise: Promise<T>,
  errorMessage: string = "An error occurred"
): Promise<T | null> => {
  try {
    return await promise;
  } catch (error) {
    handleApiError(error, errorMessage);
    return null;
  }
};
