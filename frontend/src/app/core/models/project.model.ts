export interface Project {

id:          number;
  title:       string;
  description: string;
  emoji:       string;
  bg_color:    string;
  tags:        string[];
  github_url:  string;
  live_url:    string;
  type:        'Solo' | 'Collaboratif';
  is_visible:  boolean;
  order:       number;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectPayload {
  title:       string;
  description: string;
  emoji?:      string;
  bg_color?:   string;
  tags?:       string[];
  github_url?: string;
  live_url?:   string;
  type:        'Solo' | 'Collaboratif';
  is_visible?: boolean;
  order?:      number;
}
