
import React, { useState, useEffect } from 'react';
import { SkillRow, supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { AddSkillDialog } from '@/components/skills/AddSkillDialog';
import { EditSkillDialog } from '@/components/skills/EditSkillDialog';
import { SkillTable } from '@/components/skills/SkillTable';
import { EmptySkillState } from '@/components/skills/EmptySkillState';
import { SkillLoader } from '@/components/skills/SkillLoader';

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
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your skills',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [user]);

  const handleAddSkill = async (formData: Omit<SkillRow, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
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
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to add your skill',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateSkill = async (formData: Partial<SkillRow>) => {
    if (!currentSkill) return;
    
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
        .eq('id', currentSkill.id);
      
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
    } catch (error) {
      console.error('Error updating skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to update your skill',
        variant: 'destructive',
      });
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
      toast({
        title: 'Error',
        description: 'Failed to delete your skill',
        variant: 'destructive',
      });
    }
  };

  const openEditDialog = (skill: SkillRow) => {
    setCurrentSkill(skill);
    setEditDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Header />
      
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Your Skills</h1>
            <Button 
              onClick={() => setAddDialogOpen(true)}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </div>
          
          {loading ? (
            <SkillLoader />
          ) : skills.length === 0 ? (
            <EmptySkillState onAddClick={() => setAddDialogOpen(true)} />
          ) : (
            <div className="space-y-6">
              <SkillTable 
                skills={skills}
                onEdit={openEditDialog}
                onDelete={handleDeleteSkill}
              />
            </div>
          )}
          
          <AddSkillDialog
            open={addDialogOpen}
            onOpenChange={setAddDialogOpen}
            onAddSkill={handleAddSkill}
            existingCategories={categories}
          />
          
          {currentSkill && (
            <EditSkillDialog
              open={editDialogOpen}
              onOpenChange={setEditDialogOpen}
              onUpdateSkill={handleUpdateSkill}
              onDeleteSkill={handleDeleteSkill}
              skill={currentSkill}
              existingCategories={categories}
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
