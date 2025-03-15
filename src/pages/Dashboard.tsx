
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SkillDashboard } from '@/components/dashboard/SkillDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Calendar, BookOpen, Award, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock course data
  const coursesData = [
    {
      id: '1',
      title: 'Advanced React Patterns',
      category: 'Web Development',
      level: 'Advanced',
    },
    {
      id: '2',
      title: 'TypeScript Fundamentals',
      category: 'Programming',
      level: 'Beginner',
    },
    {
      id: '3',
      title: 'UI/UX Design Principles',
      category: 'Design',
      level: 'Intermediate',
    },
    {
      id: '4',
      title: 'Node.js Backend Development',
      category: 'Web Development',
      level: 'Intermediate',
    },
    {
      id: '5',
      title: 'CSS Grid and Flexbox Mastery',
      category: 'Web Development',
      level: 'Beginner',
    },
    {
      id: '6',
      title: 'Data Visualization with D3.js',
      category: 'Data Science',
      level: 'Advanced',
    },
  ];
  
  useEffect(() => {
    const fetchUserEnrollments = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch user's enrollments
        const { data: enrollmentsData, error: enrollmentsError } = await supabase
          .from('enrollments')
          .select('*')
          .eq('user_id', user.id);
          
        if (enrollmentsError) throw enrollmentsError;
        
        setEnrollments(enrollmentsData || []);
        
        const courseIds = enrollmentsData?.map(enrollment => enrollment.course_id) || [];
        const courses = coursesData.filter(course => courseIds.includes(course.id));
        
        setEnrolledCourses(courses);
      } catch (error: any) {
        console.error('Error fetching enrollments:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserEnrollments();
  }, [user]);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Header />
      
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="text-sm text-muted-foreground">
              <Calendar className="inline h-4 w-4 mr-1" />
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-card to-card/90">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Enrolled Courses</p>
                    <h2 className="text-3xl font-bold">{enrollments.length}</h2>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-card to-card/90">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Completed</p>
                    <h2 className="text-3xl font-bold">0</h2>
                  </div>
                  <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-card to-card/90">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Learning Hours</p>
                    <h2 className="text-3xl font-bold">0</h2>
                  </div>
                  <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-card to-card/90">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Achievements</p>
                    <h2 className="text-3xl font-bold">0</h2>
                  </div>
                  <div className="h-12 w-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Skill Progress Chart */}
            <div className="lg:col-span-2">
              <SkillDashboard />
            </div>
            
            {/* Enrolled Courses */}
            <div>
              <Card className="bg-gradient-to-br from-card to-card/90">
                <CardHeader>
                  <CardTitle className="text-lg">Your Courses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loading ? (
                    <div className="animate-pulse space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-16 bg-muted rounded-md" />
                      ))}
                    </div>
                  ) : enrolledCourses.length > 0 ? (
                    <>
                      {enrolledCourses.slice(0, 3).map((course) => (
                        <div 
                          key={course.id}
                          className="p-3 rounded-lg border bg-card/50 hover:bg-card/70 cursor-pointer transition-colors"
                          onClick={() => navigate(`/courses/${course.id}`)}
                        >
                          <h3 className="font-medium mb-1">{course.title}</h3>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span className="mr-3">{course.category}</span>
                            <span>{course.level}</span>
                          </div>
                        </div>
                      ))}
                      
                      {enrolledCourses.length > 3 && (
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => navigate('/profile')}
                        >
                          View All Courses
                        </Button>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet</p>
                      <Button 
                        onClick={() => navigate('/courses')}
                        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
                      >
                        Browse Courses
                      </Button>
                    </div>
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

export default Dashboard;
