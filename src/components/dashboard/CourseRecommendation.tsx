
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

interface CourseRecommendationProps {
  courses: Course[];
}

export const CourseRecommendation = ({ courses }: CourseRecommendationProps) => {
  const navigate = useNavigate();
  
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
        {courses.map((course) => (
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
