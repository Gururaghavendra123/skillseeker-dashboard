
import React from 'react';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/auth/AuthModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, Star, Sparkles } from 'lucide-react';

export const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/90 -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-60 h-60 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-up">
            <Sparkles className="h-4 w-4 mr-2 text-primary" />
            <span>Accelerate your learning journey</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent animate-fade-up">
            Unlock Your Learning Potential
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 animate-fade-up animation-delay-100">
            Discover personalized learning paths, track your progress, and master new skills faster with AI-powered recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-200">
            {user ? (
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <>
                <AuthModal 
                  trigger={
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  }
                  defaultView="signup"
                />
                <AuthModal 
                  trigger={
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-primary/20 hover:bg-secondary/80"
                    >
                      Log In
                    </Button>
                  }
                  defaultView="signin"
                />
              </>
            )}
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-3 text-sm text-muted-foreground animate-fade-up animation-delay-300">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border border-white">
                <Star className="h-4 w-4 text-blue-600" />
              </div>
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center border border-white">
                <Star className="h-4 w-4 text-purple-600" />
              </div>
              <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center border border-white">
                <Star className="h-4 w-4 text-teal-600" />
              </div>
            </div>
            <span>Trusted by 10,000+ learners worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
};
