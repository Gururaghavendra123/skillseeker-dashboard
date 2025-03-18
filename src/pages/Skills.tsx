
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';
import { Code, Book, BrainCircuit, Database, GraduationCap, Lightbulb, Loader2, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SkillCard } from '@/components/skills/SkillCard';
import { AddSkillDialog } from '@/components/skills/AddSkillDialog';
import { EditSkillDialog } from '@/components/skills/EditSkillDialog';
import { useOnboarding } from '@/contexts/OnboardingContext';

interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  icon?: React.ReactNode;
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Programming': <Code className="h-6 w-6" />,
  'Design': <Lightbulb className="h-6 w-6" />,
  'Backend': <Database className="h-6 w-6" />,
  'Frontend': <Code className="h-6 w-6" />,
  'Database': <Database className="h-6 w-6" />,
  'DevOps': <Code className="h-6 w-6" />,
  'Computer Science': <BrainCircuit className="h-6 w-6" />,
  'Professional': <GraduationCap className="h-6 w-6" />,
  'Other': <Book className="h-6 w-6" />,
};

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<string[]>(['All Skills']);
  const [loading, setLoading] = useState(true);
  const [deleteSkillId, setDeleteSkillId] = useState<string | null>(null);
  const [editSkillId, setEditSkillId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { shouldShowOnboarding, completedOnboarding } = useOnboarding();
  
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    } else if (!isLoading && user && shouldShowOnboarding && !completedOnboarding) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate, shouldShowOnboarding, completedOnboarding]);

  const fetchSkills = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('user_id', user.id)
        .order('title', { ascending: true });
      
      if (error) throw error;
      
      // Add icons to skills
      const skillsWithIcons = data.map((skill: Skill) => ({
        ...skill,
        icon: categoryIcons[skill.category] || <Book className="h-6 w-6" />
      }));
      
      setSkills(skillsWithIcons);
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(data.map((skill: Skill) => skill.category)));
      setCategories(['All Skills', ...uniqueCategories]);
    } catch (error: any) {
      console.error('Error fetching skills:', error);
      toast({
        title: 'Error loading skills',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchSkills();
  }, [user]);

  const handleEditSkill = (skillId: string) => {
    setEditSkillId(skillId);
    setIsEditDialogOpen(true);
  };

  const handleDeleteSkill = (skillId: string) => {
    setDeleteSkillId(skillId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteSkill = async () => {
    if (!deleteSkillId) return;
    
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', deleteSkillId);
      
      if (error) throw error;
      
      // Remove skill from state
      setSkills(skills.filter(skill => skill.id !== deleteSkillId));
      
      toast({
        title: 'Skill deleted',
        description: 'The skill has been removed from your profile'
      });
    } catch (error: any) {
      console.error('Error deleting skill:', error);
      toast({
        title: 'Error deleting skill',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setDeleteSkillId(null);
      setIsDeleteDialogOpen(false);
    }
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-20 bg-gradient-to-b from-blue-50/30 to-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold mb-2 animate-fade-up bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Your Skills</h1>
              <p className="text-muted-foreground animate-fade-up animation-delay-100">
                Track your progress and identify areas for improvement
              </p>
            </div>
            
            <AddSkillDialog
              onSkillAdded={fetchSkills}
              trigger={
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
              }
            />
          </div>
          
          <Tabs defaultValue="All Skills" className="w-full animate-fade-up animation-delay-200">
            <TabsList className="mb-8 w-full max-w-3xl mx-auto flex justify-between overflow-x-auto">
              {categories.map(category => (
                <TabsTrigger key={category} value={category} className="px-4">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map(category => (
              <TabsContent key={category} value={category} className="mt-6">
                {skills.filter(skill => category === 'All Skills' || skill.category === category).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills
                      .filter(skill => category === 'All Skills' || skill.category === category)
                      .map((skill, index) => (
                        <SkillCard
                          key={skill.id}
                          id={skill.id}
                          title={skill.title}
                          description={skill.description}
                          progress={skill.progress}
                          category={skill.category}
                          icon={skill.icon}
                          className="animate-scale-up"
                          onEdit={handleEditSkill}
                          onDelete={handleDeleteSkill}
                          // @ts-ignore
                          style={{ animationDelay: `${index * 50}ms` }}
                        />
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground mb-4">You don't have any skills in this category yet.</p>
                    <AddSkillDialog
                      onSkillAdded={fetchSkills}
                      trigger={
                        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Your First Skill
                        </Button>
                      }
                    />
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
      <Footer />
      
      {/* Edit Skill Dialog */}
      <EditSkillDialog
        skillId={editSkillId}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSkillUpdated={fetchSkills}
      />
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this skill from your profile. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteSkill} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Skills;
