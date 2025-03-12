
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden hero-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="animate-fade-up space-y-2">
            <div className="inline-block bg-secondary px-3 py-1 rounded-full text-xs font-medium text-secondary-foreground mb-4">
              Personalized Learning
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Master New Skills with Personalized Learning Paths
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-up animation-delay-200">
            We analyze your goals and current skill level to create a customized learning experience that helps you grow faster.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-up animation-delay-300">
            <Button size="lg" asChild>
              <Link to="/dashboard">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-24 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-background"></div>
      <div className="absolute top-1/2 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
    </section>
  );
};
