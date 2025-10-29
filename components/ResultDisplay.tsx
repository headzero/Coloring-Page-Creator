import React from 'react';

interface ResultDisplayProps {
  originalImage: string;
  generatedImage: string;
}

const ImageCard: React.FC<{ src: string; title: string; isGenerated?: boolean }> = ({ src, title, isGenerated = false }) => (
  <div className="flex flex-col items-center gap-4">
    <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">{title}</h3>
    <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shadow-md">
      <img src={src} alt={title} className="w-full h-full object-contain" />
    </div>
    {isGenerated && (
      <a
        href={src}
        download="coloring-page.png"
        className="mt-2 inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform hover:scale-105"
      >
        Download
      </a>
    )}
  </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage }) => {
  return (
    <div className="bg-white dark:bg-gray-800/50 p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">Your Coloring Page is Ready!</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <ImageCard src={originalImage} title="Original" />
        <ImageCard src={generatedImage} title="Coloring Page" isGenerated />
      </div>
    </div>
  );
};