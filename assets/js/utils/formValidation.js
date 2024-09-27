/**
 * 이메일 유효성 검사
 * @param {string} value - 입력된 이메일 값
 * @returns {string} - 유효성 검사 결과 에러 메시지 또는 빈 문자열
 */
function validateEmailFormat(value) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!value){
    return '이메일을 입력해 주세요.';
  }
  if (!emailPattern.test(value)) {
    return '잘못된 이메일 형식입니다.';
  }
  
  return '';
}

/**
 * 비밀번호 유효성 검사
 * @param {string} value - 입력된 비밀번호 값
 * @returns {string} - 유효성 검사 결과 에러 메시지 또는 빈 문자열
 */
function validatePasswordFormat(value) {
  if (!value) {
    return '비밀번호를 입력해 주세요.';
  }
  
  if (value.length < 8) {
    return '비밀번호는 8자 이상이어야 합니다.';
  }
  
  return '';
}

/**
 * 비밀번호 확인 검사
 * @param {string} value - 입력된 비밀번호 확인 값
 * @param {string} passwordValue - 원본 비밀번호 값
 * @returns {string} - 유효성 검사 결과 에러 메시지 또는 빈 문자열
 */
function validatePasswordMatch(value, passwordValue) {
  if (!value) {
    return '비밀번호 확인을 입력해 주세요.';
  }

  if (value !== passwordValue) {
    return '비밀번호가 일치하지 않습니다.';
  }
  
  return '';
}

/**
 * 닉네임 유효성 검사
 * @param {string} value - 입력된 닉네임 값
 * @returns {string} - 유효성 검사 결과 에러 메시지 또는 빈 문자열
 */
function validateNickNameFormat(value) {
  if (!value) {
    return '닉네임을 입력해 주세요.';
  }
  
  return '';
}

/**
 * 각 input에 대한 에러 메시지 반환
 * @param {HTMLElement} input - 유효성 검사를 수행할 input 요소
 * @returns {string} - 유효성 검사 결과 에러 메시지 또는 빈 문자열
 */
function getValidationErrorMessage(input) {
  const value = input.value.trim();
  const inputId = input.id;

  // 각 input의 id에 따른 유효성 검사
  switch (inputId) {
    case 'email':
      return validateEmailFormat(value);
    case 'password':
      return validatePasswordFormat(value); 
    case 'password-check':
      const passwordValue = document.getElementById('password').value.trim();
      return validatePasswordMatch(value, passwordValue);
    case 'nickname':
      return validateNickNameFormat(value);
    default:
      return '';
  }
}

/**
 * submit 버튼 상태 업데이트
 * @param {NodeList} inputs - 모든 input 요소들
 * @param {HTMLElement} submitButton - 제출 버튼 요소
 */
function updateSubmitButtonStatus(inputs, submitButton) {
  const allInputs = Array.from(inputs);
  const allValid = allInputs.every((input) => input.getAttribute('data-valid') === 'true');
  
  if (allValid) {
    submitButton.classList.add('active');
    submitButton.disabled = false;
  } else {
    submitButton.classList.remove('active');
    submitButton.disabled = true;
  }
}

/**
 * 에러 메세지 출력
 * @param {HTMLElement} input - 에러 메시지를 표시할 input 요소
 * @param {string} message - 표시할 에러 메시지
 */
function showErrorMessage(input, message) {
  const parent = input.closest('.input-area');
  const errorTag = parent ? parent.querySelector('.error') : null;
  if (errorTag) {
    errorTag.textContent = message;
    errorTag.style.display = 'block';
  }
  input.style.border = '1px solid red';
}

/**
 * 에러 메시지 숨김
 * @param {HTMLElement} input - 에러 메시지를 숨길 input 요소
 */
function clearErrorMessage(input) {
  const parent = input.closest('.input-area');
  const errorTag = parent ? parent.querySelector('.error') : null;
  if (errorTag) {
    errorTag.textContent = '';
    errorTag.style.display = 'none';
  }
  input.style.border = 'none';
}

export { 
  getValidationErrorMessage, 
  showErrorMessage, 
  clearErrorMessage,
  updateSubmitButtonStatus,
};