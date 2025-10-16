import axios from 'axios';
import type { Part, Diagram, Car, System } from './types';

const API_BASE_URL = 'http://localhost:8080/api/catalog';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

export const catalogApi = {
  // Main menu - Get all cars
  getCars: async (): Promise<Car[]> => {
    const response = await api.get<Car[]>('/cars');
    return response.data;
  },

  // Car page - Get car information
  getCar: async (carId: number): Promise<Car> => {
    const response = await api.get<Car>(`/cars/${carId}`);
    return response.data;
  },

  // Car page - Get car systems
  getCarSystems: async (carId: number): Promise<System[]> => {
    const response = await api.get<System[]>(`/cars/${carId}/systems`);
    return response.data;
  },

  // System page - Get diagram
  getDiagram: async (diagramId: number): Promise<Diagram> => {
    const response = await api.get<Diagram>(`/diagrams/${diagramId}`);
    return response.data;
  },

  // Search - Get part by number
  getPartByNumber: async (partNumber: string): Promise<Part> => {
    const response = await api.get<Part>(`/parts/${partNumber}`);
    return response.data;
  },

  // Search parts (if you want to keep search functionality)
  searchParts: async (query: string): Promise<Part[]> => {
    const response = await api.get<Part[]>(`/parts/search?q=${query}`);
    return response.data;
  },
};

// Admin API for adding cars
export const adminApi = {
  addCar: async (carData: {
    brand: string;
    model: string;
    productionYear: number;
    imageUrl: string;
  }): Promise<Car> => {
    const response = await api.post<Car>('/admin/cars', carData);
    return response.data;
  },
};

