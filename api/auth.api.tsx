import { User } from "@/types/User.type";
import axios from "./axios";

interface SignUpParams {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

interface SignInParams {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

async function postSignUp({
  email,
  nickname,
  password,
  passwordConfirmation,
}: SignUpParams): Promise<AuthResponse> {
  const response = await axios({
    method: "post",
    url: "/auth/signUp",
    data: {
      email,
      nickname,
      password,
      passwordConfirmation,
    },
  });
  return response.data;
}

async function postSignIn({
  email,
  password,
}: SignInParams): Promise<AuthResponse> {
  const response = await axios({
    method: "post",
    url: "/auth/signIn",
    data: {
      email,
      password,
    },
  });
  return response.data;
}

async function postRefresh(refreshToken: string) {
  const response = await axios({
    method: "post",
    url: "/auth/refresh-token",
    data: {
      refreshToken,
    },
  });
  return response.data;
}

export { postSignUp, postSignIn, postRefresh };
export type { SignUpParams, SignInParams, AuthResponse };
