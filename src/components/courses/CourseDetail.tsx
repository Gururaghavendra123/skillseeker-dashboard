
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { EnrollButton } from './EnrollButton';
import { ArrowLeft, Clock, BookOpen, Award, Calendar } from 'lucide-react';

// Mock data for the time being
const coursesData = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    description: 'Learn to implement advanced React patterns to build more maintainable components.',
    fullDescription: "Master advanced React patterns such as Compound Components, Render Props, Higher Order Components, and React Hooks. This course covers everything you need to build scalable and maintainable React applications with elegant component composition and state management approaches.",
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Web Development',
    duration: '6 hours',
    level: 'Advanced' as const,
    instructor: 'Sarah Johnson',
    lessons: 12,
    createdAt: '2023-08-15',
  },
  {
    id: '2',
    title: 'TypeScript Fundamentals',
    description: 'Master the basics of TypeScript to improve your JavaScript development workflow.',
    fullDescription: "This comprehensive course covers TypeScript from the ground up. Learn about types, interfaces, generics, and how to leverage the TypeScript compiler to catch errors before they reach production. By the end of this course, you'll be able to confidently build type-safe applications.",
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Programming',
    duration: '4 hours',
    level: 'Beginner' as const,
    instructor: 'Michael Chen',
    lessons: 8,
    createdAt: '2023-09-05',
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    description: 'Learn the core principles of designing intuitive user interfaces and experiences.',
    fullDescription: "Dive into the world of UI/UX design with this practical course. Understand user psychology, wireframing, prototyping, and usability testing. Learn how to create designs that are not only beautiful but also functional and user-friendly. Perfect for developers looking to enhance their design skills.",
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Design',
    duration: '8 hours',
    level: 'Intermediate' as const,
    instructor: 'Emily Rodriguez',
    lessons: 15,
    createdAt: '2023-07-22',
  },
  {
    id: '4',
    title: 'Node.js Backend Development',
    description: 'Build scalable backend applications with Node.js and Express.',
    fullDescription: "Learn how to build robust backend systems with Node.js and Express. This course covers RESTful API design, authentication, database integration with MongoDB, error handling, and deployment. By the end, you'll be able to create secure and performant server-side applications.",
    image: 'https://images.unsplash.com/photo-1627399270231-7d36245355a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Web Development',
    duration: '10 hours',
    level: 'Intermediate' as const,
    instructor: 'David Kim',
    lessons: 20,
    createdAt: '2023-10-10',
  },
  {
    id: '5',
    title: 'CSS Grid and Flexbox Mastery',
    description: 'Master modern CSS layout techniques to create responsive designs.',
    fullDescription: "Take your CSS skills to the next level with this focused course on modern layout techniques. Understand the power of Flexbox and CSS Grid to create complex, responsive layouts with clean, maintainable code. Learn when to use each approach and how to combine them for optimal results.",
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Web Development',
    duration: '5 hours',
    level: 'Beginner' as const,
    instructor: 'Jessica Patel',
    lessons: 10,
    createdAt: '2023-11-15',
  },
  {
    id: '6',
    title: 'Data Visualization with D3.js',
    description: 'Create interactive data visualizations for the web using D3.js.',
    fullDescription: "Learn how to transform data into compelling visual stories using D3.js. This course covers data binding, scales, axes, transitions, and interactive visualizations. You'll create beautiful charts, graphs, and interactive dashboards that bring your data to life on the web.",
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Data Science',
    duration: '7 hours',
    level: 'Advanced' as const,
    instructor: 'Alex Thompson',
    lessons: 14,
    createdAt: '2023-12-01',
  },
];

export function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      
      // For now, use the mock data
      const foundCourse = coursesData.find(c => c.id === courseId);
      
      if (foundCourse) {
        setCourse(foundCourse);
        
        // Check if user is enrolled
        if (user) {
          try {
            const { data, error } = await supabase
              .from('enrollments')
              .select('*')
              .eq('user_id', user.id)
              .eq('course_id', courseId)
              .single();
            
            if (error && error.code !== 'PGRST116') {
              console.error('Error checking enrollment:', error);
            }
            
            setIsEnrolled(!!data);
          } catch (error) {
            console.error('Error checking enrollment:', error);
          }
        }
      }
      
      setLoading(false);
    };
    
    fetchCourse();
  }, [courseId, user]);

  const handleEnrollmentChange = () => {
    setIsEnrolled(!isEnrolled);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-6 w-32 mb-8" />
          <Skeleton className="h-[300px] w-full mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/courses')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
              {course.category}
            </Badge>
            <Badge className="bg-secondary/30 hover:bg-secondary/40">
              {course.level}
            </Badge>
            <div className="text-sm text-muted-foreground">
              <Calendar className="inline h-4 w-4 mr-1" />
              {new Date(course.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="mb-8 overflow-hidden rounded-lg">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-[300px] object-cover rounded-lg shadow-md"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-card to-card/90">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Clock className="h-10 w-10 mb-2 text-primary" />
              <h3 className="font-medium">Duration</h3>
              <p>{course.duration}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-card to-card/90">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <BookOpen className="h-10 w-10 mb-2 text-primary" />
              <h3 className="font-medium">Lessons</h3>
              <p>{course.lessons} lessons</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-card to-card/90">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Award className="h-10 w-10 mb-2 text-primary" />
              <h3 className="font-medium">Certificate</h3>
              <p>Upon completion</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-gradient-to-br from-card to-card/90 mb-8">
          <CardHeader>
            <CardTitle>About This Course</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-line">
              {course.fullDescription}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-card to-card/90 mb-8">
          <CardHeader>
            <CardTitle>Instructor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                {course.instructor.substring(0, 1)}
              </div>
              <div>
                <h3 className="font-medium">{course.instructor}</h3>
                <p className="text-sm text-muted-foreground">Expert Instructor</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center mb-8">
          <EnrollButton 
            courseId={course.id} 
            isEnrolled={isEnrolled}
            onEnrollmentChange={handleEnrollmentChange}
            variant="default"
          />
        </div>
      </div>
    </div>
  );
}
