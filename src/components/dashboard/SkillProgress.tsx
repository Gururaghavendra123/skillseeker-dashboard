
import React from 'react';
import { ProgressCircle } from '@/components/ui/progress-circle';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Skill {
  id: string;
  name?: string;
  title?: string;
  progress: number;
  color?: string;
  category?: string;
}

// Fallback data in case the real data isn't available
const fallbackSkills = [
  {
    id: '1',
    title: 'React',
    progress: 75,
    color: 'blue-500',
    category: 'Web Development'
  },
  {
    id: '2',
    title: 'TypeScript',
    progress: 68,
    color: 'indigo-500',
    category: 'Programming'
  },
  {
    id: '3',
    title: 'UI Design',
    progress: 45,
    color: 'purple-500',
    category: 'Design'
  }
];

interface SkillProgressProps {
  skills?: Skill[];
  emptyState?: React.ReactNode;
}

export const SkillProgress = ({ skills = [], emptyState }: SkillProgressProps) => {
  const navigate = useNavigate();
  
  // If no skills are provided or the array is empty, use fallback data
  const displaySkills = skills.length > 0 ? skills : fallbackSkills;
  
  // Ensure each skill has a color
  const skillsWithColors = displaySkills.map(skill => ({
    ...skill,
    color: skill.color || getColorForProgress(skill.progress)
  }));
  
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
      
      {skillsWithColors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {skillsWithColors.slice(0, 6).map((skill) => (
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
                  {skill.category && (
                    <span className="text-xs text-muted-foreground">{skill.category}</span>
                  )}
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
            <Button 
              variant="outline" 
              onClick={() => navigate('/skills')}
              className="mt-4"
            >
              Add Skills
            </Button>
          </div>
        )
      )}
    </div>
  );
};

// Helper function to assign a color based on progress
function getColorForProgress(progress: number): string {
  if (progress < 30) return 'red-500';
  if (progress < 60) return 'yellow-500';
  if (progress < 80) return 'blue-500';
  return 'green-500';
}
