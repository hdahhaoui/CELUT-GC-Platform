
export enum UserType {
  TEACHER = 'teacher',
  COMPANY = 'company',
}

export enum UserTypeFilter {
  ALL = 'all', // Not used for specific teacher/company pages but could be for a general directory
  TEACHER = 'teacher',
  COMPANY = 'company',
}

export interface UserProfile {
  id: string;
  email: string;
  userType: UserType;
  name: string; 
  description: string;
  isValidated: boolean;
  // Teacher-specific
  specialty?: string; 
  cvSummary?: string; 
  photoUrl?: string; 
  // Company-specific
  sector?: string; 
  website?: string; 
  logoUrl?: string; 
}

export enum ProjectType { // As in CELUT-GC backend doc for project 'type'
  PROPOSAL = 'proposal', // Teacher posts
  OFFER = 'offer',     // Company posts
}

export enum ProjectStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  CLOSED = 'closed',
}

// Unified ListingType for frontend routing/components
export enum ListingType {
  PROJECT = 'project',
  INTERNSHIP = 'internship',
}

export interface BaseListing {
  id: string;
  title: string;
  description: string;
  postedBy: Pick<UserProfile, 'id' | 'name' | 'userType'>; 
  datePosted: string; 
  tags?: string[];
}

export interface Project extends BaseListing {
  listingType: ListingType.PROJECT;
  projectType: ProjectType; // Differentiates teacher proposal vs company offer
  status: ProjectStatus;
  category?: string;
}

export interface Internship extends BaseListing {
  listingType: ListingType.INTERNSHIP;
  companyId: string; // ID of the company posting
  companyName: string; // Name of the company for display
  tutorId?: string; // Optional Teacher tutor ID
  tutorName?: string; // Optional Teacher tutor name
  level?: string; 
  startDate?: string;
  endDate?: string;
  location?: string;
}

export type Listing = Project | Internship;

export interface AuthContextType {
  currentUser: UserProfile | null;
  login: (credentials: { email: string; pass: string }) => Promise<void>;
  logout: () => void;
  register: (userData: Omit<UserProfile, 'id' | 'isValidated'>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export interface NewListingData {
  title: string;
  description: string;
  // Project specific
  projectType?: ProjectType;
  status?: ProjectStatus;
  category?: string;
  // Internship specific
  level?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  tags?: string; // Comma-separated string for simplicity
}

export interface RegistrationData extends Omit<UserProfile, 'id' | 'isValidated' | 'photoUrl' | 'logoUrl'> {
  password?: string; // Include password for registration form
}
