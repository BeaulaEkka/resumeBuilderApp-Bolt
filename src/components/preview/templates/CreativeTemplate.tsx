import React from 'react';
import { Resume } from '../../../types/resume';
import { formatDate } from '../../../utils/aiHelpers';

interface CreativeTemplateProps {
  resume: Resume;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ resume }) => {
  const { personalInfo, sections } = resume;
  
  const experienceSections = sections.filter(section => section.type === 'experience');
  const educationSections = sections.filter(section => section.type === 'education');
  const skillsSections = sections.filter(section => section.type === 'skills');
  const projectsSections = sections.filter(section => section.type === 'projects');
  const customSections = sections.filter(section => section.type === 'custom');
  
  return (
    <div className="font-sans">
      {/* Header - Creative with accent color */}
      <header className="mb-8 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600"></div>
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 pb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <h2 className="text-xl font-light text-gray-700 mt-1">{personalInfo.title}</h2>
        
        <div className="flex flex-wrap mt-4 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="mr-4 mb-2 flex items-center">
              <span className="inline-block h-2 w-2 rounded-full bg-teal-400 mr-2"></span>
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="mr-4 mb-2 flex items-center">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="mr-4 mb-2 flex items-center">
              <span className="inline-block h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
              {personalInfo.location}
            </div>
          )}
        </div>
        
        {personalInfo.links.length > 0 && (
          <div className="flex flex-wrap mt-2 text-sm">
            {personalInfo.links.map(link => (
              <a 
                key={link.id} 
                href={link.url} 
                className="mr-4 mb-1 text-blue-600 hover:text-blue-800 transition-colors border-b border-dashed border-blue-300" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>
      
      {/* Two column layout for the content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column */}
        <div className="md:w-1/3 space-y-6">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-blue-600 border-b-2 border-blue-200 pb-1">About Me</h2>
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}
          
          {/* Skills */}
          {skillsSections.length > 0 && skillsSections.map(section => (
            <section key={section.id} className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-blue-600 border-b-2 border-blue-200 pb-1">{section.title}</h2>
              <div className="space-y-2">
                {section.items.length > 0 ? (
                  section.items.map((item: any) => (
                    <div key={item.id} className="flex items-center">
                      <div className="mr-2 text-sm font-medium w-1/3">{item.name}</div>
                      {item.level && item.level > 0 && (
                        <div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-teal-400 to-blue-500 rounded-full"
                            style={{ width: `${(item.level / 5) * 100}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No skills added yet</p>
                )}
              </div>
            </section>
          ))}
          
          {/* Education */}
          {educationSections.length > 0 && educationSections.map(section => (
            <section key={section.id} className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-blue-600 border-b-2 border-blue-200 pb-1">{section.title}</h2>
              <div className="space-y-4">
                {section.items.map((item: any) => (
                  <div key={item.id} className="relative pl-4 border-l-2 border-blue-200">
                    <h3 className="text-md font-semibold">{item.degree}</h3>
                    <p className="text-sm font-medium text-gray-700">{item.school}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(item.startDate)} - {formatDate(item.endDate)}
                    </p>
                    {item.description && (
                      <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        
        {/* Right column */}
        <div className="md:w-2/3 space-y-6">
          {/* Experience */}
          {experienceSections.length > 0 && experienceSections.map(section => (
            <section key={section.id} className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-blue-600 border-b-2 border-blue-200 pb-1">{section.title}</h2>
              <div className="space-y-6">
                {section.items.map((item: any) => (
                  <div key={item.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-gradient-to-r before:from-teal-400 before:to-blue-500">
                    <div className="flex flex-wrap justify-between mb-1">
                      <h3 className="text-lg font-bold">{item.position}</h3>
                      <span className="text-xs bg-gradient-to-r from-teal-400 to-blue-500 text-white px-2 py-1 rounded-full">
                        {formatDate(item.startDate)} - {item.current ? 'Present' : formatDate(item.endDate)}
                      </span>
                    </div>
                    <p className="text-md font-medium text-gray-700 mb-2">{item.company}{item.location ? ` • ${item.location}` : ''}</p>
                    {item.description && (
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
          
          {/* Projects */}
          {projectsSections.length > 0 && projectsSections.map(section => (
            <section key={section.id} className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-blue-600 border-b-2 border-blue-200 pb-1">{section.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item: any) => (
                  <div key={item.id} className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="text-md font-bold text-gray-800 mb-1">{item.name}</h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    )}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="flex flex-wrap mt-2">
                        {item.technologies.map((tech: string, idx: number) => (
                          <span 
                            key={idx} 
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full mr-1 mb-1"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {item.link && (
                      <a 
                        href={item.link} 
                        className="mt-2 inline-block text-xs text-blue-600 hover:text-blue-800" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
          
          {/* Custom Sections */}
          {customSections.length > 0 && customSections.map(section => (
            <section key={section.id} className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-blue-600 border-b-2 border-blue-200 pb-1">{section.title}</h2>
              <div className="space-y-4">
                {section.items.map((item: any) => (
                  <div key={item.id}>
                    {item.title && (
                      <h3 className="text-md font-semibold mb-1">{item.title}</h3>
                    )}
                    <p className="text-sm text-gray-700">{item.content}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;