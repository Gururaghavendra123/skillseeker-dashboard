
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  enrolled?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function CourseCard({
  title,
  description,
  image,
  category,
  duration,
  level,
  enrolled = false,
  onClick,
  className = "",
  style
}: CourseCardProps) {
  const levelColorMap = {
    "Beginner": "bg-green-500/20 text-green-500 hover:bg-green-500/30",
    "Intermediate": "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30",
    "Advanced": "bg-purple-500/20 text-purple-500 hover:bg-purple-500/30",
  };

  return (
    <Card 
      className={`overflow-hidden transition-all hover:shadow-lg ${className} ${enrolled ? 'border-primary/40' : ''}`}
      style={style}
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        {enrolled && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            Enrolled
          </div>
        )}
      </div>
      
      <CardHeader className="p-4 pb-0">
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="secondary" className="bg-secondary/30 hover:bg-secondary/40">
            {category}
          </Badge>
          <Badge className={levelColorMap[level]}>
            {level}
          </Badge>
        </div>
        <h3 className="font-semibold text-xl mb-2 line-clamp-1">{title}</h3>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between text-sm text-muted-foreground">
        <span>{duration}</span>
        <span className="cursor-pointer text-primary hover:underline">View Course</span>
      </CardFooter>
    </Card>
  );
}
