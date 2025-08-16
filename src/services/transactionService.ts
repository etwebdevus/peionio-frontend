import api from './api';

interface TransactionQueryParams {
  member_id?: string;
  from?: string; // yyyy-MM-dd
  to?: string; // yyyy-MM-dd
  page?: number;
  limit?: number;
}

const transactionService = {
  getRecentTransactions: async () => {
    try {
      const response = await api.get('/team/transactions/recent');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  getAllTransactions: async (params?: TransactionQueryParams) => {
    try {
      const response = await api.get('/team/transactions', { params });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
};

export default transactionService;

