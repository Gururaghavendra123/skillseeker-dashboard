
import React, { useEffect, useState } from 'react';
import { SkillProgress } from './SkillProgress';
import { CourseRecommendation } from './CourseRecommendation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SkillDashboard = () => {
  const [skillsData, setSkillsData] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock courses data
  const coursesData = [
    {
      id: '1',
      title: 'Advanced React Patterns',
      description: 'Learn to implement advanced React patterns to build more maintainable components.',
      image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      category: 'Web Development',
      duration: '6 hours',
      level: 'Advanced' as const,
    },
    {
      id: '2',
      title: 'TypeScript Fundamentals',
      description: 'Master the basics of TypeScript to improve your JavaScript development workflow.',
      image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      category: 'Programming',
      duration: '4 hours',
      level: 'Beginner' as const,
    },
    {
      id: '3',
      title: 'UI/UX Design Principles',
      description: 'Learn the core principles of designing intuitive user interfaces and experiences.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      category: 'Design',
      duration: '8 hours',
      level: 'Intermediate' as const,
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch skills
        const { data: skillsData, error: skillsError } = await supabase
          .from('skills')
          .select('*')
          .eq('user_id', user.id);
          
        if (skillsError) throw skillsError;
        
        setSkillsData(skillsData?.map(skill => ({
          ...skill,
          color: getColorForCategory(skill.category)
        })) || []);
        
        // Fetch enrollments
        const { data: enrollmentsData, error: enrollmentsError } = await supabase
          .from('enrollments')
          .select('*')
          .eq('user_id', user.id);
          
        if (enrollmentsError) throw enrollmentsError;
        
        setEnrollments(enrollmentsData || []);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your dashboard data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [user, toast]);

  const getColorForCategory = (category: string) => {
    switch (category) {
      case 'Programming':
        return 'blue-500';
      case 'Design':
        return 'purple-500';
      case 'Backend':
        return 'green-500';
      case 'Computer Science':
        return 'indigo-500';
      case 'Professional':
        return 'pink-500';
      default:
        return 'yellow-500';
    }
  };

  const calculateEnrolledCourses = () => {
    return enrollments.length;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <section className="glass-card p-6 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-xl">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Welcome back, {profile?.username || 'Learner'}</h2>
          <p className="text-muted-foreground">Your learning journey continues. Here's what's next for you.</p>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-0 p-4">
            <div className="text-2xl font-medium">{calculateEnrolledCourses()}</div>
            <div className="text-sm text-muted-foreground">Courses in progress</div>
          </Card>
          
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-0 p-4">
            <div className="text-2xl font-medium">{skillsData.length}</div>
            <div className="text-sm text-muted-foreground">Skills tracked</div>
          </Card>
          
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-0 p-4">
            <div className="text-2xl font-medium">{skillsData.filter(s => s.progress > 0).length}</div>
            <div className="text-sm text-muted-foreground">Skills improving</div>
          </Card>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:text-primary/80 hover:bg-primary/5 -mr-2"
            onClick={() => navigate('/profile')}
          >
            View Profile
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </section>
      
      <SkillProgress 
        skills={skillsData} 
        emptyState={
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">You haven't added any skills yet</p>
            <Button onClick={() => navigate('/skills')}>Add Skills</Button>
          </div>
        }
      />
      
      <CourseRecommendation 
        courses={calculateEnrolledCourses() > 0 
          ? coursesData.filter(c => !enrollments.some(e => e.course_id === c.id)) 
          : coursesData
        }
      />
    </div>
  );
};
