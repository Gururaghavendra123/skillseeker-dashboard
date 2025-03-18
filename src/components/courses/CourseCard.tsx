
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  instructor: string;
}

export function CourseCard({ id, title, description, image, category, level, duration, instructor }: CourseCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courses/${id}`);
  };

  const levelColors = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-blue-100 text-blue-800",
    Advanced: "bg-purple-100 text-purple-800",
  };

  return (
    <Card 
      className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow bg-gradient-to-br from-card to-card/80 border border-border/50"
      onClick={handleClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
            {category}
          </Badge>
          <Badge className={`${levelColors[level]}`}>
            {level}
          </Badge>
        </div>
      </div>
      
      <CardContent className="flex-grow p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-2">{description}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <span>{instructor}</span>
          <span className="mx-2">•</span>
          <span>{duration}</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/courses/${id}`);
          }}
          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
          size="sm"
        >
          View Course
        </Button>
      </CardFooter>
    </Card>
  );
}
