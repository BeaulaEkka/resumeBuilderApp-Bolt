import { Template } from '../types/resume';

export const defaultTemplates: Template[] = [
  {
    id: 'modern',
    name: 'Modern',
    thumbnail: 'https://images.pexels.com/photos/7125420/pexels-photo-7125420.jpeg?auto=compress&cs=tinysrgb&w=100&h=150&dpr=1',
    description: 'Clean and minimal design with a focus on readability and modern aesthetics.'
  },
  {
    id: 'professional',
    name: 'Professional',
    thumbnail: 'https://images.pexels.com/photos/7125589/pexels-photo-7125589.jpeg?auto=compress&cs=tinysrgb&w=100&h=150&dpr=1',
    description: 'Traditional layout with a professional appearance suitable for corporate roles.'
  },
  {
    id: 'creative',
    name: 'Creative',
    thumbnail: 'https://images.pexels.com/photos/7125556/pexels-photo-7125556.jpeg?auto=compress&cs=tinysrgb&w=100&h=150&dpr=1',
    description: 'Bold design with creative elements for roles in design, marketing, or arts.'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    thumbnail: 'https://images.pexels.com/photos/7125596/pexels-photo-7125596.jpeg?auto=compress&cs=tinysrgb&w=100&h=150&dpr=1',
    description: 'Ultra-minimalist design focused on content with subtle styling.'
  }
];