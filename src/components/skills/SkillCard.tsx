
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ProgressCircle } from '@/components/ui/progress-circle';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';

interface SkillCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  category: string;
  icon?: React.ReactNode;
  className?: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SkillCard({
  id,
  title,
  description,
  progress,
  category,
  icon,
  className = '',
  onEdit,
  onDelete
}: SkillCardProps) {
  return (
    <Card 
      className={`overflow-hidden gradient-card hover:shadow-md transition-all duration-300 ${className}`}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {icon && <div className="text-primary">{icon}</div>}
              <h3 className="font-bold text-lg">{title}</h3>
            </div>
            
            <div className="mb-1 text-xs font-medium text-muted-foreground">
              {category}
            </div>
            
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
          </div>
          
          <ProgressCircle 
            progress={progress} 
            size={60}
            className={progress < 30 ? 'text-orange-500' : progress < 70 ? 'text-blue-500' : 'text-green-500'}
          />
        </div>
        
        <div className="flex gap-2 justify-end mt-4">
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 hover:bg-blue-50 border-blue-200"
            onClick={() => onEdit(id)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:bg-red-50 border-red-200"
            onClick={() => onDelete(id)}
          >
            <Trash className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
