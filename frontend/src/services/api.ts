import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// Vite exposes variables on import.meta.env; add a type-safe accessor fallback.
declare global { interface ImportMeta { env: Record<string, string>; } }
export const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080';

export const createClient = (authHeader?: string) => {
  return axios.create({
    baseURL: API_BASE,
    headers: authHeader ? { Authorization: authHeader } : {}
  });
};

// Hooks providing typed endpoints
export const useApi = () => {
  const { authHeader } = useAuth();
  return createClient(authHeader || undefined);
};

// DTO types
export interface UserDTO { id?: number; username: string; roles?: string[]; }
export interface MealDTO { id?: number; items: string; calories?: number; timestamp?: string; }
export interface BreakRecordDTO { id?: number; breakType: string; startedAt?: string; durationMinutes?: number; }
export interface SuggestionRequestDTO { mood?: number; energy?: number; workMode?: string; screenTimeMinutes?: number; language?: string; }
export interface SuggestionResponseDTO { suggestionText: string; recommendedBreakType: string; recommendedMealIdea: string; }

export const fetchUsers = async (client: ReturnType<typeof createClient>, page = 0, size = 20) => {
  const res = await client.get(`/api/users`, { params: { page, size } });
  return res.data.content as UserDTO[];
};

export const fetchMeals = async (client: ReturnType<typeof createClient>, page = 0, size = 20) => {
  const res = await client.get(`/api/meals`, { params: { page, size } });
  return res.data.content as MealDTO[];
};

export const fetchBreaks = async (client: ReturnType<typeof createClient>, page = 0, size = 20) => {
  const res = await client.get(`/api/breaks`, { params: { page, size } });
  return res.data.content as BreakRecordDTO[];
};

export const createMeal = async (meal: MealDTO, client: ReturnType<typeof createClient>) => {
  const res = await client.post(`/api/meals`, meal);
  return res.data as MealDTO;
};

export const createBreak = async (br: BreakRecordDTO, client: ReturnType<typeof createClient>) => {
  const res = await client.post(`/api/breaks`, br);
  return res.data as BreakRecordDTO;
};

export const getSuggestion = async (req: SuggestionRequestDTO, client: ReturnType<typeof createClient>) => {
  const res = await client.post(`/api/suggestions`, req);
  return res.data as SuggestionResponseDTO;
};
