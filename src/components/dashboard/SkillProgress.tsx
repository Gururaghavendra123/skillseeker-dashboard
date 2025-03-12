
import React from 'react';
import { ProgressCircle } from '@/components/ui/progress-circle';

interface Skill {
  id: string;
  name: string;
  progress: number;
  color: string;
}

interface SkillProgressProps {
  skills: Skill[];
}

export const SkillProgress = ({ skills }: SkillProgressProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Your Skills Progress</h3>
        <button className="text-sm text-primary hover:underline">View All</button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div 
            key={skill.id}
            className="p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{skill.name}</h4>
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
    </div>
  );
};
