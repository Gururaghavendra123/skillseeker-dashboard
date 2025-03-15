
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import AuthModal from '@/components/auth/AuthModal';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      // The AuthModal will be opened by the button
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Header />
      
      <main className="flex-1 flex flex-col">
        <Hero />
        
        <section className="container mx-auto px-4 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Start Your Learning Journey Today
            </h2>
            <p className="text-muted-foreground mb-8">
              SkillSeeker helps you track your learning progress, discover new courses, and achieve your career goals.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {user ? (
                <Button 
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <AuthModal 
                    trigger={
                      <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary">
                        Get Started
                      </Button>
                    }
                    defaultView="signup"
                  />
                  <AuthModal 
                    trigger={
                      <Button variant="outline">
                        Sign In
                      </Button>
                    }
                    defaultView="signin"
                  />
                </>
              )}
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-gradient-to-br from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert-Led Courses</h3>
                <p className="text-muted-foreground">Learn from industry experts with practical, up-to-date content</p>
              </div>
              
              <div className="glass-card p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <LineChart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Your Progress</h3>
                <p className="text-muted-foreground">Visualize your skill development and set meaningful goals</p>
              </div>
              
              <div className="glass-card p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Trophy className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Earn Certificates</h3>
                <p className="text-muted-foreground">Showcase your achievements and build your professional profile</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

import { GraduationCap, LineChart, Trophy } from 'lucide-react';

export default Index;
