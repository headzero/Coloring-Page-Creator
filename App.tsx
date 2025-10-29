import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateImage } from './services/geminiService';
import { fileToGenerativePart } from './utils/imageUtils';

const FIXED_PROMPT = "색칠놀이를 위해 이미지의 핵심을 두꺼운 외곽선으로 다시 그려주세요. 배경은 삭제해주세요. 질감은 필요없고 외곽선만 남겨주세요.";

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    setOriginalImage(file);
    setGeneratedImage(null);
    setError(null);
    setIsLoading(true);

    try {
      const imagePart = await fileToGenerativePart(file);
      const result = await generateImage(imagePart, FIXED_PROMPT);
      setGeneratedImage(`data:image/png;base64,${result}`);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 to-blue-100 dark:from-gray-900 dark:to-slate-800 text-gray-800 dark:text-gray-200">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <div className="bg-white dark:bg-gray-800/50 p-6 md:p-8 rounded-2xl shadow-lg transition-all">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Upload an image to create a coloring page</h2>
            <ImageUploader onImageUpload={handleImageUpload} />
          </div>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">{error}</div>}

          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-4 p-8">
              <LoadingSpinner />
              <p className="text-lg text-gray-600 dark:text-gray-400">Creating your coloring page...</p>
            </div>
          )}

          {generatedImage && originalImage && (
            <ResultDisplay
              originalImage={URL.createObjectURL(originalImage)}
              generatedImage={generatedImage}
            />
          )}

        </div>
      </main>
    </div>
  );
};

export default App;