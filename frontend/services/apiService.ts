
import { 
  UserProfile, 
  UserType, 
  Listing, 
  Project, 
  Internship, 
  ListingType, 
  ProjectType, 
  ProjectStatus, 
  NewListingData,
  RegistrationData,
  UserTypeFilter
} from '../types';
import { MOCK_API_DELAY } from '../constants';

// --- Mock Database ---
let mockUsers: UserProfile[] = [
  { id: 'user1', email: 'teacher1@univ-tlemcen.dz', name: 'Prof. Fatima Zohra', userType: UserType.TEACHER, specialty: 'Génie des Matériaux, Béton Haute Performance', cvSummary: 'Expert en durabilité des structures.', isValidated: true, photoUrl: 'https://picsum.photos/seed/teacher1/100/100', description: 'Enseignant chercheur passionné par l\'innovation dans le BTP.' },
  { id: 'user2', email: 'company1@example.com', name: 'BTP Construction SARL', userType: UserType.COMPANY, sector: 'Bâtiment et Travaux Publics', website: 'https://btpconstruction.example.com', isValidated: true, logoUrl: 'https://picsum.photos/seed/company1/100/100', description: 'Entreprise leader dans la construction de grands ouvrages.' },
  { id: 'user3', email: 'teacher2@univ-tlemcen.dz', name: 'Dr. Ahmed Benamar', userType: UserType.TEACHER, specialty: 'Hydraulique Urbaine, Modélisation des Écoulements', cvSummary: 'Recherches sur la gestion des ressources en eau.', isValidated: true, photoUrl: 'https://picsum.photos/seed/teacher2/100/100', description: 'Focus sur les solutions durables pour l\'eau.' },
  { id: 'user4', email: 'company2@example.com', name: 'InfraConsult Ingénierie', userType: UserType.COMPANY, sector: 'Bureau d\'études techniques, Conseil', website: 'https://infraconsult.example.com', isValidated: false, logoUrl: 'https://picsum.photos/seed/company2/100/100', description: 'Accompagnement de projets d\'infrastructures complexes. Compte en attente de validation.' },
];

let mockListings: Listing[] = [
  { id: 'proj1', listingType: ListingType.PROJECT, title: 'Étude de formulation de bétons écologiques à base de granulats recyclés', description: 'Projet de recherche visant à développer des bétons plus durables en utilisant des matériaux recyclés. Collaboration souhaitée avec une entreprise pour des essais en conditions réelles.', postedBy: { id: 'user1', name: 'Prof. Fatima Zohra', userType: UserType.TEACHER }, datePosted: '2023-10-15T10:00:00Z', projectType: ProjectType.PROPOSAL, status: ProjectStatus.OPEN, category: 'Recherche & Développement', tags: ['béton écologique', 'recyclage', 'matériaux durables'] },
  { id: 'intern1', listingType: ListingType.INTERNSHIP, title: 'Stage Assistant Conducteur de Travaux (PFE)', description: 'Participer au suivi de chantier, à la gestion des équipes et au contrôle qualité sur un projet de construction de logements collectifs.', companyId: 'user2', companyName: 'BTP Construction SARL', postedBy: { id: 'user2', name: 'BTP Construction SARL', userType: UserType.COMPANY }, datePosted: '2023-11-01T14:30:00Z', level: 'Master 2 / Ingénieur', location: 'Tlemcen', startDate: '2024-02-01', endDate: '2024-07-31', tags: ['conduite de travaux', 'PFE', 'génie civil'] },
  { id: 'proj2', listingType: ListingType.PROJECT, title: 'Optimisation des réseaux d\'assainissement par modélisation hydraulique', description: 'L\'entreprise InfraConsult cherche un partenariat avec un laboratoire universitaire pour une étude d\'optimisation de réseaux existants. Expertise en modélisation hydraulique requise.', postedBy: { id: 'user4', name: 'InfraConsult Ingénierie', userType: UserType.COMPANY }, datePosted: '2023-11-05T09:00:00Z', projectType: ProjectType.OFFER, status: ProjectStatus.OPEN, category: 'Étude Technique', tags: ['modélisation hydraulique', 'assainissement', 'optimisation'] },
];
// --- End Mock Database ---

// Helper to simulate API call delay
const simulateDelay = <T,>(data: T): Promise<T> => 
  new Promise(resolve => setTimeout(() => resolve(data), MOCK_API_DELAY));

let loggedInUser: UserProfile | null = null; // Simulate session

export const apiService = {
  login: async (email: string, pass: string): Promise<UserProfile> => {
    // In a real app, this would be an API call. Here, we mock.
    // WARNING: Never handle passwords like this in a real app!
    const user = mockUsers.find(u => u.email === email);
    if (user) { // Simplified: no password check for mock
      if(!user.isValidated && user.userType !== UserType.COMPANY) { // Allow unvalidated company to login to see status
          // For teachers, generally, validation is needed to use the platform.
          // throw new Error("Votre compte enseignant est en attente de validation.");
      }
      loggedInUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return simulateDelay(user);
    }
    throw new Error('Email ou mot de passe incorrect.');
  },

  logout: async (): Promise<void> => {
    loggedInUser = null;
    localStorage.removeItem('currentUser');
    return simulateDelay(undefined);
  },

  register: async (userData: RegistrationData): Promise<UserProfile> => {
    if (mockUsers.some(u => u.email === userData.email)) {
      throw new Error('Cet email est déjà utilisé.');
    }
    const newUser: UserProfile = {
      id: `user${mockUsers.length + 1}`,
      ...userData,
      isValidated: false, // New users always start as not validated
      // photoUrl and logoUrl would be handled by file upload in a real app
    };
    mockUsers.push(newUser);
    // In a real app, email validation would be sent here from backend
    return simulateDelay(newUser);
  },

  getCurrentUser: async (): Promise<UserProfile | null> => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        loggedInUser = JSON.parse(storedUser);
        return simulateDelay(loggedInUser);
    }
    return simulateDelay(null);
  },

  getProjects: async (): Promise<Project[]> => {
    const projects = mockListings.filter(l => l.listingType === ListingType.PROJECT) as Project[];
    return simulateDelay(projects);
  },

  getInternships: async (): Promise<Internship[]> => {
    const internships = mockListings.filter(l => l.listingType === ListingType.INTERNSHIP) as Internship[];
    return simulateDelay(internships);
  },
  
  getUsers: async (filter: UserTypeFilter): Promise<UserProfile[]> => {
    let filteredUsers = mockUsers;
    if (filter === UserTypeFilter.TEACHER) {
        filteredUsers = mockUsers.filter(u => u.userType === UserType.TEACHER);
    } else if (filter === UserTypeFilter.COMPANY) {
        filteredUsers = mockUsers.filter(u => u.userType === UserType.COMPANY);
    }
    // Only return validated users for public lists, or all if filter is 'all' (not used here)
    // For this app, let's show all for demo, validation status can be shown on card
    // return simulateDelay(filteredUsers.filter(u => u.isValidated || filter === UserTypeFilter.ALL ));
    return simulateDelay(filteredUsers);
  },

  createProject: async (data: NewListingData, creator: UserProfile): Promise<Project> => {
    if (!creator) throw new Error("Utilisateur non authentifié.");
    const newProject: Project = {
      id: `proj${mockListings.filter(l => l.listingType === ListingType.PROJECT).length + 1}`,
      listingType: ListingType.PROJECT,
      title: data.title,
      description: data.description,
      postedBy: { id: creator.id, name: creator.name, userType: creator.userType },
      datePosted: new Date().toISOString(),
      projectType: data.projectType!,
      status: data.status!,
      category: data.category,
      tags: data.tags?.split(',').map(tag => tag.trim()).filter(tag => tag) || [],
    };
    mockListings.unshift(newProject); // Add to beginning of array
    return simulateDelay(newProject);
  },

  createInternship: async (data: NewListingData, creator: UserProfile): Promise<Internship> => {
     if (!creator || creator.userType !== UserType.COMPANY) throw new Error("Seules les entreprises peuvent publier des stages.");
    const newInternship: Internship = {
      id: `intern${mockListings.filter(l => l.listingType === ListingType.INTERNSHIP).length + 1}`,
      listingType: ListingType.INTERNSHIP,
      title: data.title,
      description: data.description,
      companyId: creator.id,
      companyName: creator.name,
      postedBy: { id: creator.id, name: creator.name, userType: creator.userType },
      datePosted: new Date().toISOString(),
      level: data.level,
      startDate: data.startDate,
      endDate: data.endDate,
      location: data.location,
      tags: data.tags?.split(',').map(tag => tag.trim()).filter(tag => tag) || [],
    };
    mockListings.unshift(newInternship);
    return simulateDelay(newInternship);
  },
};
