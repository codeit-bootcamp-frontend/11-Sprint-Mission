// 이메일 유효성 검사 함수
export function isEmailEmpty(email) {
  return email.trim() === '';
}

export function isEmailValid(email) {
  const emailFormat = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
  return emailFormat.test(email.trim());
}
