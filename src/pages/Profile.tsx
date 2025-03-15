
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProgressCircle } from '@/components/ui/progress-circle';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { 
  User, 
  Settings, 
  Bookmark,
  FileText, 
  Award,
  Edit,
  Calendar,
  Loader2
} from 'lucide-react';

const Profile = () => {
  const { user, profile, updateProfile } = useAuth();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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
        
        // Get enrolled course details (in a real app, this would be from the database)
        // This is a sample implementation using the mockup data
        const mockCoursesData = [
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
        
        const courseIds = enrollmentsData?.map(enrollment => enrollment.course_id) || [];
        const courses = mockCoursesData.filter(course => courseIds.includes(course.id));
        
        setEnrolledCourses(courses);
      } catch (error: any) {
        console.error('Error fetching enrollments:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your enrollments',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserEnrollments();
  }, [user, toast]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-28 pb-20 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Please sign in</h2>
            <p className="text-muted-foreground mb-6">You need to be signed in to view your profile</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Profile Header */}
            <div className="mb-10 animate-fade-up">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-primary">
                    <User size={40} />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-full">
                    <Edit size={16} />
                  </button>
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{profile?.username || user.email}</h1>
                  <p className="text-muted-foreground mb-4">
                    {user.email}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-secondary px-3 py-1 rounded-full text-xs">
                      Learning
                    </div>
                    <div className="bg-secondary px-3 py-1 rounded-full text-xs">
                      Development
                    </div>
                  </div>
                </div>
                
                <Button>
                  Edit Profile
                </Button>
              </div>
            </div>
            
            {/* Profile Tabs */}
            <Tabs defaultValue="overview" className="animate-fade-up animation-delay-100">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses">My Courses</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="p-4">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold">{enrollments.length}</div>
                      <div className="text-sm text-muted-foreground">Courses Enrolled</div>
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-sm text-muted-foreground">Completed</div>
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold">0h</div>
                      <div className="text-sm text-muted-foreground">Total Learning</div>
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-sm text-muted-foreground">Certificates</div>
                    </div>
                  </Card>
                </div>
                
                {/* Learning Goals */}
                <Card className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium">Your Learning Goals</h3>
                    <Button variant="outline" size="sm">
                      Add Goal
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Complete your first course</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          Set a target date
                        </div>
                      </div>
                      <ProgressCircle progress={0} size={60} />
                    </div>
                  </div>
                </Card>
                
                {/* Recent Activity */}
                <Card className="p-6 space-y-4">
                  <h3 className="text-xl font-medium">Recent Activity</h3>
                  
                  {loading ? (
                    <div className="flex justify-center py-6">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : enrollments.length > 0 ? (
                    <div className="space-y-4">
                      {enrollments.map((enrollment, index) => {
                        const course = enrolledCourses.find(c => c.id === enrollment.course_id);
                        if (!course) return null;
                        
                        return (
                          <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <Bookmark className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">Enrolled in "{course.title}"</h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(enrollment.enrolled_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <p>No recent activity. Start learning!</p>
                    </div>
                  )}
                </Card>
              </TabsContent>
              
              <TabsContent value="courses" className="space-y-4">
                <h3 className="text-xl font-medium mb-4">My Courses</h3>
                
                {loading ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : enrolledCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {enrolledCourses.map((course, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="p-4">
                          <h4 className="font-semibold mb-2">{course.title}</h4>
                          <div className="flex gap-2 mb-4">
                            <span className="text-xs px-2 py-1 rounded-full bg-secondary">
                              {course.category}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-secondary">
                              {course.level}
                            </span>
                          </div>
                          <Button size="sm" className="w-full">Continue Learning</Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>You haven't enrolled in any courses yet.</p>
                    <Button className="mt-4" onClick={() => window.location.href = '/courses'}>
                      Browse Courses
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="achievements" className="space-y-4">
                <h3 className="text-xl font-medium mb-4">Achievements</h3>
                <div className="text-center py-6 text-muted-foreground">
                  <p>Complete courses to earn certificates and achievements.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <h3 className="text-xl font-medium mb-4">Account Settings</h3>
                <Card className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Username</h4>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          defaultValue={profile?.username || ''}
                          placeholder="Username"
                        />
                        <Button>Save</Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Email</h4>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
