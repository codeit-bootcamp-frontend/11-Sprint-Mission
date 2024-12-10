// 회원가입 시에는 nickname, passwordConfirmation이 필요, 로그인 시에는 필요하지 않습니다.
export interface Auth {
  email: string;
  nickname?: string;
  password: string;
  passwordConfirmation?: string;
}

export interface User {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    image: null;
    nickname: string;
    updatedAt: string;
    createdAt: string;
  };
}

export interface AuthContextType {
  user: User | null;
  signup: (data: Auth) => Promise<User>;
  login: (data: Auth) => Promise<User>;
  logout: () => void;
  getMe: () => void;
}
