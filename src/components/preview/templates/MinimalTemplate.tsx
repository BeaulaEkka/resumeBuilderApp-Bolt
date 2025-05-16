import React from 'react';
import { Resume } from '../../../types/resume';
import { formatDate } from '../../../utils/aiHelpers';

interface MinimalTemplateProps {
  resume: Resume;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ resume }) => {
  const { personalInfo, sections } = resume;
  
  const experienceSections = sections.filter(section => section.type === 'experience');
  const educationSections = sections.filter(section => section.type === 'education');
  const skillsSections = sections.filter(section => section.type === 'skills');
  const projectsSections = sections.filter(section => section.type === 'projects');
  const customSections = sections.filter(section => section.type === 'custom');
  
  return (
    <div className="font-sans text-gray-900 max-w-3xl mx-auto">
      {/* Header - Ultra minimal */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <p className="text-md text-gray-600">{personalInfo.title}</p>
        )}
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          
          {personalInfo.links.map(link => (
            <a 
              key={link.id} 
              href={link.url} 
              className="text-gray-800 hover:text-black underline" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </header>
      
      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-5">
          <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {experienceSections.length > 0 && experienceSections.map(section => (
        <section key={section.id} className="mb-5">
          <h2 className="text-md font-bold uppercase tracking-wide mb-2">{section.title}</h2>
          <div className="space-y-4">
            {section.items.map((item: any) => (
              <div key={item.id}>
                <div className="flex flex-wrap justify-between items-baseline">
                  <div>
                    <span className="font-medium">{item.position}</span>
                    {item.company && (
                      <span>, {item.company}</span>
                    )}
                    {item.location && (
                      <span className="text-gray-600 text-sm"> ({item.location})</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">
                    {formatDate(item.startDate)} – {item.current ? 'Present' : formatDate(item.endDate)}
                  </span>
                </div>
                {item.description && <p className="mt-1 text-sm">{item.description}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}
      
      {/* Education */}
      {educationSections.length > 0 && educationSections.map(section => (
        <section key={section.id} className="mb-5">
          <h2 className="text-md font-bold uppercase tracking-wide mb-2">{section.title}</h2>
          <div className="space-y-4">
            {section.items.map((item: any) => (
              <div key={item.id}>
                <div className="flex flex-wrap justify-between items-baseline">
                  <div>
                    <span className="font-medium">{item.degree}</span>
                    {item.school && (
                      <span>, {item.school}</span>
                    )}
                    {item.location && (
                      <span className="text-gray-600 text-sm"> ({item.location})</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">
                    {formatDate(item.startDate)} – {formatDate(item.endDate)}
                  </span>
                </div>
                {item.description && <p className="mt-1 text-sm">{item.description}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}
      
      {/* Skills */}
      {skillsSections.length > 0 && skillsSections.map(section => (
        <section key={section.id} className="mb-5">
          <h2 className="text-md font-bold uppercase tracking-wide mb-2">{section.title}</h2>
          {section.items.length > 0 ? (
            <p className="text-sm">
              {section.items.map((item: any, index: number) => (
                <React.Fragment key={item.id}>
                  {item.name}
                  {index < section.items.length - 1 ? ', ' : ''}
                </React.Fragment>
              ))}
            </p>
          ) : (
            <p className="text-gray-500 italic text-sm">No skills added yet</p>
          )}
        </section>
      ))}
      
      {/* Projects */}
      {projectsSections.length > 0 && projectsSections.map(section => (
        <section key={section.id} className="mb-5">
          <h2 className="text-md font-bold uppercase tracking-wide mb-2">{section.title}</h2>
          <div className="space-y-4">
            {section.items.map((item: any) => (
              <div key={item.id}>
                <div className="flex flex-wrap items-baseline">
                  <span className="font-medium">{item.name}</span>
                  {item.link && (
                    <a 
                      href={item.link} 
                      className="ml-2 text-sm text-gray-600 hover:text-gray-900" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      [link]
                    </a>
                  )}
                </div>
                {item.description && <p className="mt-1 text-sm">{item.description}</p>}
                {item.technologies && item.technologies.length > 0 && (
                  <p className="mt-1 text-sm text-gray-600">
                    <span className="italic">Technologies:</span> {item.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
      
      {/* Custom Sections */}
      {customSections.length > 0 && customSections.map(section => (
        <section key={section.id} className="mb-5">
          <h2 className="text-md font-bold uppercase tracking-wide mb-2">{section.title}</h2>
          <div className="space-y-3">
            {section.items.map((item: any) => (
              <div key={item.id}>
                {item.title && <h3 className="font-medium text-sm">{item.title}</h3>}
                <p className="text-sm">{item.content}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default MinimalTemplate;