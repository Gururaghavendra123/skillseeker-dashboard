
import React from 'react';
import { Card, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

interface EmptySkillStateProps {
  onAddClick: () => void;
}

export function EmptySkillState({ onAddClick }: EmptySkillStateProps) {
  return (
    <Card className="text-center py-8 bg-gradient-to-br from-card/90 to-card/70">
      <CardHeader>
        <CardTitle>No Skills Found</CardTitle>
        <CardDescription>
          Start by adding your first skill to track your progress
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-center">
        <Button onClick={onAddClick} className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Your First Skill
        </Button>
      </CardFooter>
    </Card>
  );
}
