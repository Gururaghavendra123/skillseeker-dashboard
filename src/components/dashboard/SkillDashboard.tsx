
import React from 'react';
import { SkillProgress } from './SkillProgress';
import { CourseRecommendation } from './CourseRecommendation';

// Mock data
const skillsData = [
  { id: '1', name: 'JavaScript', progress: 75, color: 'yellow-500' },
  { id: '2', name: 'React', progress: 60, color: 'blue-500' },
  { id: '3', name: 'UI Design', progress: 40, color: 'purple-500' },
  { id: '4', name: 'Node.js', progress: 30, color: 'green-500' },
  { id: '5', name: 'TypeScript', progress: 20, color: 'blue-400' },
  { id: '6', name: 'CSS', progress: 65, color: 'pink-500' },
];

const coursesData = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    description: 'Learn to implement advanced React patterns to build more maintainable components.',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Web Development',
    duration: '6 hours',
    level: 'Advanced' as const,
  },
  {
    id: '2',
    title: 'TypeScript Fundamentals',
    description: 'Master the basics of TypeScript to improve your JavaScript development workflow.',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Programming',
    duration: '4 hours',
    level: 'Beginner' as const,
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    description: 'Learn the core principles of designing intuitive user interfaces and experiences.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Design',
    duration: '8 hours',
    level: 'Intermediate' as const,
  },
];

export const SkillDashboard = () => {
  return (
    <div className="space-y-12">
      <section className="glass-card p-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Welcome back, Alex</h2>
          <p className="text-muted-foreground">Your learning journey continues. Here's what's next for you.</p>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-secondary p-4 rounded-lg">
            <div className="text-2xl font-medium">3</div>
            <div className="text-sm text-muted-foreground">Courses in progress</div>
          </div>
          
          <div className="bg-secondary p-4 rounded-lg">
            <div className="text-2xl font-medium">12</div>
            <div className="text-sm text-muted-foreground">Hours this week</div>
          </div>
          
          <div className="bg-secondary p-4 rounded-lg">
            <div className="text-2xl font-medium">6</div>
            <div className="text-sm text-muted-foreground">Skills improving</div>
          </div>
        </div>
      </section>
      
      <SkillProgress skills={skillsData} />
      
      <CourseRecommendation courses={coursesData} />
    </div>
  );
};
