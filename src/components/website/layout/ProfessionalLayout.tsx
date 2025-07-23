'use client'; // Add this since you're using window.innerWidth

import { ProfessionalHeader } from './ProfessionalHeader';
import { ProfessionalFooter } from './ProfessionalFooter';
import type { ReactNode } from 'react';

interface ProfessionalLayoutProps {
  children?: ReactNode;
}

export function ProfessionalLayout({ children }: ProfessionalLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <ProfessionalHeader />
      
      {/* Main content with proper spacing for fixed header */}
      <main 
        className="flex-1" 
        style={{ 
          paddingTop: typeof window !== 'undefined' ? 
            (window.innerWidth >= 1200 ? '72px' : '56px') : 
            '72px' // Default value for SSR
        }}
      >
        {children}
      </main>
      
      <ProfessionalFooter />
    </div>
  );
}