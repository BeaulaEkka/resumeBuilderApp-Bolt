import React from 'react';
import { Resume, Template } from '../../types/resume';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import { Download } from 'lucide-react';
import { exportToPDF } from '../../utils/aiHelpers';

interface PreviewPanelProps {
  resume: Resume;
  template: Template;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ resume, template }) => {
  const handleExport = () => {
    exportToPDF(resume, template.id);
  };

  const renderTemplate = () => {
    switch (template.id) {
      case 'modern':
        return <ModernTemplate resume={resume} />;
      case 'professional':
        return <ProfessionalTemplate resume={resume} />;
      case 'creative':
        return <CreativeTemplate resume={resume} />;
      case 'minimal':
        return <MinimalTemplate resume={resume} />;
      default:
        return <ModernTemplate resume={resume} />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-full flex flex-col">
      <div className="container mx-auto py-6 px-4 sm:px-6 md:px-8 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Preview</h2>
        <button 
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors shadow-sm"
        >
          <Download size={18} className="mr-2" />
          Export PDF
        </button>
      </div>
      
      <div className="flex-1 p-4 sm:p-6 md:p-8 flex justify-center overflow-auto">
        <div className="bg-white shadow-lg w-full max-w-[800px] overflow-hidden rounded-lg">
          <div className="p-8 transition-all scale-100 hover:scale-[1.01] origin-top-left">
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;