export interface UserProfile {
  name: string;
  title?: string;
  bio?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  progress: number;
  goal: number;
  milestones: Milestone[];
  color: string;
}

export interface Milestone {
  id: string;
  date: string;
  description: string;
  link?: string;
}