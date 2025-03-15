
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, BookOpen, Users, Award, Check, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// This would come from a database in a real application
const coursesData = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    description: 'Learn to implement advanced React patterns to build more maintainable components. This course covers compound components, render props, higher-order components, hooks patterns, and context API best practices.',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Web Development',
    duration: '6 hours',
    level: 'Advanced' as const,
    instructor: 'Sarah Johnson',
    lessons: 12,
    syllabus: [
      { title: 'Introduction to Advanced Patterns', duration: '30 min' },
      { title: 'Compound Components', duration: '45 min' },
      { title: 'Render Props Pattern', duration: '1 hour' },
      { title: 'Higher-Order Components', duration: '1 hour' },
      { title: 'Custom Hooks Patterns', duration: '45 min' },
      { title: 'Context API Best Practices', duration: '1 hour' },
      { title: 'State Management with Reducers', duration: '45 min' },
    ],
  },
  {
    id: '2',
    title: 'TypeScript Fundamentals',
    description: 'Master the basics of TypeScript to improve your JavaScript development workflow. Learn about static typing, interfaces, generics, and how to migrate JavaScript projects to TypeScript.',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Programming',
    duration: '4 hours',
    level: 'Beginner' as const,
    instructor: 'Michael Chen',
    lessons: 8,
    syllabus: [
      { title: 'Introduction to TypeScript', duration: '30 min' },
      { title: 'Basic Types', duration: '45 min' },
      { title: 'Interfaces', duration: '45 min' },
      { title: 'Functions', duration: '30 min' },
      { title: 'Classes', duration: '45 min' },
      { title: 'Generics', duration: '30 min' },
      { title: 'Type Inference', duration: '30 min' },
    ],
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    description: 'Learn the core principles of designing intuitive user interfaces and experiences. This course covers user research, wireframing, prototyping, and usability testing.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Design',
    duration: '8 hours',
    level: 'Intermediate' as const,
    instructor: 'Emily Rodriguez',
    lessons: 15,
    syllabus: [
      { title: 'Introduction to UI/UX Design', duration: '45 min' },
      { title: 'User Research Fundamentals', duration: '1 hour' },
      { title: 'Wireframing Techniques', duration: '1 hour' },
      { title: 'Prototyping Basics', duration: '1 hour' },
      { title: 'Color Theory and Typography', duration: '45 min' },
      { title: 'Usability Testing', duration: '1 hour' },
      { title: 'Accessibility in Design', duration: '1 hour' },
    ],
  },
  {
    id: '4',
    title: 'Node.js Backend Development',
    description: 'Build scalable backend applications with Node.js and Express. This course covers RESTful API design, middleware, authentication, and database integration.',
    image: 'https://images.unsplash.com/photo-1627399270231-7d36245355a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Web Development',
    duration: '10 hours',
    level: 'Intermediate' as const,
    instructor: 'David Kim',
    lessons: 20,
    syllabus: [
      { title: 'Introduction to Node.js', duration: '45 min' },
      { title: 'Setting up Express', duration: '30 min' },
      { title: 'RESTful API Design', duration: '1 hour' },
      { title: 'Middleware and Routing', duration: '1 hour' },
      { title: 'Authentication and Authorization', duration: '1.5 hours' },
      { title: 'Database Integration', duration: '1 hour' },
      { title: 'Error Handling', duration: '45 min' },
    ],
  },
  {
    id: '5',
    title: 'CSS Grid and Flexbox Mastery',
    description: 'Master modern CSS layout techniques to create responsive designs. Learn the fundamentals of CSS Grid and Flexbox, and how to combine them for powerful layouts.',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Web Development',
    duration: '5 hours',
    level: 'Beginner' as const,
    instructor: 'Jessica Patel',
    lessons: 10,
    syllabus: [
      { title: 'CSS Layout Fundamentals', duration: '30 min' },
      { title: 'Introduction to Flexbox', duration: '45 min' },
      { title: 'Flexbox Container Properties', duration: '45 min' },
      { title: 'Flexbox Item Properties', duration: '45 min' },
      { title: 'Introduction to CSS Grid', duration: '45 min' },
      { title: 'Grid Template Areas', duration: '30 min' },
      { title: 'Combining Grid and Flexbox', duration: '45 min' },
    ],
  },
  {
    id: '6',
    title: 'Data Visualization with D3.js',
    description: 'Create interactive data visualizations for the web using D3.js. Learn to build charts, graphs, and interactive visualizations from data sets.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Data Science',
    duration: '7 hours',
    level: 'Advanced' as const,
    instructor: 'Alex Thompson',
    lessons: 14,
    syllabus: [
      { title: 'Introduction to D3.js', duration: '45 min' },
      { title: 'Working with SVG', duration: '45 min' },
      { title: 'Data Binding', duration: '1 hour' },
      { title: 'Scales and Axes', duration: '1 hour' },
      { title: 'Creating Bar Charts', duration: '45 min' },
      { title: 'Line and Area Charts', duration: '45 min' },
      { title: 'Interactive Visualizations', duration: '1 hour' },
    ],
  },
];

const CoursePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [unenrolling, setUnenrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would be an API call
    const foundCourse = coursesData.find(c => c.id === courseId);
    
    if (foundCourse) {
      setCourse(foundCourse);
    }
    
    setLoading(false);
  }, [courseId]);

  useEffect(() => {
    const checkEnrollmentStatus = async () => {
      if (!user || !courseId) return;
      
      try {
        const { data, error } = await supabase
          .from('enrollments')
          .select('*')
          .eq('user_id', user.id)
          .eq('course_id', courseId)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          console.error('Error checking enrollment:', error);
          return;
        }
        
        setIsEnrolled(!!data);
      } catch (error) {
        console.error('Error checking enrollment status:', error);
      }
    };
    
    checkEnrollmentStatus();
  }, [user, courseId]);

  const handleEnroll = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please sign in to enroll in courses",
        variant: "destructive"
      });
      return;
    }
    
    if (isEnrolled) {
      toast({
        title: "Already enrolled",
        description: "You are already enrolled in this course",
      });
      return;
    }
    
    setEnrolling(true);
    
    try {
      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          course_id: courseId
        });
        
      if (error) throw error;
      
      setIsEnrolled(true);
      toast({
        title: "Enrollment successful",
        description: "You have successfully enrolled in this course",
      });
    } catch (error: any) {
      console.error('Error enrolling in course:', error);
      toast({
        title: "Enrollment failed",
        description: error.message || "An error occurred while enrolling",
        variant: "destructive"
      });
    } finally {
      setEnrolling(false);
    }
  };

  const handleUnenroll = async () => {
    if (!user || !courseId) return;
    
    setUnenrolling(true);
    
    try {
      const { error } = await supabase
        .from('enrollments')
        .delete()
        .eq('user_id', user.id)
        .eq('course_id', courseId);
        
      if (error) throw error;
      
      setIsEnrolled(false);
      toast({
        title: "Unenrolled successfully",
        description: "You have been unenrolled from this course",
      });
    } catch (error: any) {
      console.error('Error unenrolling from course:', error);
      toast({
        title: "Unenrollment failed",
        description: error.message || "An error occurred while unenrolling",
        variant: "destructive"
      });
    } finally {
      setUnenrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
        <Header />
        <main className="flex-1 pt-28 pb-20 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-lg">Loading course information...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
        <Header />
        <main className="flex-1 pt-28 pb-20 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Course Not Found</h2>
            <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/courses')} className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary">Back to Courses</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { 
    title, 
    description, 
    image, 
    category, 
    duration,
    level, 
    instructor, 
    lessons,
    syllabus 
  } = course;

  const levelColors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-blue-100 text-blue-800',
    Advanced: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Header />
      
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost"
            className="mb-6 flex items-center gap-2"
            onClick={() => navigate('/courses')}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="animate-fade-up">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                    {category}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${levelColors[level]}`}>
                    {level}
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
              </div>
              
              <div className="animate-fade-up animation-delay-100">
                <h2 className="text-xl font-semibold mb-4">Course Content</h2>
                <div className="border rounded-md divide-y overflow-hidden bg-card">
                  {syllabus.map((item, index) => (
                    <div key={index} className="p-4 flex justify-between items-center hover:bg-muted/50 transition-colors">
                      <div className="flex items-start">
                        <span className="mr-3 text-sm font-medium bg-primary/10 size-6 flex items-center justify-center rounded-full text-primary">{index + 1}</span>
                        <span>{item.title}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{item.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="rounded-lg overflow-hidden animate-fade-up shadow-md">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <Card className="animate-fade-up animation-delay-100 overflow-hidden bg-gradient-to-b from-card to-card/80">
                <CardHeader>
                  <CardTitle>Course Information</CardTitle>
                  <CardDescription>Details about this course</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">{duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Lessons</p>
                      <p className="text-sm text-muted-foreground">{lessons} lessons</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Instructor</p>
                      <p className="text-sm text-muted-foreground">{instructor}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Level</p>
                      <p className="text-sm text-muted-foreground">{level}</p>
                    </div>
                  </div>
                  
                  {isEnrolled ? (
                    <div className="space-y-3 pt-2">
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary" 
                        onClick={() => navigate('/dashboard')}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Go to Course
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" className="w-full">
                            Unenroll
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will unenroll you from "{title}". You can always enroll again later.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleUnenroll}
                              disabled={unenrolling}
                            >
                              {unenrolling ? 'Unenrolling...' : 'Unenroll'}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ) : (
                    <Button 
                      className="w-full mt-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary" 
                      onClick={handleEnroll}
                      disabled={enrolling}
                    >
                      {enrolling ? 'Enrolling...' : 'Enroll Now'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CoursePage;
