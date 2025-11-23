import axios from 'axios';
import { useAuth } from '../context/AuthContext';
export const API_BASE = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:8080';
export const createClient = (authHeader) => {
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
export const fetchUsers = async (client = createClient(), page = 0, size = 20) => {
    const res = await client.get(`/api/users`, { params: { page, size } });
    return res.data.content;
};
export const fetchMeals = async (client = createClient(), page = 0, size = 20) => {
    const res = await client.get(`/api/meals`, { params: { page, size } });
    return res.data.content;
};
export const fetchBreaks = async (client = createClient(), page = 0, size = 20) => {
    const res = await client.get(`/api/breaks`, { params: { page, size } });
    return res.data.content;
};
export const createMeal = async (meal, client = createClient()) => {
    const res = await client.post(`/api/meals`, meal);
    return res.data;
};
export const createBreak = async (br, client = createClient()) => {
    const res = await client.post(`/api/breaks`, br);
    return res.data;
};
export const getSuggestion = async (req, client = createClient()) => {
    const res = await client.post(`/api/suggestions`, req);
    return res.data;
};
