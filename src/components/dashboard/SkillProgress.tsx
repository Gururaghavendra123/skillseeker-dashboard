
import React from 'react';
import { ProgressCircle } from '@/components/ui/progress-circle';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Skill {
  id: string;
  name?: string;
  title?: string;
  progress: number;
  color: string;
}

interface SkillProgressProps {
  skills: Skill[];
  emptyState?: React.ReactNode;
}

export const SkillProgress = ({ skills, emptyState }: SkillProgressProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Your Skills Progress</h3>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/skills')}
          className="text-primary hover:text-primary/80 hover:bg-primary/5"
        >
          View All
        </Button>
      </div>
      
      {skills.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {skills.slice(0, 6).map((skill) => (
            <div 
              key={skill.id}
              className="p-4 rounded-lg border bg-gradient-to-br from-card to-card/90 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{skill.title || skill.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {skill.progress < 30 ? 'Just started' : 
                     skill.progress < 70 ? 'Making progress' : 
                     'Almost mastered'}
                  </p>
                </div>
                <ProgressCircle 
                  progress={skill.progress} 
                  size={60}
                  className={`text-${skill.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        emptyState || (
          <div className="text-center py-8 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">No skills data available</p>
          </div>
        )
      )}
    </div>
  );
};
