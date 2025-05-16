// Resume Types
export interface Link {
  id: string;
  label: string;
  url: string;
}

export interface PersonalInfo {
  id: string;
  type: 'personalInfo';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
  links: Link[];
}

export interface ExperienceItem {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level?: number; // 1-5
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  link?: string;
  technologies: string[];
}

export interface CustomItem {
  id: string;
  title?: string;
  content: string;
}

export type SectionItem = ExperienceItem | EducationItem | SkillItem | ProjectItem | CustomItem;

export interface ResumeSection {
  id: string;
  type: 'experience' | 'education' | 'skills' | 'projects' | 'custom';
  title: string;
  items: SectionItem[];
}

export interface Resume {
  personalInfo: PersonalInfo;
  sections: ResumeSection[];
}

// Template types
export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
}