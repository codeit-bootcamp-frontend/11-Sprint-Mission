import { isValidEmail, validateInputFields, checkInputsAndExecute, debounce } from "./sign_utils.js";

document.addEventListener('DOMContentLoaded', function() {

  const inputElements = document.querySelectorAll('input');
  const submitButton = document.getElementById('submit-button');

  // 타입별 입력값 형식 검사 함수
  const validationRules = {
    email: (value) => {
      if (value === '') {
        return '이메일을 입력해주세요.';
      } else if (!isValidEmail(value)) {
        return '잘못된 이메일 형식입니다.';
      }
      return ''; // 오류 없으면 빈 문자열 반환
    },
    nickname: (value) => {
      if (value === '') {
        return '닉네임을 입력해주세요';
      }
      return ''; // 오류 없으면 빈 문자열 반환
    },
    password: (value) => {
      if (value === '') {
        return '비밀번호를 입력해주세요.';
      } else if (value.length < 8) {
        return '비밀번호를 8자 이상 입력해주세요.';
      }
      return ''; // 오류 없으면 빈 문자열 반환
    },
    passwordConfirmation: (value) => {
      const passwordValue = document.getElementById('password').value.trim();
      if (value === '') {
        return '비밀번호를 다시 입력해주세요.';
      } else if (value !== passwordValue) {
        return '비밀번호가 일치하지 않습니다.';
      }
      return ''; // 오류 없으면 빈 문자열 반환
    }
  };

  // 입력값 형식 검사 함수 호출
  validateInputFields(inputElements, validationRules);

  // 초기 상태 체크
  checkInputsAndExecute(inputElements, submitButton);

  // 디바운스된 체크 함수 생성
  const debouncedCheck = debounce(() => {
    checkInputsAndExecute(inputElements, submitButton);
  }, 300);

  // 입력 필드에 이벤트 리스너 추가
  inputElements.forEach((input) => {
    input.addEventListener('input', debouncedCheck);
    input.addEventListener('focusout', debouncedCheck);
  });
});
