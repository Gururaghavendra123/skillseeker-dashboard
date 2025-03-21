
import React from 'react';
import { CourseCard } from '@/components/ui/skill-card';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

// Mock data in case the API fails
const fallbackCourses = [
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
  }
];

interface CourseRecommendationProps {
  courses?: Course[];
}

export const CourseRecommendation = ({ courses = [] }: CourseRecommendationProps) => {
  const navigate = useNavigate();
  
  // If no courses are provided or the array is empty, use fallback data
  const displayCourses = courses.length > 0 ? courses : fallbackCourses;
  
  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Recommended Courses</h3>
        <button 
          className="text-sm text-primary hover:underline"
          onClick={() => navigate('/courses')}
        >
          View All
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCourses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            image={course.image}
            category={course.category}
            duration={course.duration}
            level={course.level}
            onClick={() => handleCourseClick(course.id)}
            className="animate-scale-up" 
          />
        ))}
      </div>
    </div>
  );
};
