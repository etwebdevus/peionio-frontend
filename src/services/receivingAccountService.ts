import api from './api';

interface ReceivingAccountData {
  member_id: string;
  payment_rail: string;
  destination_address: string;
}

interface UpdateReceivingAccountData {
  receiving_account_id: string;
  payment_rail: string;
  destination_address: string;
}

const receivingAccountService = {
  createReceivingAccount: async (data: ReceivingAccountData, twoFactorCode?: string) => {
    try {
      const headers: Record<string, string> = {};
      if (twoFactorCode) {
        headers['2FA'] = twoFactorCode;
      }

      const response = await api.post('/team/receiving-accounts', data, {
        headers
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  updateReceivingAccount: async (data: UpdateReceivingAccountData, twoFactorCode?: string) => {
    try {
      const headers: Record<string, string> = {};
      if (twoFactorCode) {
        headers['2FA'] = twoFactorCode;
      }

      const response = await api.put('/team/receiving-accounts', data, {
        headers
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  getAllReceivingAccounts: async () => {
    try {
      const response = await api.get('/team/receiving-accounts');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  getReceivingAccount: async (receivingAccountId: string) => {
    try {
      const response = await api.get(`/team/receiving-accounts/${receivingAccountId}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  reactivateReceivingAccount: async (receivingAccountId: string, twoFactorCode?: string) => {
    try {
      const headers: Record<string, string> = {};
      if (twoFactorCode) {
        headers['2FA'] = twoFactorCode;
      }

      const response = await api.post(`/team/receiving-accounts/reactivate/${receivingAccountId}`, {}, {
        headers
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  extendReceivingAccount: async (receivingAccountId: string, twoFactorCode?: string) => {
    try {
      const headers: Record<string, string> = {};
      if (twoFactorCode) {
        headers['2FA'] = twoFactorCode;
      }

      const response = await api.post(`/team/receiving-accounts/extend/${receivingAccountId}`, {}, {
        headers
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
};

export default receivingAccountService;

