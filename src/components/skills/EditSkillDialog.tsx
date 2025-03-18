
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const categories = [
  'Programming',
  'Design',
  'Backend',
  'Frontend',
  'Database',
  'DevOps',
  'Computer Science',
  'Professional',
  'Other'
];

interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
}

interface EditSkillDialogProps {
  skillId: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSkillUpdated: () => void;
}

export function EditSkillDialog({ 
  skillId, 
  isOpen, 
  onOpenChange, 
  onSkillUpdated 
}: EditSkillDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Skill>({
    id: '',
    title: '',
    description: '',
    category: 'Programming',
    progress: 0
  });
  
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchSkill = async () => {
      if (!skillId || !isOpen) return;
      
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .eq('id', skillId)
          .single();
        
        if (error) throw error;
        
        setFormData({
          id: data.id,
          title: data.title,
          description: data.description || '',
          category: data.category,
          progress: data.progress
        });
      } catch (error: any) {
        console.error('Error fetching skill:', error);
        toast({
          title: 'Error',
          description: 'Failed to load skill details',
          variant: 'destructive'
        });
        onOpenChange(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSkill();
  }, [skillId, isOpen, toast, onOpenChange]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };
  
  const handleProgressChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, progress: value[0] }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({
        title: 'Skill name required',
        description: 'Please enter a name for your skill',
        variant: 'destructive'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('skills')
        .update({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          progress: formData.progress,
          updated_at: new Date().toISOString()
        })
        .eq('id', formData.id);
      
      if (error) throw error;
      
      toast({
        title: 'Skill updated successfully',
        description: `${formData.title} has been updated`
      });
      
      onOpenChange(false);
      onSkillUpdated();
    } catch (error: any) {
      console.error('Error updating skill:', error);
      toast({
        title: 'Error updating skill',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] gradient-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Edit Skill</DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="title">Skill Name<span className="text-red-500">*</span></Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., JavaScript, UI Design, Public Speaking"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your skill and what you're learning"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="progress">Progress</Label>
                <span className="text-sm">{formData.progress}%</span>
              </div>
              <Slider 
                value={[formData.progress]} 
                onValueChange={handleProgressChange}
                min={0}
                max={100}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Advanced</span>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Skill'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
