'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { instance } from '@/api';
import { Auth, User, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType>({
  user: null,
  getMe: () => {},
  signup: () => Promise.resolve({} as User),
  login: () => Promise.resolve({} as User),
  logout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // 내 정보 가져오기
  async function getMe() {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return setUser(null);
    }

    const response = await instance.get('/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const user = response.data;
    setUser(user);
  }

  // 회원가입
  async function signup(data: Auth) {
    const response = await instance.post('/auth/signUp', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);

    await getMe();

    return response.data;
  }

  // 로그인
  async function login(data: Auth) {
    const response = await instance.post('/auth/signIn', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);

    await getMe();

    return response.data;
  }

  // 로그아웃
  function logout() {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');

    setUser(null);
  }

  // 컴포넌트가 마운트되면 내 정보 가져오기
  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, getMe, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext를 사용하기 위한 커스텀 훅
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('반드시 AuthProvider 안에서 사용해야 합니다.');
  }

  return context;
};

export { AuthProvider, useAuth };
