
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SkillCard } from '@/components/ui/skill-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Book, BrainCircuit, Database, GraduationCap, Lightbulb } from 'lucide-react';

// Mock data
const skillsData = [
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
  },
  {
    id: '5',
    title: 'TypeScript',
    description: 'Static typing, interfaces, and type-safe development for JavaScript.',
    progress: 20,
    icon: <Code className="h-6 w-6" />,
    category: 'Programming'
  },
  {
    id: '6',
    title: 'CSS & Tailwind',
    description: 'Modern CSS techniques, responsive design, and utility-first frameworks.',
    progress: 65,
    icon: <Book className="h-6 w-6" />,
    category: 'Design'
  },
  {
    id: '7',
    title: 'Data Structures',
    description: 'Understanding core data structures and their applications in software development.',
    progress: 45,
    icon: <BrainCircuit className="h-6 w-6" />,
    category: 'Computer Science'
  },
  {
    id: '8',
    title: 'Machine Learning',
    description: 'Basics of machine learning algorithms and data analysis techniques.',
    progress: 15,
    icon: <BrainCircuit className="h-6 w-6" />,
    category: 'Computer Science'
  },
  {
    id: '9',
    title: 'Soft Skills',
    description: 'Communication, teamwork, and project management for tech professionals.',
    progress: 80,
    icon: <GraduationCap className="h-6 w-6" />,
    category: 'Professional'
  },
];

const categories = ['All Skills', 'Programming', 'Design', 'Backend', 'Computer Science', 'Professional'];

const Skills = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2 animate-fade-up">Your Skills</h1>
            <p className="text-muted-foreground animate-fade-up animation-delay-100">
              Track your progress and identify areas for improvement
            </p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skillsData
                    .filter(skill => category === 'All Skills' || skill.category === category)
                    .map((skill, index) => (
                      <SkillCard
                        key={skill.id}
                        title={skill.title}
                        description={skill.description}
                        progress={skill.progress}
                        icon={skill.icon}
                        className="animate-scale-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Skills;
