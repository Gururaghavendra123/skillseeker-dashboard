
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProgressCircle } from '@/components/ui/progress-circle';
import { 
  User, 
  Settings, 
  Bookmark,
  FileText, 
  Award,
  Edit,
  Calendar
} from 'lucide-react';

const Profile = () => {
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
                  <h1 className="text-3xl font-bold mb-2">Alex Johnson</h1>
                  <p className="text-muted-foreground mb-4">Frontend Developer | Learning UX Design</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-secondary px-3 py-1 rounded-full text-xs">
                      JavaScript
                    </div>
                    <div className="bg-secondary px-3 py-1 rounded-full text-xs">
                      React
                    </div>
                    <div className="bg-secondary px-3 py-1 rounded-full text-xs">
                      TypeScript
                    </div>
                    <div className="bg-secondary px-3 py-1 rounded-full text-xs">
                      UI Design
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
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-sm text-muted-foreground">Courses Completed</div>
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-sm text-muted-foreground">In Progress</div>
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold">85h</div>
                      <div className="text-sm text-muted-foreground">Total Learning</div>
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold">8</div>
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
                        <h4 className="font-medium">Master React and TypeScript</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          Target: October 2023
                        </div>
                      </div>
                      <ProgressCircle progress={65} size={60} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Learn UI/UX Design Fundamentals</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          Target: December 2023
                        </div>
                      </div>
                      <ProgressCircle progress={30} size={60} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Build 5 Full-Stack Projects</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          Target: January 2024
                        </div>
                      </div>
                      <ProgressCircle progress={40} size={60} />
                    </div>
                  </div>
                </Card>
                
                {/* Recent Activity */}
                <Card className="p-6 space-y-4">
                  <h3 className="text-xl font-medium">Recent Activity</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Completed "Advanced React Hooks" lesson</h4>
                        <p className="text-sm text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Earned "TypeScript Basics" certificate</h4>
                        <p className="text-sm text-muted-foreground">1 week ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Bookmark className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Saved "UI Design Principles" course</h4>
                        <p className="text-sm text-muted-foreground">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="courses" className="space-y-4">
                <h3 className="text-xl font-medium mb-4">My Courses</h3>
                <p className="text-muted-foreground">View all your enrolled and completed courses.</p>
              </TabsContent>
              
              <TabsContent value="achievements" className="space-y-4">
                <h3 className="text-xl font-medium mb-4">Achievements</h3>
                <p className="text-muted-foreground">View your certificates and accomplishments.</p>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <h3 className="text-xl font-medium mb-4">Account Settings</h3>
                <p className="text-muted-foreground">Manage your account preferences and notifications.</p>
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
