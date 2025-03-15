
import React from 'react';
import { cn } from '@/lib/utils';
import { ProgressCircle } from './progress-circle';

interface SkillCardProps {
  title: string;
  description: string;
  progress: number;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const SkillCard = ({
  title,
  description,
  progress,
  icon,
  className,
  onClick,
  style,
}: SkillCardProps) => {
  return (
    <div 
      className={cn(
        'group relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      style={style}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          {icon && <div className="mb-4 text-primary">{icon}</div>}
          <h3 className="font-medium text-xl leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        
        <div className="ml-4">
          <ProgressCircle progress={progress} size={60} />
        </div>
      </div>
    </div>
  );
};

interface CourseCardProps {
  title: string;
  description: string;
  image?: string;
  category: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const CourseCard = ({
  title,
  description,
  image,
  category,
  duration,
  level,
  className,
  onClick,
  style,
}: CourseCardProps) => {
  const levelColor = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-blue-100 text-blue-800',
    Advanced: 'bg-purple-100 text-purple-800',
  }[level];

  return (
    <div 
      className={cn(
        'group relative overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-lg',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      style={style}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent z-10" />
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
            {category}
          </span>
          <span className={cn("text-xs px-2 py-1 rounded-full", levelColor)}>
            {level}
          </span>
        </div>
        
        <h3 className="font-medium text-xl leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground">{duration}</span>
          <span className="text-sm font-medium text-primary">View Course</span>
        </div>
      </div>
    </div>
  );
};
