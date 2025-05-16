import React, { createContext, useContext, useState, useEffect } from 'react';
import { Resume, ResumeSection, Template } from '../types/resume';
import { defaultTemplates } from '../data/templates';
import { generateAIContent } from '../utils/aiHelpers';

interface ResumeContextType {
  resume: Resume;
  selectedTemplate: Template;
  updateResume: (updatedResume: Partial<Resume>) => void;
  updateSection: (sectionId: string, data: Partial<ResumeSection>) => void;
  addSection: (sectionType: string) => void;
  removeSection: (sectionId: string) => void;
  changeTemplate: (templateId: string) => void;
  generateAIContent: (sectionId: string, prompt: string) => Promise<void>;
  isGenerating: boolean;
}

const defaultResume: Resume = {
  personalInfo: {
    id: 'personal-info',
    type: 'personalInfo',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    summary: '',
    links: []
  },
  sections: [
    {
      id: 'experience-1',
      type: 'experience',
      title: 'Work Experience',
      items: [
        {
          id: 'exp-item-1',
          position: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }
      ]
    },
    {
      id: 'education-1',
      type: 'education',
      title: 'Education',
      items: [
        {
          id: 'edu-item-1',
          degree: '',
          school: '',
          location: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ]
    },
    {
      id: 'skills-1',
      type: 'skills',
      title: 'Skills',
      items: []
    }
  ]
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resume, setResume] = useState<Resume>(defaultResume);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(defaultTemplates[0]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Load saved resume data if it exists
  useEffect(() => {
    const savedResume = localStorage.getItem('resume');
    const savedTemplate = localStorage.getItem('selectedTemplate');
    
    if (savedResume) {
      setResume(JSON.parse(savedResume));
    }
    
    if (savedTemplate) {
      const template = defaultTemplates.find(t => t.id === savedTemplate);
      if (template) {
        setSelectedTemplate(template);
      }
    }
  }, []);

  // Save resume data when it changes
  useEffect(() => {
    localStorage.setItem('resume', JSON.stringify(resume));
  }, [resume]);

  // Save selected template when it changes
  useEffect(() => {
    localStorage.setItem('selectedTemplate', selectedTemplate.id);
  }, [selectedTemplate]);

  const updateResume = (updatedResume: Partial<Resume>) => {
    setResume(prevResume => ({
      ...prevResume,
      ...updatedResume
    }));
  };

  const updateSection = (sectionId: string, data: Partial<ResumeSection>) => {
    setResume(prevResume => ({
      ...prevResume,
      sections: prevResume.sections.map(section => 
        section.id === sectionId ? { ...section, ...data } : section
      )
    }));
  };

  const addSection = (sectionType: string) => {
    const newId = `${sectionType}-${Date.now()}`;
    let newSection: ResumeSection;

    switch (sectionType) {
      case 'experience':
        newSection = {
          id: newId,
          type: 'experience',
          title: 'Work Experience',
          items: [{
            id: `exp-item-${Date.now()}`,
            position: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
          }]
        };
        break;
      case 'education':
        newSection = {
          id: newId,
          type: 'education',
          title: 'Education',
          items: [{
            id: `edu-item-${Date.now()}`,
            degree: '',
            school: '',
            location: '',
            startDate: '',
            endDate: '',
            description: ''
          }]
        };
        break;
      case 'skills':
        newSection = {
          id: newId,
          type: 'skills',
          title: 'Skills',
          items: []
        };
        break;
      case 'projects':
        newSection = {
          id: newId,
          type: 'projects',
          title: 'Projects',
          items: [{
            id: `proj-item-${Date.now()}`,
            name: '',
            description: '',
            link: '',
            technologies: []
          }]
        };
        break;
      default:
        newSection = {
          id: newId,
          type: 'custom',
          title: 'Custom Section',
          items: []
        };
    }

    setResume(prevResume => ({
      ...prevResume,
      sections: [...prevResume.sections, newSection]
    }));
  };

  const removeSection = (sectionId: string) => {
    setResume(prevResume => ({
      ...prevResume,
      sections: prevResume.sections.filter(section => section.id !== sectionId)
    }));
  };

  const changeTemplate = (templateId: string) => {
    const template = defaultTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
    }
  };

  const handleGenerateAIContent = async (sectionId: string, prompt: string) => {
    setIsGenerating(true);
    try {
      const generatedContent = await generateAIContent(prompt, resume);
      
      if (sectionId === 'personal-info') {
        setResume(prevResume => ({
          ...prevResume,
          personalInfo: {
            ...prevResume.personalInfo,
            summary: generatedContent
          }
        }));
      } else {
        const section = resume.sections.find(s => s.id === sectionId);
        if (section) {
          updateSection(sectionId, { 
            ...section,
            // Apply generated content based on section type
            items: section.items.map((item, index) => 
              index === 0 ? { ...item, description: generatedContent } : item
            )
          });
        }
      }
    } catch (error) {
      console.error('Error generating AI content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        selectedTemplate,
        updateResume,
        updateSection,
        addSection,
        removeSection,
        changeTemplate,
        generateAIContent: handleGenerateAIContent,
        isGenerating
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};