import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import axiosInstance from '@lib/axiosInstance';

interface AuthContextType {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function login(credentials: { email: string; password: string }) {
    try {
      const response = await axiosInstance.post('/auth/signIn', credentials);
      const { accessToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('로그인 실패:', error);
      throw new Error('로그인에 실패했습니다.');
    }
  }

  function logout() {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  }

  const value = useMemo(
    () => ({
      login,
      logout,
      isAuthenticated,
    }),
    [isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('반드시 AuthProvider 안에서 사용해야 합니다.');
  }

  return context;
}
