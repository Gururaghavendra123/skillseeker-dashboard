
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, BookOpen, User, Settings, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { EnrollButton } from '@/components/courses/EnrollButton';
import { Label } from '@/components/ui/label';
import { useOnboarding } from '@/contexts/OnboardingContext';

// Mock data for the time being
const coursesData = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    category: 'Web Development',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '2',
    title: 'TypeScript Fundamentals',
    category: 'Programming',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    category: 'Design',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '4',
    title: 'Node.js Backend Development',
    category: 'Web Development',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1627399270231-7d36245355a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '5',
    title: 'CSS Grid and Flexbox Mastery',
    category: 'Web Development',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '6',
    title: 'Data Visualization with D3.js',
    category: 'Data Science',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
];

const Profile = () => {
  const { user, profile, updateProfile, isLoading } = useAuth();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    interests: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { shouldShowOnboarding, completedOnboarding } = useOnboarding();
  
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || '',
        bio: profile.bio || '',
        interests: profile.interests || ''
      });
    }
  }, [profile]);

  useEffect(() => {
    const fetchUserData = async () => {
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
        
        // Get enrolled course details from mock data
        const courseIds = enrollmentsData?.map(enrollment => enrollment.course_id) || [];
        const courses = coursesData.filter(course => courseIds.includes(course.id));
        
        setEnrolledCourses(courses);
        
        // Fetch user's skills
        const { data: skillsData, error: skillsError } = await supabase
          .from('skills')
          .select('*')
          .eq('user_id', user.id)
          .order('title', { ascending: true });
          
        if (skillsError) throw skillsError;
        
        setSkills(skillsData || []);
      } catch (error: any) {
        console.error('Error fetching user data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your profile data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [user, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username.trim()) {
      toast({
        title: 'Username is required',
        description: 'Please enter a username to continue',
        variant: 'destructive'
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      await updateProfile({
        username: formData.username,
        bio: formData.bio,
        interests: formData.interests
      });
      
      toast({
        title: 'Profile updated',
        description: 'Your profile information has been saved'
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const refreshEnrollments = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      setEnrollments(data || []);
      
      const courseIds = data?.map(enrollment => enrollment.course_id) || [];
      const courses = coursesData.filter(course => courseIds.includes(course.id));
      
      setEnrolledCourses(courses);
    } catch (error) {
      console.error('Error refreshing enrollments:', error);
    }
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

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
      
      <main className="flex-1 pt-28 pb-20 bg-gradient-to-b from-blue-50/30 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Profile Header */}
            <div className="mb-10 animate-fade-up">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-200">
                    <AvatarFallback className="text-3xl text-indigo-600 font-medium">
                      {profile?.username?.substring(0, 1) || user.email?.substring(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {profile?.username || user.email}
                  </h1>
                  <p className="text-muted-foreground mb-4">
                    {user.email}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 px-3 py-1 rounded-full text-xs text-blue-700">
                      Learner
                    </div>
                    {skills.length > 0 && (
                      <div className="bg-gradient-to-r from-purple-100 to-indigo-100 px-3 py-1 rounded-full text-xs text-indigo-700">
                        {skills.length} Skills
                      </div>
                    )}
                    {enrolledCourses.length > 0 && (
                      <div className="bg-gradient-to-r from-green-100 to-blue-100 px-3 py-1 rounded-full text-xs text-blue-700">
                        {enrolledCourses.length} Courses
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Profile Tabs */}
            <Tabs defaultValue="overview" className="animate-fade-up animation-delay-100">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="overview">
                  <User className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="courses">
                  <BookOpen className="h-4 w-4 mr-2" />
                  My Courses
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
                <TabsTrigger value="activity">
                  <Calendar className="h-4 w-4 mr-2" />
                  Activity
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="p-4 gradient-card shadow-sm border-0">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-blue-600">{enrollments.length}</div>
                      <div className="text-sm text-muted-foreground">Courses Enrolled</div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 gradient-card shadow-sm border-0">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-indigo-600">0</div>
                      <div className="text-sm text-muted-foreground">Completed</div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 gradient-card shadow-sm border-0">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-purple-600">{skills.length}</div>
                      <div className="text-sm text-muted-foreground">Skills</div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 gradient-card shadow-sm border-0">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-green-600">0</div>
                      <div className="text-sm text-muted-foreground">Certificates</div>
                    </div>
                  </Card>
                </div>
                
                {/* Bio Section */}
                <Card className="p-6 space-y-4 gradient-card shadow-sm border-0">
                  <h3 className="text-xl font-medium">About Me</h3>
                  
                  {profile?.bio ? (
                    <p className="text-muted-foreground">{profile.bio}</p>
                  ) : (
                    <p className="text-muted-foreground italic">
                      No bio yet. Update your profile to tell others about yourself.
                    </p>
                  )}
                </Card>
                
                {/* Interests */}
                <Card className="p-6 space-y-4 gradient-card shadow-sm border-0">
                  <h3 className="text-xl font-medium">Learning Interests</h3>
                  
                  {profile?.interests ? (
                    <p className="text-muted-foreground">{profile.interests}</p>
                  ) : (
                    <p className="text-muted-foreground italic">
                      No interests specified. Update your profile to share what you're interested in learning.
                    </p>
                  )}
                </Card>
              </TabsContent>
              
              <TabsContent value="courses" className="space-y-4">
                <h3 className="text-xl font-medium mb-4">My Courses</h3>
                
                {enrolledCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {enrolledCourses.map((course, index) => (
                      <Card key={index} className="overflow-hidden gradient-card shadow-sm border-0">
                        <div className="relative h-32">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
                            <span className="text-white font-medium">{course.title}</span>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex gap-2 mb-4">
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                              {course.category}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                              {course.level}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="flex-1"
                              onClick={() => navigate(`/courses/${course.id}`)}
                            >
                              View Course
                            </Button>
                            <EnrollButton
                              courseId={course.id}
                              isEnrolled={true}
                              onEnrollmentChange={refreshEnrollments}
                              size="sm"
                              variant="outline"
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>You haven't enrolled in any courses yet.</p>
                    <Button 
                      className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" 
                      onClick={() => navigate('/courses')}
                    >
                      Browse Courses
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <h3 className="text-xl font-medium mb-4">Account Settings</h3>
                <Card className="p-6 gradient-card shadow-sm border-0">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username<span className="text-red-500">*</span></Label>
                      <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Choose a username"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell us a bit about yourself"
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="interests">Learning Interests</Label>
                      <Textarea
                        id="interests"
                        name="interests"
                        value={formData.interests}
                        onChange={handleChange}
                        placeholder="What skills are you interested in learning? (e.g., Web Development, Design, Data Science)"
                        rows={2}
                      />
                    </div>
                    
                    <div className="pt-2 flex justify-end">
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                    </div>
                  </form>
                </Card>
                
                <Card className="p-6 gradient-card shadow-sm border-0">
                  <h3 className="text-xl font-medium mb-4">Account Information</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Account Created</h4>
                      <p className="text-muted-foreground">
                        {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Unknown'}
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="activity" className="space-y-4">
                <h3 className="text-xl font-medium mb-4">Recent Activity</h3>
                
                {enrollments.length > 0 ? (
                  <Card className="p-6 gradient-card shadow-sm border-0">
                    <div className="space-y-4">
                      {enrollments.map((enrollment, index) => {
                        const course = coursesData.find(c => c.id === enrollment.course_id);
                        if (!course) return null;
                        
                        return (
                          <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-blue-50/50 transition-colors">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <BookOpen className="h-5 w-5 text-blue-600" />
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
                  </Card>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>No recent activity. Start learning!</p>
                    <Button 
                      className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" 
                      onClick={() => navigate('/courses')}
                    >
                      Browse Courses
                    </Button>
                  </div>
                )}
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
