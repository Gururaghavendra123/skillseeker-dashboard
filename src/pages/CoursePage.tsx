
import React from 'react';
import { CourseDetail } from '@/components/courses/CourseDetail';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const CoursePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Header />
      <main className="flex-1 pt-28 pb-20">
        <CourseDetail />
      </main>
      <Footer />
    </div>
  );
};

export default CoursePage;
