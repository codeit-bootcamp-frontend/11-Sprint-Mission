export interface SignUp {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignIn {
  email: string;
  password: string;
}

export interface UserInfo {
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

export interface RefreshToken {
  accessToken: string;
}
