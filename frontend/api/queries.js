import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from './client';

export const useTransactions = (filters = {}) => {
    return useQuery({
        queryKey: ['transactions', filters],
        queryFn: async () => {
            const response = await apiClient.get('/transactions', { params: filters });
            return response.data;
        },
    });
};

export const useAddTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (transactionData) => {
            const response = await apiClient.post('/transactions', transactionData);
            return response.data;
        },
        // Optimistic UI Update
        onMutate: async (newTx) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['transactions'] });

            // Snapshot the previous value
            const previousTxs = queryClient.getQueryData(['transactions']);

            // Optimistically update to the new value
            queryClient.setQueryData(['transactions'], (old = []) => [
                { id: 'temp-' + Date.now(), ...newTx, amount: newTx.amount.toString() },
                ...old
            ]);

            // Return a context object with the snapshotted value
            return { previousTxs };
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (err, newTx, context) => {
            queryClient.setQueryData(['transactions'], context.previousTxs);
            alert("Failed to save transaction. Rolling back...");
        },
        // Always refetch after error or success to synchronize with server
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
    });
};

export const useBudgets = () => {
    return useQuery({
        queryKey: ['budgets'],
        queryFn: async () => {
            const response = await apiClient.get('/budgets');
            return response.data;
        },
    });
};

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await apiClient.get('/categories');
            return response.data;
        },
    });
};

export const useInsights = () => {
    return useQuery({
        queryKey: ['insights'],
        queryFn: async () => {
            const response = await apiClient.get('/insights');
            return response.data;
        },
    });
};

export const useCards = () => {
    return useQuery({
        queryKey: ['cards'],
        queryFn: async () => {
            const response = await apiClient.get('/cards');
            return response.data;
        },
    });
};

export const useAddCard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (cardData) => {
            const response = await apiClient.post('/cards', cardData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cards'] });
        },
    });
};

export const downloadMonthlyReport = async (year, month) => {
    // In React Native, we'd typically use expo-file-system and expo-sharing
    // But for simplicity in this web-preview context or initial prototype:
    const url = `${apiClient.defaults.baseURL}/reports/monthly?year=${year}&month=${month}`;
    // This requires the auth token, so we might need a more complex download logic
    // for now we'll just return the URL or implement a helper
    return url;
};

export const scanReceipt = async (imageUri) => {
    const formData = new FormData();
    // In React Native, imageUri needs to be converted to a file object
    formData.append('receipt', {
        uri: imageUri,
        name: 'receipt.jpg',
        type: 'image/jpeg',
    });

    const response = await apiClient.post('/scan', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
