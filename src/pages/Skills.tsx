
import React, { useState, useEffect } from 'react';
import { SkillRow, supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { AddSkillDialog } from '@/components/skills/AddSkillDialog';
import { EditSkillDialog } from '@/components/skills/EditSkillDialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export default function Skills() {
  const [skills, setSkills] = useState<SkillRow[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<SkillRow | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchSkills = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) {
        console.error('Error fetching skills:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your skills',
          variant: 'destructive',
        });
        return;
      }
      
      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set((data as SkillRow[]).map(skill => skill.category))
      );
      
      setSkills(data as SkillRow[]);
      setCategories(uniqueCategories.length > 0 ? uniqueCategories : ['Programming', 'Design', 'Marketing', 'Other']);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [user]);

  const handleAddSkill = async (formData: Omit<SkillRow, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('skills')
        .insert({
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          progress: formData.progress,
          category: formData.category,
        })
        .select();
      
      if (error) {
        console.error('Error adding skill:', error);
        toast({
          title: 'Error',
          description: 'Failed to add your skill',
          variant: 'destructive',
        });
        return;
      }
      
      toast({
        title: 'Success',
        description: 'Skill added successfully',
      });
      
      fetchSkills();
      setAddDialogOpen(false);
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  const handleEditSkill = async (formData: any) => {
    try {
      const { error } = await supabase
        .from('skills')
        .update({
          title: formData.title,
          description: formData.description,
          progress: formData.progress,
          category: formData.category,
          updated_at: new Date().toISOString(),
        })
        .eq('id', formData.id);
      
      if (error) {
        console.error('Error updating skill:', error);
        toast({
          title: 'Error',
          description: 'Failed to update your skill',
          variant: 'destructive',
        });
        return;
      }
      
      toast({
        title: 'Success',
        description: 'Skill updated successfully',
      });
      
      fetchSkills();
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  const handleDeleteSkill = async (skillId: string) => {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', skillId);
      
      if (error) {
        console.error('Error deleting skill:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete your skill',
          variant: 'destructive',
        });
        return;
      }
      
      toast({
        title: 'Success',
        description: 'Skill deleted successfully',
      });
      
      fetchSkills();
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  const openEditDialog = (skill: SkillRow) => {
    setCurrentSkill(skill);
    setEditDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Skills</h1>
        <Button 
          onClick={() => setAddDialogOpen(true)}
          className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>
      
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-11/12" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : skills.length === 0 ? (
        <Card className="text-center py-8">
          <CardHeader>
            <CardTitle>No Skills Found</CardTitle>
            <CardDescription>
              Start by adding your first skill to track your progress
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button onClick={() => setAddDialogOpen(true)}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Your First Skill
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills.map((skill) => (
                <TableRow key={skill.id}>
                  <TableCell className="font-medium">{skill.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-secondary/30">
                      {skill.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={skill.progress} className="h-2 w-24" />
                      <span className="text-xs text-muted-foreground w-8">{skill.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(skill)}
                        title="Edit Skill"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSkill(skill.id)}
                        title="Delete Skill"
                        className="text-destructive"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      <AddSkillDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAddSkill={handleAddSkill}
        categories={categories}
      />
      
      {currentSkill && (
        <EditSkillDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onEditSkill={handleEditSkill}
          onDeleteSkill={handleDeleteSkill}
          skill={currentSkill}
          categories={categories}
        />
      )}
    </div>
  );
}
