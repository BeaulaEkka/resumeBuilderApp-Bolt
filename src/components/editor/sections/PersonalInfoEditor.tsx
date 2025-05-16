import React, { useState } from 'react';
import { PersonalInfo } from '../../../types/resume';
import { useResume } from '../../../context/ResumeContext';
import { Sparkles, ChevronDown, ChevronUp, PlusCircle, Trash } from 'lucide-react';
import TextInput from '../../ui/TextInput';
import TextArea from '../../ui/TextArea';

interface PersonalInfoEditorProps {
  personalInfo: PersonalInfo;
}

const PersonalInfoEditor: React.FC<PersonalInfoEditorProps> = ({ personalInfo }) => {
  const { updateResume, generateAIContent, isGenerating } = useResume();
  const [expanded, setExpanded] = useState(true);
  const [promptValue, setPromptValue] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    updateResume({
      personalInfo: {
        ...personalInfo,
        [field]: value
      }
    });
  };

  const handleAddLink = () => {
    const newLink = {
      id: `link-${Date.now()}`,
      label: '',
      url: ''
    };
    
    updateResume({
      personalInfo: {
        ...personalInfo,
        links: [...personalInfo.links, newLink]
      }
    });
  };

  const handleUpdateLink = (id: string, field: 'label' | 'url', value: string) => {
    updateResume({
      personalInfo: {
        ...personalInfo,
        links: personalInfo.links.map(link => 
          link.id === id ? { ...link, [field]: value } : link
        )
      }
    });
  };

  const handleRemoveLink = (id: string) => {
    updateResume({
      personalInfo: {
        ...personalInfo,
        links: personalInfo.links.filter(link => link.id !== id)
      }
    });
  };

  const handleGenerateContent = async () => {
    if (!promptValue.trim()) return;
    await generateAIContent('personal-info', promptValue);
    setPromptValue('');
    setShowPrompt(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-medium text-gray-800">Personal Information</h3>
        <button className="text-gray-500 hover:text-gray-700">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      {expanded && (
        <div className="p-4 space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="First Name"
              value={personalInfo.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="John"
            />
            <TextInput
              label="Last Name"
              value={personalInfo.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Doe"
            />
          </div>
          
          <TextInput
            label="Job Title"
            value={personalInfo.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Software Engineer"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Email"
              value={personalInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="john.doe@example.com"
              type="email"
            />
            <TextInput
              label="Phone"
              value={personalInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="(123) 456-7890"
            />
          </div>
          
          <TextInput
            label="Location"
            value={personalInfo.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="New York, NY"
          />
          
          <div className="relative">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Professional Summary
              </label>
              <button 
                onClick={() => setShowPrompt(!showPrompt)}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <Sparkles size={16} className="mr-1" />
                AI Assist
              </button>
            </div>
            
            {showPrompt && (
              <div className="mb-2 p-3 bg-blue-50 border border-blue-200 rounded-md animate-fadeIn">
                <p className="text-sm text-blue-800 mb-2">
                  Enter a brief description of your background and goals:
                </p>
                <div className="flex">
                  <input
                    type="text"
                    value={promptValue}
                    onChange={(e) => setPromptValue(e.target.value)}
                    placeholder="e.g., Software developer with 5 years experience in React"
                    className="flex-1 border border-blue-300 rounded-l-md px-3 py-2 text-sm"
                  />
                  <button
                    onClick={handleGenerateContent}
                    disabled={isGenerating || !promptValue.trim()}
                    className={`px-3 py-2 rounded-r-md text-white text-sm font-medium ${
                      isGenerating || !promptValue.trim() 
                        ? 'bg-blue-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isGenerating ? 'Generating...' : 'Generate'}
                  </button>
                </div>
              </div>
            )}
            
            <TextArea
              value={personalInfo.summary}
              onChange={(e) => handleInputChange('summary', e.target.value)}
              placeholder="Write a compelling summary of your professional background and skills..."
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Links (Portfolio, LinkedIn, GitHub, etc.)
              </label>
              <button 
                onClick={handleAddLink}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <PlusCircle size={16} className="mr-1" />
                Add Link
              </button>
            </div>
            
            {personalInfo.links.map((link) => (
              <div key={link.id} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => handleUpdateLink(link.id, 'label', e.target.value)}
                  placeholder="LinkedIn"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => handleUpdateLink(link.id, 'url', e.target.value)}
                  placeholder="https://linkedin.com/in/johndoe"
                  className="flex-2 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button 
                  onClick={() => handleRemoveLink(link.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoEditor;