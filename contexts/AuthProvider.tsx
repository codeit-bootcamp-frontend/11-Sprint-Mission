import { createContext, useContext, useState, ReactNode } from 'react';
import axiosInstance from '@lib/axiosInstance';

interface AuthContextType {
  login: (credentials: { email: string; password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  login: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  async function login(credentials: { email: string; password: string }) {
    try {
      const response = await axiosInstance.post('/auth/signIn', credentials);
      const { accessToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      console.log('로그인 성공');
    } catch (error) {
      console.error('로그인 실패:', error);
      throw new Error('로그인에 실패했습니다.');
    }
  }

  return (
    <AuthContext.Provider
      value={{
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('반드시 AuthProvider 안에서 사용해야 합니다.');
  }

  return context;
}
