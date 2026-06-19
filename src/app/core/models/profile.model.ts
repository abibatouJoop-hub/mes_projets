export interface SkillGroup {
  category: string;
  items:    string[];
}

export interface Education {
  year:   string;
  degree: string;
  school: string;
}

export interface Profile {
  id:            number;
  name:          string;
  photo_url?:    string;   // ← nouveau
  tagline:       string;
  bio:           string;
  email:         string;
  phone?:        string;
  location?:     string;
  fiverr_url?:   string;
  github_url?:   string;
  linkedin_url?: string;
  skills:        SkillGroup[];
  education:     Education[];
  soft_skills:   string[];
  updated_at?:   string;
}