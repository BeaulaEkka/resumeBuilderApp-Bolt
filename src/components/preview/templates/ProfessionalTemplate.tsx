import React from 'react';
import { Resume } from '../../../types/resume';
import { formatDate } from '../../../utils/aiHelpers';

interface ProfessionalTemplateProps {
  resume: Resume;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ resume }) => {
  const { personalInfo, sections } = resume;
  
  const experienceSections = sections.filter(section => section.type === 'experience');
  const educationSections = sections.filter(section => section.type === 'education');
  const skillsSections = sections.filter(section => section.type === 'skills');
  const projectsSections = sections.filter(section => section.type === 'projects');
  const customSections = sections.filter(section => section.type === 'custom');
  
  return (
    <div className="font-serif text-gray-900">
      {/* Header */}
      <header className="text-center mb-8 pb-4 border-b-2 border-gray-300">
        <h1 className="text-3xl font-bold uppercase tracking-wider">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <h2 className="text-xl text-gray-700 mt-1">{personalInfo.title}</h2>
        )}
        
        <div className="flex flex-wrap justify-center mt-3 text-sm">
          {personalInfo.email && (
            <div className="mx-2 mb-1">
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="mx-2 mb-1">
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="mx-2 mb-1">
              {personalInfo.location}
            </div>
          )}
        </div>
        
        {personalInfo.links.length > 0 && (
          <div className="flex flex-wrap justify-center mt-1 text-sm">
            {personalInfo.links.map(link => (
              <div key={link.id} className="mx-2 mb-1">
                <a href={link.url} className="text-blue-900 hover:underline" target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </div>
            ))}
          </div>
        )}
      </header>
      
      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2 uppercase tracking-wider border-b border-gray-300 pb-1">Professional Summary</h2>
          <p className="text-gray-800">{personalInfo.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {experienceSections.length > 0 && experienceSections.map(section => (
        <section key={section.id} className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wider border-b border-gray-300 pb-1">{section.title}</h2>
          <div className="space-y-5">
            {section.items.map((item: any) => (
              <div key={item.id}>
                <div className="flex flex-wrap justify-between mb-1">
                  <h3 className="text-md font-bold">{item.position}</h3>
                  <span className="text-sm italic">
                    {formatDate(item.startDate)} - {item.current ? 'Present' : formatDate(item.endDate)}
                  </span>
                </div>
                <p className="text-md font-medium mb-1">{item.company}{item.location ? `, ${item.location}` : ''}</p>
                {item.description && <p className="text-sm">{item.description}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}
      
      {/* Education */}
      {educationSections.length > 0 && educationSections.map(section => (
        <section key={section.id} className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wider border-b border-gray-300 pb-1">{section.title}</h2>
          <div className="space-y-5">
            {section.items.map((item: any) => (
              <div key={item.id}>
                <div className="flex flex-wrap justify-between mb-1">
                  <h3 className="text-md font-bold">{item.degree}</h3>
                  <span className="text-sm italic">
                    {formatDate(item.startDate)} - {formatDate(item.endDate)}
                  </span>
                </div>
                <p className="text-md font-medium mb-1">{item.school}{item.location ? `, ${item.location}` : ''}</p>
                {item.description && <p className="text-sm">{item.description}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}
      
      {/* Skills */}
      {skillsSections.length > 0 && skillsSections.map(section => (
        <section key={section.id} className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wider border-b border-gray-300 pb-1">{section.title}</h2>
          {section.items.length > 0 ? (
            <ul className="list-disc pl-5 grid grid-cols-2 gap-1">
              {section.items.map((item: any) => (
                <li key={item.id} className="text-sm">
                  {item.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No skills added yet</p>
          )}
        </section>
      ))}
      
      {/* Projects */}
      {projectsSections.length > 0 && projectsSections.map(section => (
        <section key={section.id} className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wider border-b border-gray-300 pb-1">{section.title}</h2>
          <div className="space-y-5">
            {section.items.map((item: any) => (
              <div key={item.id}>
                <div className="flex items-baseline mb-1">
                  <h3 className="text-md font-bold">{item.name}</h3>
                  {item.link && (
                    <a 
                      href={item.link} 
                      className="ml-2 text-sm text-blue-900 hover:underline" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Link
                    </a>
                  )}
                </div>
                {item.description && <p className="text-sm">{item.description}</p>}
                {item.technologies && item.technologies.length > 0 && (
                  <p className="text-sm mt-1">
                    <span className="font-medium">Technologies:</span> {item.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
      
      {/* Custom Sections */}
      {customSections.length > 0 && customSections.map(section => (
        <section key={section.id} className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wider border-b border-gray-300 pb-1">{section.title}</h2>
          <div className="space-y-3">
            {section.items.map((item: any) => (
              <div key={item.id}>
                {item.title && <h3 className="text-md font-bold mb-1">{item.title}</h3>}
                <p className="text-sm">{item.content}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProfessionalTemplate;