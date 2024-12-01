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
  const response = await axios.post("/auth/signUp", {
    params: {
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
  const response = await axios.post("/auth/signIn", {
    params: {
      email,
      password,
    },
  });
  return response.data;
}

export { postSignUp, postSignIn };
export type { SignUpParams, SignInParams };
