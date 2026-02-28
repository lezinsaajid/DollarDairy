import { create } from 'zustand';
import apiClient from '../api/client';

const useCategoryStore = create((set, get) => ({
    categories: [],
    isLoading: false,
    error: null,

    fetchCategories: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await apiClient.get('/categories');
            set({ categories: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
            console.error('Error fetching categories:', error);
        }
    },

    addCategory: async (categoryData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await apiClient.post('/categories', categoryData);
            const newCategory = response.data;
            set((state) => ({
                categories: [...state.categories, newCategory],
                isLoading: false,
            }));
            return newCategory;
        } catch (error) {
            set({ error: error.message, isLoading: false });
            console.error('Error adding category:', error);
            throw error;
        }
    },
}));

export default useCategoryStore;
