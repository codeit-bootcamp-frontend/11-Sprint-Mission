/**
 * 이메일 유효성 검사
 */
function validateEmailFormat(value: string): string {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) {
    return '이메일을 입력해주세요.';
  }
  if (!emailPattern.test(value)) {
    return '잘못된 이메일 형식입니다.';
  }
  return '';
}

/**
 * 비밀번호 유효성 검사
 */
function validatePasswordFormat(value: string): string {
  if (!value) {
    return '비밀번호를 입력해주세요.';
  }
  if (value.length < 8) {
    return '비밀번호는 8자 이상 입력해주세요.';
  }
  return '';
}

/**
 * 비밀번호 확인 검사
 */
function validatePasswordMatch(value: string, passwordValue: string): string {
  if (!value) {
    return '비밀번호 확인을 입력해주세요.';
  }
  if (value !== passwordValue) {
    return '비밀번호가 일치하지 않습니다.';
  }
  return '';
}

/**
 * 닉네임 유효성 검사
 */
function validateNickNameFormat(value: string): string {
  if (!value) {
    return '닉네임을 입력해주세요.';
  }
  return '';
}

/**
 * 각 input 필드에 대한 에러 메시지 반환
 */
function getValidationErrorMessage({
  name,
  value,
  passwordValue,
}: {
  name: string;
  value: string;
  passwordValue?: string;
}): string {
  switch (name) {
    case 'email':
      return validateEmailFormat(value);
    case 'password':
      return validatePasswordFormat(value);
    case 'password-check':
      return validatePasswordMatch(value, passwordValue || '');
    case 'nickname':
      return validateNickNameFormat(value);
    default:
      return '';
  }
}

export { getValidationErrorMessage };
