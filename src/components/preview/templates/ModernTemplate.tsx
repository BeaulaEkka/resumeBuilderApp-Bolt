import React from 'react';
import { Resume } from '../../../types/resume';
import { formatDate } from '../../../utils/aiHelpers';

interface ModernTemplateProps {
  resume: Resume;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ resume }) => {
  const { personalInfo, sections } = resume;
  
  const experienceSections = sections.filter(section => section.type === 'experience');
  const educationSections = sections.filter(section => section.type === 'education');
  const skillsSections = sections.filter(section => section.type === 'skills');
  const projectsSections = sections.filter(section => section.type === 'projects');
  const customSections = sections.filter(section => section.type === 'custom');
  
  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-blue-600">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <h2 className="text-xl text-gray-600 mt-1">{personalInfo.title}</h2>
        
        <div className="flex flex-wrap mt-3 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="mr-4 mb-1">
              <span className="font-medium">Email:</span> {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="mr-4 mb-1">
              <span className="font-medium">Phone:</span> {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="mr-4 mb-1">
              <span className="font-medium">Location:</span> {personalInfo.location}
            </div>
          )}
          {personalInfo.links.map(link => (
            <div key={link.id} className="mr-4 mb-1">
              <span className="font-medium">{link.label}:</span>{' '}
              <a href={link.url} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                {link.url.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </div>
          ))}
        </div>
      </header>
      
      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2 pb-1 border-b-2 border-blue-600 text-blue-700">Summary</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {experienceSections.length > 0 && experienceSections.map(section => (
        <section key={section.id} className="mb-6">
          <h2 className="text-lg font-bold mb-2 pb-1 border-b-2 border-blue-600 text-blue-700">{section.title}</h2>
          <div className="space-y-4">
            {section.items.map((item: any) => (
              <div key={item.id} className="pl-0">
                <div className="flex flex-wrap justify-between">
                  <h3 className="text-md font-semibold">{item.position}</h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(item.startDate)} - {item.current ? 'Present' : formatDate(item.endDate)}
                  </span>
                </div>
                <p className="text-md font-medium text-gray-700">{item.company}{item.location ? `, ${item.location}` : ''}</p>
                {item.description && <p className="mt-1 text-sm text-gray-700">{item.description}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}
      
      {/* Education */}
      {educationSections.length > 0 && educationSections.map(section => (
        <section key={section.id} className="mb-6">
          <h2 className="text-lg font-bold mb-2 pb-1 border-b-2 border-blue-600 text-blue-700">{section.title}</h2>
          <div className="space-y-4">
            {section.items.map((item: any) => (
              <div key={item.id} className="pl-0">
                <div className="flex flex-wrap justify-between">
                  <h3 className="text-md font-semibold">{item.degree}</h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(item.startDate)} - {formatDate(item.endDate)}
                  </span>
                </div>
                <p className="text-md font-medium text-gray-700">{item.school}{item.location ? `, ${item.location}` : ''}</p>
                {item.description && <p className="mt-1 text-sm text-gray-700">{item.description}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}
      
      {/* Skills */}
      {skillsSections.length > 0 && skillsSections.map(section => (
        <section key={section.id} className="mb-6">
          <h2 className="text-lg font-bold mb-2 pb-1 border-b-2 border-blue-600 text-blue-700">{section.title}</h2>
          <div className="flex flex-wrap">
            {section.items.length > 0 ? (
              section.items.map((item: any) => (
                <div key={item.id} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  {item.name}
                  {item.level && item.level > 0 && (
                    <span className="ml-1 text-xs text-gray-500">
                      {Array(item.level).fill('●').join('')}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No skills added yet</p>
            )}
          </div>
        </section>
      ))}
      
      {/* Projects */}
      {projectsSections.length > 0 && projectsSections.map(section => (
        <section key={section.id} className="mb-6">
          <h2 className="text-lg font-bold mb-2 pb-1 border-b-2 border-blue-600 text-blue-700">{section.title}</h2>
          <div className="space-y-4">
            {section.items.map((item: any) => (
              <div key={item.id} className="pl-0">
                <div className="flex items-baseline">
                  <h3 className="text-md font-semibold">{item.name}</h3>
                  {item.link && (
                    <a 
                      href={item.link} 
                      className="ml-2 text-sm text-blue-600 hover:text-blue-800" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Link
                    </a>
                  )}
                </div>
                {item.description && <p className="mt-1 text-sm text-gray-700">{item.description}</p>}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="mt-1 flex flex-wrap">
                    {item.technologies.map((tech: string, idx: number) => (
                      <span 
                        key={idx} 
                        className="bg-gray-100 text-gray-700 px-2 py-0.5 text-xs rounded mr-1 mb-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
      
      {/* Custom Sections */}
      {customSections.length > 0 && customSections.map(section => (
        <section key={section.id} className="mb-6">
          <h2 className="text-lg font-bold mb-2 pb-1 border-b-2 border-blue-600 text-blue-700">{section.title}</h2>
          <div className="space-y-3">
            {section.items.map((item: any) => (
              <div key={item.id} className="pl-0">
                {item.title && <h3 className="text-md font-semibold">{item.title}</h3>}
                <p className="text-sm text-gray-700">{item.content}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ModernTemplate;