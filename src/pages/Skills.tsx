import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SkillCard } from '@/components/ui/skill-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { PlusCircle, Code, Book, BrainCircuit, Database, GraduationCap, Lightbulb, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, SkillRow } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { AddSkillDialog } from '@/components/skills/AddSkillDialog';
import { EditSkillDialog } from '@/components/skills/EditSkillDialog';

const categories = ['All Skills', 'Programming', 'Design', 'Backend', 'Computer Science', 'Professional'];

const Skills = () => {
  const [skillsData, setSkillsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch user skills from Supabase
  useEffect(() => {
    const fetchSkills = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .eq('user_id', user.id) as { data: SkillRow[] | null, error: any };
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          const formattedSkills = data.map(skill => ({
            ...skill,
            icon: getIconForCategory(skill.category)
          }));
          setSkillsData(formattedSkills);
        } else {
          // Add some default skills for new users
          const defaultSkills = getDefaultSkills();
          setSkillsData(defaultSkills);
          
          // Save default skills to database for new users
          if (user) {
            for (const skill of defaultSkills) {
              const { id, icon, ...skillData } = skill;
              await supabase
                .from('skills')
                .insert({
                  ...skillData,
                  user_id: user.id
                }) as { data: any, error: any };
            }
          }
        }
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
    
    fetchSkills();
  }, [user, toast]);

  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'Programming':
        return <Code className="h-6 w-6" />;
      case 'Design':
        return <Lightbulb className="h-6 w-6" />;
      case 'Backend':
        return <Database className="h-6 w-6" />;
      case 'Computer Science':
        return <BrainCircuit className="h-6 w-6" />;
      case 'Professional':
        return <GraduationCap className="h-6 w-6" />;
      default:
        return <Book className="h-6 w-6" />;
    }
  };

  const getDefaultSkills = () => [
    {
      id: '1',
      title: 'JavaScript',
      description: 'Modern JavaScript concepts including ES6+, async/await, and functional programming.',
      progress: 75,
      icon: <Code className="h-6 w-6" />,
      category: 'Programming'
    },
    {
      id: '2',
      title: 'React',
      description: 'Component-based architecture, hooks, state management, and React ecosystem.',
      progress: 60,
      icon: <Code className="h-6 w-6" />,
      category: 'Programming'
    },
    {
      id: '3',
      title: 'UI Design',
      description: 'Creating intuitive interfaces with design thinking and user experience principles.',
      progress: 40,
      icon: <Lightbulb className="h-6 w-6" />,
      category: 'Design'
    },
    {
      id: '4',
      title: 'Node.js',
      description: 'Server-side JavaScript, API development, and backend architecture.',
      progress: 30,
      icon: <Database className="h-6 w-6" />,
      category: 'Backend'
    }
  ];

  const handleAddSkill = async (newSkill: any) => {
    if (!user) return;
    
    try {
      const skillWithUserId = {
        ...newSkill,
        user_id: user.id
      };
      
      const { data, error } = await supabase
        .from('skills')
        .insert(skillWithUserId)
        .select() as { data: SkillRow[] | null, error: any };
        
      if (error) throw error;
      
      const addedSkill = {
        ...data![0],
        icon: getIconForCategory(newSkill.category)
      };
      
      setSkillsData(prev => [...prev, addedSkill]);
      
      toast({
        title: 'Skill Added',
        description: `${newSkill.title} has been added to your skills`,
      });
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to add skill',
        variant: 'destructive',
      });
    }
  };

  const handleEditSkill = async (updatedSkill: any) => {
    if (!user) return;
    
    try {
      const { id, icon, ...skillData } = updatedSkill;
      
      const { error } = await supabase
        .from('skills')
        .update(skillData)
        .eq('id', id)
        .eq('user_id', user.id) as { data: any, error: any };
        
      if (error) throw error;
      
      setSkillsData(prev => 
        prev.map(skill => 
          skill.id === id 
            ? { ...skill, ...updatedSkill, icon: getIconForCategory(updatedSkill.category) }
            : skill
        )
      );
      
      toast({
        title: 'Skill Updated',
        description: `${updatedSkill.title} has been updated`,
      });
      
      setEditingSkill(null);
    } catch (error) {
      console.error('Error updating skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to update skill',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id) as { data: any, error: any };
        
      if (error) throw error;
      
      setSkillsData(prev => prev.filter(skill => skill.id !== id));
      
      toast({
        title: 'Skill Deleted',
        description: 'The skill has been removed',
      });
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete skill',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Header />
      
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2 animate-fade-up">Your Skills</h1>
              <p className="text-muted-foreground animate-fade-up animation-delay-100">
                Track your progress and identify areas for improvement
              </p>
            </div>
            <Button 
              onClick={() => setIsAddSkillOpen(true)}
              className="group animate-fade-up bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
            >
              <PlusCircle className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Add Skill
            </Button>
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
                {loading ? (
                  <div className="text-center py-10">
                    <p>Loading your skills...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillsData
                      .filter(skill => category === 'All Skills' || skill.category === category)
                      .map((skill, index) => (
                        <div key={skill.id} className="relative group">
                          <SkillCard
                            title={skill.title}
                            description={skill.description}
                            progress={skill.progress}
                            icon={skill.icon}
                            className="animate-scale-up h-full transition-shadow hover:shadow-md"
                            style={{ animationDelay: `${index * 50}ms` }}
                          />
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            onClick={() => setEditingSkill(skill)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                  </div>
                )}
                
                {!loading && skillsData.filter(skill => category === 'All Skills' || skill.category === category).length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground mb-4">No skills in this category yet</p>
                    <Button onClick={() => setIsAddSkillOpen(true)}>Add Your First Skill</Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
      <Footer />

      {/* Add Skill Dialog */}
      <AddSkillDialog 
        open={isAddSkillOpen} 
        onOpenChange={setIsAddSkillOpen}
        onAddSkill={handleAddSkill}
        categories={categories.filter(c => c !== 'All Skills')}
      />

      {/* Edit Skill Dialog */}
      {editingSkill && (
        <EditSkillDialog
          open={!!editingSkill}
          onOpenChange={(open) => !open && setEditingSkill(null)}
          skill={editingSkill}
          onEditSkill={handleEditSkill}
          onDeleteSkill={handleDeleteSkill}
          categories={categories.filter(c => c !== 'All Skills')}
        />
      )}
    </div>
  );
};

export default Skills;
