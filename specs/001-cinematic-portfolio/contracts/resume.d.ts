export type ExperienceType = 'Embedded' | 'VR/AR' | 'Full Stack';

export interface HeaderInfo {
  name: string;
  title: string;
  tagline: string;
  location: string;
}

export interface ExperienceRole {
  id: string;
  company: string;
  role: string;
  period: string;
  type: ExperienceType;
  description: string[];
  techStack: string[];
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface ResumeData {
  header: HeaderInfo;
  summary: string;
  skills: SkillCategory[];
  experience: ExperienceRole[];
  contact: ContactInfo;
}
