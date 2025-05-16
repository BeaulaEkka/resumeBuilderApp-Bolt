import { Resume } from '../types/resume';

// Since we can't use real AI APIs in this environment, we'll simulate AI content generation
export const generateAIContent = async (prompt: string, resumeData: Resume): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Sample responses based on different section types and prompts
  const responses: Record<string, string[]> = {
    summary: [
      "Results-driven software developer with 5+ years of experience creating robust applications using React, Node.js, and TypeScript. Specializing in building scalable, user-friendly web applications with modern architecture and best practices. Passionate about clean code, performance optimization, and innovative solutions.",
      "Experienced marketing professional with a proven track record of developing and executing comprehensive marketing strategies. Adept at leveraging data analytics to drive growth and engagement across digital platforms. Skilled in content creation, social media management, and brand development.",
      "Detail-oriented project manager with expertise in Agile methodologies and a track record of delivering complex projects on time and within budget. Strong communication and leadership skills with experience managing cross-functional teams. Certified PMP with proficiency in project management tools and techniques."
    ],
    experience: [
      "Led development of the company's main product, improving performance by 40% through code refactoring and implementing modern React patterns. Collaborated with design team to implement new features that increased user engagement by 25%. Mentored junior developers and implemented code review processes.",
      "Managed marketing campaigns across multiple channels, resulting in 35% increase in lead generation. Created and implemented content strategy that improved organic traffic by 50%. Collaborated with product team to develop marketing materials for new product launches.",
      "Directed cross-functional team of 12 to deliver enterprise software solution ahead of schedule. Implemented Agile methodologies that improved team productivity by 30%. Served as primary client liaison, translating business requirements into technical specifications."
    ],
    education: [
      "Completed coursework in Advanced Software Development, Data Structures and Algorithms, and Machine Learning. Participated in coding competitions and hackathons. Developed an e-commerce platform as capstone project, implementing full-stack architecture.",
      "Specialized in Digital Marketing with focus on analytics and consumer behavior. President of Marketing Club, organizing industry networking events and workshops. Completed thesis on emerging trends in social media marketing strategies.",
      "Focus on Project Management and Business Administration. Completed certification in Six Sigma alongside degree. Selected for competitive leadership development program with industry mentorship."
    ],
    skills: [
      "JavaScript, TypeScript, React, Node.js, Express, MongoDB, SQL, Git, CI/CD, AWS, Docker, Jest, Redux, GraphQL",
      "Digital Marketing, SEO, SEM, Content Strategy, Social Media Management, Email Marketing, Analytics, Adobe Creative Suite, CRM Systems",
      "Project Management, Agile, Scrum, Kanban, JIRA, MS Project, Stakeholder Management, Risk Analysis, Budgeting, Team Leadership"
    ]
  };
  
  // Determine which type of content to generate based on the prompt
  let responseType = 'summary';
  if (prompt.toLowerCase().includes('experience') || prompt.toLowerCase().includes('work')) {
    responseType = 'experience';
  } else if (prompt.toLowerCase().includes('education') || prompt.toLowerCase().includes('school')) {
    responseType = 'education';
  } else if (prompt.toLowerCase().includes('skill')) {
    responseType = 'skills';
  }
  
  // Get a random response from the appropriate category
  const responseArray = responses[responseType];
  const randomIndex = Math.floor(Math.random() * responseArray.length);
  return responseArray[randomIndex];
};

// Function to format dates for display
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });
};

// Helper function to create PDF export (in a real app, this would use a library like jsPDF)
export const exportToPDF = (resumeData: Resume, templateId: string): void => {
  // In a real application, this would generate and download a PDF
  // For this demo, we'll just log the action
  console.log('Exporting resume to PDF', { resumeData, templateId });
  
  // Create a placeholder download dialog
  alert('Your resume would be downloaded as PDF in a real application.');
};