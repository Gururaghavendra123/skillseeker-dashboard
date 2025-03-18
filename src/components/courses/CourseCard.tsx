
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  className?: string;
  isEnrolled?: boolean;
}

export function CourseCard({
  id,
  title,
  description,
  image,
  category,
  duration,
  level,
  className = '',
  isEnrolled = false,
}: CourseCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courses/${id}`);
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="h-48 w-full object-cover"
        />
        
        {isEnrolled && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-500 hover:bg-green-600">Enrolled</Badge>
          </div>
        )}
        
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white font-medium">View Course</span>
        </div>
      </div>
      
      <CardContent className="p-5">
        <div className="flex gap-2 mb-2">
          <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
            {category}
          </Badge>
          <Badge 
            variant="outline" 
            className={`
              border-0
              ${level === 'Beginner' 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : level === 'Intermediate' 
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}
            `}
          >
            {level}
          </Badge>
        </div>
        
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{title}</h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          <span className="mr-4">{duration}</span>
        </div>
      </CardContent>
    </Card>
  );
}
