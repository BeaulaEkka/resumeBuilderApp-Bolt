import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import EditorPanel from './editor/EditorPanel';
import PreviewPanel from './preview/PreviewPanel';
import TemplateSelector from './templates/TemplateSelector';
import { Layout, LayoutGrid as LayoutGroup } from 'lucide-react';

const ResumeBuilder: React.FC = () => {
  const { resume, selectedTemplate } = useResume();
  const [activeView, setActiveView] = useState<'editor' | 'preview' | 'templates'>('editor');
  const [isMobileView, setIsMobileView] = useState<boolean>(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // For desktop: show both editor and preview side by side
  if (!isMobileView) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Resume Builder</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveView('templates')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'templates' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Templates
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {activeView === 'templates' ? (
            <div className="w-full p-4 bg-gray-50 overflow-y-auto">
              <TemplateSelector onClose={() => setActiveView('editor')} />
            </div>
          ) : (
            <>
              <div className="w-1/2 border-r border-gray-200 bg-gray-50 overflow-y-auto">
                <EditorPanel />
              </div>
              <div className="w-1/2 bg-gray-100 overflow-y-auto">
                <PreviewPanel template={selectedTemplate} resume={resume} />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // For mobile: show either editor, preview, or templates with navigation
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Resume Builder</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveView('editor')}
                className={`p-2 rounded-md transition-colors ${
                  activeView === 'editor' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 bg-gray-100'
                }`}
                aria-label="Edit"
              >
                <Layout size={20} />
              </button>
              <button
                onClick={() => setActiveView('preview')}
                className={`p-2 rounded-md transition-colors ${
                  activeView === 'preview' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 bg-gray-100'
                }`}
                aria-label="Preview"
              >
                <LayoutGroup size={20} />
              </button>
              <button
                onClick={() => setActiveView('templates')}
                className={`p-2 rounded-md transition-colors ${
                  activeView === 'templates' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 bg-gray-100'
                }`}
                aria-label="Templates"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="6" height="6" x="4" y="4" rx="1" />
                  <rect width="6" height="6" x="14" y="4" rx="1" />
                  <rect width="6" height="6" x="4" y="14" rx="1" />
                  <rect width="6" height="6" x="14" y="14" rx="1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeView === 'editor' && <EditorPanel />}
        {activeView === 'preview' && <PreviewPanel template={selectedTemplate} resume={resume} />}
        {activeView === 'templates' && <TemplateSelector onClose={() => setActiveView('editor')} />}
      </div>
    </div>
  );
};

export default ResumeBuilder;