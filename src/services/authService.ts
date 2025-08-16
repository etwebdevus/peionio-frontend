import api from './api';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    isVerified: boolean;
    has2FA: boolean;
  };
}

interface RegisterData {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  password: string;
}

interface TokenResponse {
  token: string;
}

const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post('/team/auth/login', { email, password });
      return {
        token: response.data.data.token,
        user: response.data.data.user
      };
    } catch (error) {
      throw error;
    }
  },

  register: async (userData: RegisterData): Promise<void> => {
    try {
      await api.post('/team/auth/register', userData);
    } catch (error) {
      throw error;
    }
  },

  logout: async (token: string): Promise<void> => {
    try {
      await api.delete('/team/auth/revoke-token', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      throw error;
    }
  },

  forgotPassword: async (email: string): Promise<void> => {
    try {
      await api.post('/team/auth/forgot-password', { email });
    } catch (error) {
      throw error;
    }
  },

  resetPassword: async (token: string, newPassword: string, confirmPassword: string): Promise<void> => {
    try {
      await api.post(`/team/auth/reset-password/${token}`, {
        new_password: newPassword,
        confirm_password: confirmPassword
      });
    } catch (error) {
      throw error;
    }
  },

  verifyEmail: async (token: string): Promise<void> => {
    try {
      await api.get(`/team/auth/verify-email/${token}`);
    } catch (error) {
      throw error;
    }
  },

  resendVerification: async (email: string): Promise<void> => {
    try {
      await api.post('/team/auth/resend-verification', { email });
    } catch (error) {
      throw error;
    }
  },

  refreshToken: async (token: string): Promise<TokenResponse> => {
    try {
      const response = await api.post('/team/auth/refresh-token', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return {
        token: response.data.data.token
      };
    } catch (error) {
      throw error;
    }
  },

  validateToken: async (token: string) => {
    // This is a placeholder - in a real app, you might have an endpoint to validate tokens
    // For now, we'll just try to get the user profile which should fail if the token is invalid
    try {
      const response = await api.get('/team/account/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
};

export default authService;

