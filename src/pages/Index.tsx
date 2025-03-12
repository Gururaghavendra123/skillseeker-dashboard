
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  BookOpen, 
  BarChart, 
  Compass, 
  Award,
  CheckCircle,
  Users
} from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: 'Personalized Learning',
    description: 'Get a learning path tailored to your skill level and goals.'
  },
  {
    icon: <BarChart className="h-8 w-8" />,
    title: 'Track Progress',
    description: 'Monitor your growth with detailed analytics and insights.'
  },
  {
    icon: <Compass className="h-8 w-8" />,
    title: 'Discover Skills',
    description: 'Explore new skills based on your interests and career path.'
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: 'Earn Certificates',
    description: 'Receive certificates upon completing courses and milestones.'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        
        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Master Skills Faster with Smart Learning</h2>
              <p className="text-xl text-muted-foreground">Our AI-powered platform helps you identify gaps and provides targeted resources to accelerate your learning.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="text-primary mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* How it Works Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How SkillSeeker Works</h2>
              <p className="text-xl text-muted-foreground">Three simple steps to transform your learning journey</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 animate-fade-up">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Identify Your Goals</h3>
                <p className="text-muted-foreground">Tell us what skills you want to develop and your current level.</p>
              </div>
              
              <div className="text-center p-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Get Your Path</h3>
                <p className="text-muted-foreground">Receive a customized learning path with curated resources.</p>
              </div>
              
              <div className="text-center p-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Grow Your Skills</h3>
                <p className="text-muted-foreground">Track your progress and adapt your learning as you improve.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonial Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center bg-secondary p-2 rounded-full mb-6">
                <Users className="h-5 w-5 mr-2 text-primary" />
                <span className="text-sm font-medium">Join 10,000+ learners</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Loved by learners worldwide</h2>
              
              <blockquote className="text-xl md:text-2xl italic mb-6">
                "SkillSeeker helped me identify exactly what I needed to learn next. I've made more progress in 3 months than I did in the past year."
              </blockquote>
              
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div className="text-left">
                  <div className="font-medium">Sarah Johnson</div>
                  <div className="text-sm text-muted-foreground">UX Designer</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to accelerate your learning?</h2>
              <p className="text-xl mb-8 text-primary-foreground/80">Join SkillSeeker today and take control of your skill development.</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <a href="/dashboard">Get Started</a>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
