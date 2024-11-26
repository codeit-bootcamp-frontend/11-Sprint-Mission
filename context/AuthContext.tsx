import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextType {
  hasLogin: boolean;
  setHasLogin: (value: boolean) => void;
}
type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [hasLogin, setHasLogin] = useState<boolean>(false);

  useEffect(() => {
    const storedLogin = localStorage.getItem('hasLogin');
    if (storedLogin === 'true') {
      setHasLogin(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hasLogin', String(hasLogin));
  }, [hasLogin]);

  return (
    <AuthContext.Provider value={{ hasLogin, setHasLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

// Context 소비 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'AuthContext.Provider로 감싸져있는 컴포넌트 내에서만 사용이 가능합니다.'
    );
  }
  return context;
};
