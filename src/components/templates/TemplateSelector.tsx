import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { defaultTemplates } from '../../data/templates';
import { X } from 'lucide-react';

interface TemplateSelectorProps {
  onClose: () => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onClose }) => {
  const { selectedTemplate, changeTemplate } = useResume();

  const handleSelectTemplate = (templateId: string) => {
    changeTemplate(templateId);
    onClose();
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Select a Template</h2>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {defaultTemplates.map(template => (
          <button
            key={template.id}
            onClick={() => handleSelectTemplate(template.id)}
            className={`border rounded-lg overflow-hidden transition-all hover:shadow-md ${
              selectedTemplate.id === template.id 
                ? 'border-blue-500 ring-2 ring-blue-300' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="aspect-[8.5/11] overflow-hidden bg-white relative">
              <img 
                src={template.thumbnail} 
                alt={`${template.name} template thumbnail`}
                className="w-full h-full object-cover object-top"
              />
              {selectedTemplate.id === template.id && (
                <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">Selected</span>
                </div>
              )}
            </div>
            <div className="p-3 bg-white">
              <h3 className="font-medium text-gray-800">{template.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{template.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;