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
  