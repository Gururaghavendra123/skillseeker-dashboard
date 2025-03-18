
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

export function UserProfile() {
  const { user, profile, updateProfile } = useAuth();
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || '');
      setBio(profile.bio || '');
      setInterests(profile.interests || '');
    }
  }, [profile]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user) return;
      
      setEnrollmentsLoading(true);
      try {
        // For this demo, we'll just retrieve enrollment IDs and use our static course data
        const { data: enrollments, error } = await supabase
          .from('enrollments')
          .select('course_id')
          .eq('user_id', user.id);
        
        if (error) throw error;
        
        // In a production app, we would fetch real course data from the database
        // For now, we'll use mock data
        const mockCourses = [
          {
            id: '1',
            title: 'Advanced React Patterns',
            image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            category: 'Web Development',
            level: 'Advanced',
          },
          {
            id: '2',
            title: 'TypeScript Fundamentals',
            image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            category: 'Programming',
            level: 'Beginner',
          },
          {
            id: '3',
            title: 'UI/UX Design Principles',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            category: 'Design',
            level: 'Intermediate',
          },
        ];
        
        const enrolledCourseIds = enrollments?.map(e => e.course_id) || [];
        const filteredCourses = mockCourses.filter(course => 
          enrolledCourseIds.includes(course.id)
        );
        
        setEnrolledCourses(filteredCourses);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      } finally {
        setEnrollmentsLoading(false);
      }
    };
    
    fetchEnrolledCourses();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      await updateProfile({
        username,
        bio,
        interests
      });
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || !profile) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-br from-card to-card/90">
        <CardHeader>
          <CardTitle className="text-2xl">Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                <AvatarImage src={profile.avatar_url || ''} />
                <AvatarFallback className="bg-primary/10 text-primary text-lg">
                  {username.substring(0, 2).toUpperCase() || user.email?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-lg">{username || 'New User'}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your username"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us a bit about yourself"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interests">Interests</Label>
                <Textarea
                  id="interests"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="What topics are you interested in?"
                  rows={2}
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-card to-card/90">
        <CardHeader>
          <CardTitle className="text-2xl">Enrolled Courses</CardTitle>
          <CardDescription>Courses you're currently enrolled in</CardDescription>
        </CardHeader>
        <CardContent>
          {enrollmentsLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enrolledCourses.map((course) => (
                <div 
                  key={course.id}
                  className="flex overflow-hidden rounded-lg border bg-card hover:shadow-sm cursor-pointer transition-shadow"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  <div className="w-1/3 h-24">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-3">
                    <h3 className="font-medium line-clamp-1">{course.title}</h3>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {course.category}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/20 text-secondary-foreground">
                        {course.level}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
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
  );
}
