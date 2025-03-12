
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SkillDashboard } from '@/components/dashboard/SkillDashboard';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4">
          <SkillDashboard />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
