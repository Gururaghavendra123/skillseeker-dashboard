
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CourseCard } from '@/components/ui/skill-card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { ChevronDown, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Mock data
const coursesData = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    description: 'Learn to implement advanced React patterns to build more maintainable components.',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Web Development',
    duration: '6 hours',
    level: 'Advanced' as const,
  },
  {
    id: '2',
    title: 'TypeScript Fundamentals',
    description: 'Master the basics of TypeScript to improve your JavaScript development workflow.',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Programming',
    duration: '4 hours',
    level: 'Beginner' as const,
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    description: 'Learn the core principles of designing intuitive user interfaces and experiences.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Design',
    duration: '8 hours',
    level: 'Intermediate' as const,
  },
  {
    id: '4',
    title: 'Node.js Backend Development',
    description: 'Build scalable backend applications with Node.js and Express.',
    image: 'https://images.unsplash.com/photo-1627399270231-7d36245355a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Web Development',
    duration: '10 hours',
    level: 'Intermediate' as const,
  },
  {
    id: '5',
    title: 'CSS Grid and Flexbox Mastery',
    description: 'Master modern CSS layout techniques to create responsive designs.',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Web Development',
    duration: '5 hours',
    level: 'Beginner' as const,
  },
  {
    id: '6',
    title: 'Data Visualization with D3.js',
    description: 'Create interactive data visualizations for the web using D3.js.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: 'Data Science',
    duration: '7 hours',
    level: 'Advanced' as const,
  },
];

const categories = ['All Categories', 'Web Development', 'Programming', 'Design', 'Data Science'];
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter courses based on selected filters and search query
  const filteredCourses = coursesData.filter((course) => {
    const matchesCategory = selectedCategory === 'All Categories' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesLevel && matchesSearch;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2 animate-fade-up">Browse Courses</h1>
            <p className="text-muted-foreground animate-fade-up animation-delay-100">Discover courses to enhance your skills and advance your career</p>
          </div>
          
          <div className="mb-10 grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-up animation-delay-200">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search courses..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {selectedCategory}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category ? "bg-secondary" : ""}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {selectedLevel}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Level</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {levels.map((level) => (
                    <DropdownMenuItem
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={selectedLevel === level ? "bg-secondary" : ""}
                    >
                      {level}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up animation-delay-300">
              {filteredCourses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  image={course.image}
                  category={course.category}
                  duration={course.duration}
                  level={course.level}
                  className="animate-scale-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium mb-2">No courses found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
