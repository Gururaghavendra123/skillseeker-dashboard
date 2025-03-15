
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SkillRow, supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';

// Helper function to group skills by category
const groupSkillsByCategory = (skills: SkillRow[]) => {
  const grouped: Record<string, { name: string, value: number, count: number }> = {};
  
  skills.forEach((skill) => {
    if (!grouped[skill.category]) {
      grouped[skill.category] = {
        name: skill.category,
        value: skill.progress,
        count: 1
      };
    } else {
      grouped[skill.category].value += skill.progress;
      grouped[skill.category].count += 1;
    }
  });
  
  // Calculate average progress for each category
  Object.keys(grouped).forEach((category) => {
    grouped[category].value = Math.round(grouped[category].value / grouped[category].count);
  });
  
  return Object.values(grouped);
};

export function SkillDashboard() {
  const [skills, setSkills] = useState<SkillRow[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchSkills = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .eq('user_id', user.id);
        
        if (error) {
          console.error('Error fetching skills:', error);
          toast({
            title: 'Error',
            description: 'Failed to load skills data',
            variant: 'destructive',
          });
          return;
        }
        
        setSkills(data as SkillRow[]);
      } catch (error) {
        console.error('Error fetching skills:', error);
        toast({
          title: 'Error',
          description: 'Failed to load skills data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchSkills();
  }, [user, toast]);
  
  const skillCategories = groupSkillsByCategory(skills);
  
  const navigateToSkills = () => {
    navigate('/skills');
  };
  
  return (
    <Card className="bg-gradient-to-br from-card to-card/90">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Skill Progress
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={navigateToSkills}
          className="hover:bg-primary/10"
        >
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-[200px] w-full" />
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">You haven't added any skills yet</p>
            <Button 
              onClick={navigateToSkills}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
            >
              Add Skills
            </Button>
          </div>
        ) : (
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillCategories}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Progress']}
                  labelFormatter={(label) => `Category: ${label}`}
                />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                  name="Progress"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
