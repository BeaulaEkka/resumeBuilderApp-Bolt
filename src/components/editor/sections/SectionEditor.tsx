import React, { useState } from 'react';
import { ResumeSection } from '../../../types/resume';
import { useResume } from '../../../context/ResumeContext';
import { ChevronDown, ChevronUp, Edit, Trash, PlusCircle, Sparkles } from 'lucide-react';
import TextInput from '../../ui/TextInput';
import TextArea from '../../ui/TextArea';

interface SectionEditorProps {
  section: ResumeSection;
}

const SectionEditor: React.FC<SectionEditorProps> = ({ section }) => {
  const { updateSection, removeSection, generateAIContent, isGenerating } = useResume();
  const [expanded, setExpanded] = useState(true);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(section.title);
  const [promptValue, setPromptValue] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const handleTitleChange = () => {
    updateSection(section.id, { title: titleValue });
    setEditingTitle(false);
  };

  const handleAddItem = () => {
    let newItem;
    
    switch (section.type) {
      case 'experience':
        newItem = {
          id: `exp-item-${Date.now()}`,
          position: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        };
        break;
      case 'education':
        newItem = {
          id: `edu-item-${Date.now()}`,
          degree: '',
          school: '',
          location: '',
          startDate: '',
          endDate: '',
          description: ''
        };
        break;
      case 'skills':
        newItem = {
          id: `skill-item-${Date.now()}`,
          name: '',
          level: 3
        };
        break;
      case 'projects':
        newItem = {
          id: `proj-item-${Date.now()}`,
          name: '',
          description: '',
          link: '',
          technologies: []
        };
        break;
      default:
        newItem = {
          id: `custom-item-${Date.now()}`,
          title: '',
          content: ''
        };
    }
    
    updateSection(section.id, {
      items: [...section.items, newItem]
    });
  };

  const handleRemoveItem = (itemId: string) => {
    updateSection(section.id, {
      items: section.items.filter(item => item.id !== itemId)
    });
  };

  const handleItemChange = (itemId: string, field: string, value: any) => {
    updateSection(section.id, {
      items: section.items.map(item => 
        item.id === itemId ? { ...item, [field]: value } : item
      )
    });
  };

  const handleGenerateContent = async (itemIndex: number) => {
    if (!promptValue.trim()) return;
    setActiveItemIndex(itemIndex);
    await generateAIContent(section.id, promptValue);
    setPromptValue('');
    setShowPrompt(false);
  };

  const renderExperienceItem = (item: any, index: number) => (
    <div key={item.id} className="p-4 border border-gray-200 rounded-md bg-gray-50">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-md font-medium text-gray-800">Position {index + 1}</h4>
        <button 
          onClick={() => handleRemoveItem(item.id)} 
          className="text-red-500 hover:text-red-700"
          aria-label="Remove item"
        >
          <Trash size={18} />
        </button>
      </div>
      
      <div className="space-y-3">
        <TextInput
          label="Job Title"
          value={item.position}
          onChange={(e) => handleItemChange(item.id, 'position', e.target.value)}
          placeholder="Software Engineer"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            label="Company"
            value={item.company}
            onChange={(e) => handleItemChange(item.id, 'company', e.target.value)}
            placeholder="Acme Inc."
          />
          <TextInput
            label="Location"
            value={item.location}
            onChange={(e) => handleItemChange(item.id, 'location', e.target.value)}
            placeholder="New York, NY"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            label="Start Date"
            value={item.startDate}
            onChange={(e) => handleItemChange(item.id, 'startDate', e.target.value)}
            placeholder="Jun 2020"
            type="month"
          />
          {!item.current && (
            <TextInput
              label="End Date"
              value={item.endDate}
              onChange={(e) => handleItemChange(item.id, 'endDate', e.target.value)}
              placeholder="Present"
              type="month"
            />
          )}
        </div>
        
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id={`current-${item.id}`}
            checked={item.current}
            onChange={(e) => handleItemChange(item.id, 'current', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor={`current-${item.id}`} className="ml-2 block text-sm text-gray-700">
            I currently work here
          </label>
        </div>
        
        <div className="relative">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <button 
              onClick={() => {
                setShowPrompt(!showPrompt);
                setActiveItemIndex(index);
              }}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <Sparkles size={16} className="mr-1" />
              AI Assist
            </button>
          </div>
          
          {showPrompt && activeItemIndex === index && (
            <div className="mb-2 p-3 bg-blue-50 border border-blue-200 rounded-md animate-fadeIn">
              <p className="text-sm text-blue-800 mb-2">
                Describe your role and accomplishments:
              </p>
              <div className="flex">
                <input
                  type="text"
                  value={promptValue}
                  onChange={(e) => setPromptValue(e.target.value)}
                  placeholder="e.g., Led a team of developers to create a new product"
                  className="flex-1 border border-blue-300 rounded-l-md px-3 py-2 text-sm"
                />
                <button
                  onClick={() => handleGenerateContent(index)}
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
            value={item.description}
            onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
            placeholder="Describe your responsibilities and achievements..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );

  const renderEducationItem = (item: any, index: number) => (
    <div key={item.id} className="p-4 border border-gray-200 rounded-md bg-gray-50">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-md font-medium text-gray-800">Education {index + 1}</h4>
        <button 
          onClick={() => handleRemoveItem(item.id)} 
          className="text-red-500 hover:text-red-700"
        >
          <Trash size={18} />
        </button>
      </div>
      
      <div className="space-y-3">
        <TextInput
          label="Degree/Certificate"
          value={item.degree}
          onChange={(e) => handleItemChange(item.id, 'degree', e.target.value)}
          placeholder="Bachelor of Science in Computer Science"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            label="School/Institution"
            value={item.school}
            onChange={(e) => handleItemChange(item.id, 'school', e.target.value)}
            placeholder="University of California"
          />
          <TextInput
            label="Location"
            value={item.location}
            onChange={(e) => handleItemChange(item.id, 'location', e.target.value)}
            placeholder="Berkeley, CA"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            label="Start Date"
            value={item.startDate}
            onChange={(e) => handleItemChange(item.id, 'startDate', e.target.value)}
            placeholder="Sep 2016"
            type="month"
          />
          <TextInput
            label="End Date"
            value={item.endDate}
            onChange={(e) => handleItemChange(item.id, 'endDate', e.target.value)}
            placeholder="May 2020"
            type="month"
          />
        </div>
        
        <div className="relative">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <button 
              onClick={() => {
                setShowPrompt(!showPrompt);
                setActiveItemIndex(index);
              }}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <Sparkles size={16} className="mr-1" />
              AI Assist
            </button>
          </div>
          
          {showPrompt && activeItemIndex === index && (
            <div className="mb-2 p-3 bg-blue-50 border border-blue-200 rounded-md animate-fadeIn">
              <p className="text-sm text-blue-800 mb-2">
                Describe your education experience:
              </p>
              <div className="flex">
                <input
                  type="text"
                  value={promptValue}
                  onChange={(e) => setPromptValue(e.target.value)}
                  placeholder="e.g., Computer Science major with focus on AI"
                  className="flex-1 border border-blue-300 rounded-l-md px-3 py-2 text-sm"
                />
                <button
                  onClick={() => handleGenerateContent(index)}
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
            value={item.description}
            onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
            placeholder="Relevant coursework, achievements, activities..."
            rows={3}
          />
        </div>
      </div>
    </div>
  );

  const renderSkillItem = (item: any, index: number) => (
    <div key={item.id} className="flex items-center justify-between p-2 border border-gray-200 rounded-md bg-gray-50 mb-2">
      <TextInput
        value={item.name}
        onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
        placeholder="Skill name"
        className="flex-1"
        label=""
      />
      
      <div className="flex items-center ml-2">
        <select
          value={item.level || 0}
          onChange={(e) => handleItemChange(item.id, 'level', parseInt(e.target.value))}
          className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          aria-label="Skill level"
        >
          <option value="1">Beginner</option>
          <option value="2">Basic</option>
          <option value="3">Intermediate</option>
          <option value="4">Advanced</option>
          <option value="5">Expert</option>
        </select>
        
        <button 
          onClick={() => handleRemoveItem(item.id)} 
          className="ml-2 text-red-500 hover:text-red-700"
          aria-label="Remove skill"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );

  const renderProjectItem = (item: any, index: number) => (
    <div key={item.id} className="p-4 border border-gray-200 rounded-md bg-gray-50">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-md font-medium text-gray-800">Project {index + 1}</h4>
        <button 
          onClick={() => handleRemoveItem(item.id)} 
          className="text-red-500 hover:text-red-700"
        >
          <Trash size={18} />
        </button>
      </div>
      
      <div className="space-y-3">
        <TextInput
          label="Project Name"
          value={item.name}
          onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
          placeholder="E-commerce Platform"
        />
        
        <TextInput
          label="Project URL (optional)"
          value={item.link || ''}
          onChange={(e) => handleItemChange(item.id, 'link', e.target.value)}
          placeholder="https://github.com/username/project"
          type="url"
        />
        
        <div className="relative">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <button 
              onClick={() => {
                setShowPrompt(!showPrompt);
                setActiveItemIndex(index);
              }}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <Sparkles size={16} className="mr-1" />
              AI Assist
            </button>
          </div>
          
          {showPrompt && activeItemIndex === index && (
            <div className="mb-2 p-3 bg-blue-50 border border-blue-200 rounded-md animate-fadeIn">
              <p className="text-sm text-blue-800 mb-2">
                Describe your project:
              </p>
              <div className="flex">
                <input
                  type="text"
                  value={promptValue}
                  onChange={(e) => setPromptValue(e.target.value)}
                  placeholder="e.g., Created a React app for task management"
                  className="flex-1 border border-blue-300 rounded-l-md px-3 py-2 text-sm"
                />
                <button
                  onClick={() => handleGenerateContent(index)}
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
            value={item.description}
            onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
            placeholder="Describe the project, your role, and technologies used..."
            rows={3}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Technologies Used
          </label>
          <input
            type="text"
            value={Array.isArray(item.technologies) ? item.technologies.join(', ') : ''}
            onChange={(e) => {
              const techs = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
              handleItemChange(item.id, 'technologies', techs);
            }}
            placeholder="React, Node.js, MongoDB"
            className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );

  const renderCustomItem = (item: any, index: number) => (
    <div key={item.id} className="p-4 border border-gray-200 rounded-md bg-gray-50">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-md font-medium text-gray-800">Item {index + 1}</h4>
        <button 
          onClick={() => handleRemoveItem(item.id)} 
          className="text-red-500 hover:text-red-700"
        >
          <Trash size={18} />
        </button>
      </div>
      
      <div className="space-y-3">
        <TextInput
          label="Title (optional)"
          value={item.title || ''}
          onChange={(e) => handleItemChange(item.id, 'title', e.target.value)}
          placeholder="Item Title"
        />
        
        <TextArea
          label="Content"
          value={item.content}
          onChange={(e) => handleItemChange(item.id, 'content', e.target.value)}
          placeholder="Enter content..."
          rows={3}
        />
      </div>
    </div>
  );

  const renderSectionItems = () => {
    switch (section.type) {
      case 'experience':
        return section.items.map((item, index) => renderExperienceItem(item, index));
      case 'education':
        return section.items.map((item, index) => renderEducationItem(item, index));
      case 'skills':
        return (
          <div className="space-y-2">
            {section.items.map((item, index) => renderSkillItem(item, index))}
            <div className="mt-2 flex justify-center">
              <button
                onClick={handleAddItem}
                className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-all"
              >
                <PlusCircle size={16} className="mr-2 text-blue-600" />
                Add Skill
              </button>
            </div>
          </div>
        );
      case 'projects':
        return section.items.map((item, index) => renderProjectItem(item, index));
      default:
        return section.items.map((item, index) => renderCustomItem(item, index));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200">
      <div className="flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
        <div className="flex items-center flex-1">
          {editingTitle ? (
            <div className="flex items-center">
              <input
                type="text"
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                className="mr-2 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                autoFocus
              />
              <button
                onClick={handleTitleChange}
                className="px-2 py-1 bg-blue-600 text-white text-sm rounded-md"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <h3 className="text-lg font-medium text-gray-800 mr-2">{section.title}</h3>
              <button
                onClick={() => setEditingTitle(true)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Edit section title"
              >
                <Edit size={16} />
              </button>
            </div>
          )}
        </div>
        
        <div className="flex items-center">
          <button
            onClick={() => removeSection(section.id)}
            className="mr-2 text-red-500 hover:text-red-700"
            aria-label="Remove section"
          >
            <Trash size={18} />
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-500 hover:text-gray-700"
            aria-label={expanded ? 'Collapse section' : 'Expand section'}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 animate-fadeIn">
          <div className="space-y-4">
            {renderSectionItems()}
            
            {section.type !== 'skills' && (
              <button
                onClick={handleAddItem}
                className="mt-2 w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusCircle size={16} className="mr-2 text-blue-600" />
                Add {section.type === 'experience' ? 'Position' : section.type === 'education' ? 'Education' : section.type === 'projects' ? 'Project' : 'Item'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionEditor;