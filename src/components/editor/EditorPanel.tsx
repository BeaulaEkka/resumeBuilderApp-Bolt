import React from 'react';
import { useResume } from '../../context/ResumeContext';
import PersonalInfoEditor from './sections/PersonalInfoEditor';
import SectionEditor from './sections/SectionEditor';
import { PlusCircle, Download } from 'lucide-react';
import { exportToPDF } from '../../utils/aiHelpers';

const EditorPanel: React.FC = () => {
  const { resume, selectedTemplate, addSection } = useResume();

  const handleExport = () => {
    exportToPDF(resume, selectedTemplate.id);
  };

  const handleAddSection = (type: string) => {
    addSection(type);
  };

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="container mx-auto py-6 px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Resume Editor</h2>
          <button 
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors shadow-sm"
          >
            <Download size={18} className="mr-2" />
            Export PDF
          </button>
        </div>

        <div className="space-y-6">
          <PersonalInfoEditor personalInfo={resume.personalInfo} />
          
          {resume.sections.map(section => (
            <SectionEditor key={section.id} section={section} />
          ))}
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Add Section</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleAddSection('experience')}
                className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-all"
              >
                <PlusCircle size={16} className="mr-2 text-blue-600" />
                Experience
              </button>
              <button
                onClick={() => handleAddSection('education')}
                className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-all"
              >
                <PlusCircle size={16} className="mr-2 text-blue-600" />
                Education
              </button>
              <button
                onClick={() => handleAddSection('skills')}
                className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-all"
              >
                <PlusCircle size={16} className="mr-2 text-blue-600" />
                Skills
              </button>
              <button
                onClick={() => handleAddSection('projects')}
                className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-all"
              >
                <PlusCircle size={16} className="mr-2 text-blue-600" />
                Projects
              </button>
              <button
                onClick={() => handleAddSection('custom')}
                className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-all"
              >
                <PlusCircle size={16} className="mr-2 text-blue-600" />
                Custom Section
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;