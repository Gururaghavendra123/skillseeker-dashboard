
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CourseList } from '@/components/courses/CourseList';

const Courses = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Header />
      
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4">
          <CourseList />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
