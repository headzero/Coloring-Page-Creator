import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                Coloring Page Creator
            </h1>
        </div>
      </div>
    </header>
  );
};