import api from './api';

const accountService = {
  getCredits: async () => {
    try {
      const response = await api.get('/team/account/credits');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  buyCredits: async (amount: number) => {
    try {
      const response = await api.post('/team/account/credits', { amount });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  getAllMembers: async () => {
    try {
      const response = await api.get('/team/account/members');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  registerMember: async (memberData: {
    first_name: string;
    last_name: string;
    middle_name?: string;
    email: string;
  }, twoFactorCode?: string) => {
    try {
      const headers: Record<string, string> = {};
      if (twoFactorCode) {
        headers['2FA'] = twoFactorCode;
      }

      const response = await api.post('/team/account/members/register', memberData, {
        headers
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  addMember: async (email: string, twoFactorCode?: string) => {
    try {
      const headers: Record<string, string> = {};
      if (twoFactorCode) {
        headers['2FA'] = twoFactorCode;
      }

      const response = await api.post('/team/account/members/add', { email }, {
        headers
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  verifyMember: async (token: string) => {
    try {
      const response = await api.post(`/team/account/members/verify/${token}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  removeMember: async (memberId: string, twoFactorCode?: string) => {
    try {
      const headers: Record<string, string> = {};
      if (twoFactorCode) {
        headers['2FA'] = twoFactorCode;
      }

      await api.delete(`/team/account/members/${memberId}`, {
        headers
      });
      return true;
    } catch (error) {
      throw error;
    }
  },

  setup2FA: async () => {
    try {
      const response = await api.get('/team/account/2fa');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  reset2FA: async (twoFactorCode: string) => {
    try {
      const response = await api.post('/team/account/2fa', {}, {
        headers: {
          '2FA': twoFactorCode
        }
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  changePassword: async (oldPassword: string, newPassword: string, confirmPassword: string, twoFactorCode?: string) => {
    try {
      const headers: Record<string, string> = {};
      if (twoFactorCode) {
        headers['2FA'] = twoFactorCode;
      }

      await api.post('/team/account/change-password', {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword
      }, {
        headers
      });
      return true;
    } catch (error) {
      throw error;
    }
  }
};

export default accountService;

