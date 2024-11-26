export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    imageUrl?: string; // Optional field
    userName?: string; // Optional field
    createdAt: Date;
    bio?: string; // Optional field
  }
  

  export interface Project {
    id: string;
    name: string;
    tools_used?: string | null;
    project_type?: string | null;
    project_link?: string | null;
    imageUrl?: string | null;
    details?: string | null;
    other_link?: string | null;
    github_link?: string | null;
    userId?: string | null;
  }
  
  