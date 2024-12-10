const url = "https://panda-market-api.vercel.app/auth";
export const signup = async (data: {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation?: string;
}) => {
  const response = await fetch(`${url}/signUp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("회원가입 실패");
  }

  return response.json();
};

export const login = async (data: { email: string; password: string }) => {
  const response = await fetch(`${url}/signIn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("로그인 실패");
  }

  const responseData = await response.json();
  return responseData;
};
