import {
  UserProfile,
  Project,
  Internship,
  NewListingData,
  RegistrationData,
  UserTypeFilter,
} from '../types';
import { API_BASE_URL } from '../constants';

const jsonHeaders = { 'Content-Type': 'application/json' };

const handleResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  if (res.status === 204) {
    return null as T;
  }
  return (await res.json()) as T;
};

export const apiService = {
  login: async (email: string, pass: string): Promise<UserProfile> => {
    const res = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: jsonHeaders,
      credentials: 'include',
      body: JSON.stringify({ email, password: pass }),
    });
    const user = await handleResponse<UserProfile>(res);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  },

  logout: async (): Promise<void> => {
    await fetch(`${API_BASE_URL}/auth/logout/`, {
      method: 'POST',
      credentials: 'include',
    });
    localStorage.removeItem('currentUser');
  },

  register: async (userData: RegistrationData): Promise<UserProfile> => {
    const res = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: jsonHeaders,
      credentials: 'include',
      body: JSON.stringify(userData),
    });
    return handleResponse<UserProfile>(res);
  },

  getCurrentUser: async (): Promise<UserProfile | null> => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      return JSON.parse(storedUser) as UserProfile;
    }
    const res = await fetch(`${API_BASE_URL}/auth/current/`, { credentials: 'include' });
    return handleResponse<UserProfile | null>(res);
  },

  getProjects: async (): Promise<Project[]> => {
    const res = await fetch(`${API_BASE_URL}/projects/`, { credentials: 'include' });
    return handleResponse<Project[]>(res);
  },

  getInternships: async (): Promise<Internship[]> => {
    const res = await fetch(`${API_BASE_URL}/internships/`, { credentials: 'include' });
    return handleResponse<Internship[]>(res);
  },

  getUsers: async (filter: UserTypeFilter): Promise<UserProfile[]> => {
    const res = await fetch(`${API_BASE_URL}/users/?type=${filter}`, { credentials: 'include' });
    return handleResponse<UserProfile[]>(res);
  },

  createProject: async (data: NewListingData): Promise<Project> => {
    const res = await fetch(`${API_BASE_URL}/projects/`, {
      method: 'POST',
      headers: jsonHeaders,
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return handleResponse<Project>(res);
  },

  createInternship: async (data: NewListingData): Promise<Internship> => {
    const res = await fetch(`${API_BASE_URL}/internships/`, {
      method: 'POST',
      headers: jsonHeaders,
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return handleResponse<Internship>(res);
  },
};
