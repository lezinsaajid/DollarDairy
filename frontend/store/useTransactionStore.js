import { create } from 'zustand';
import apiClient from '../api/client';

const useTransactionStore = create((set, get) => ({
    transactions: [],
    isLoading: false,
    error: null,

    // Calculated values
    stats: {
        totalBalance: 0,
        income: 0,
        expenses: 0,
    },

    calculateStats: (transactions) => {
        const income = transactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);
        const expenses = transactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);

        set({
            stats: {
                totalBalance: income - expenses,
                income,
                expenses,
            },
        });
    },

    fetchTransactions: async (filters = {}) => {
        set({ isLoading: true, error: null });
        try {
            const response = await apiClient.get('/transactions', { params: filters });
            const transactions = response.data;
            set({ transactions, isLoading: false });
            get().calculateStats(transactions);
        } catch (error) {
            set({ error: error.message, isLoading: false });
            console.error('Error fetching transactions:', error);
        }
    },

    addTransaction: async (transactionData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await apiClient.post('/transactions', transactionData);
            const newTransaction = response.data;

            set((state) => {
                const updatedTransactions = [newTransaction, ...state.transactions];
                return { transactions: updatedTransactions, isLoading: false };
            });

            get().calculateStats(get().transactions);
            return newTransaction;
        } catch (error) {
            set({ error: error.message, isLoading: false });
            console.error('Error adding transaction:', error);
            throw error;
        }
    },

    deleteTransaction: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await apiClient.delete(`/transactions/${id}`);
            set((state) => {
                const updatedTransactions = state.transactions.filter((t) => t.id !== id);
                return { transactions: updatedTransactions, isLoading: false };
            });
            get().calculateStats(get().transactions);
        } catch (error) {
            set({ error: error.message, isLoading: false });
            console.error('Error deleting transaction:', error);
        }
    },
}));

export default useTransactionStore;
