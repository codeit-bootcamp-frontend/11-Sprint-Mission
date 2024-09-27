// 이메일 유효성 검사
function validateEmail(value) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!value){
    return '이메일을 입력해 주세요.';
  }
  if (!emailPattern.test(value)) {
    return '잘못된 이메일 형식입니다.';
  }
  
  return '';
}

// 비밀번호 유효성 검사
function validatePassword(value) {
  if (!value) {
    return '비밀번호를 입력해 주세요.';
  }
  
  if (value.length < 8) {
    return '비밀번호는 8자 이상이어야 합니다.';
  }
  
  return '';
}

// 비밀번호 확인 검사
function validatePasswordCheck(value, passwordValue) {
  if (!value) {
    return '비밀번호 확인을 입력해 주세요.';
  }

  if (value !== passwordValue) {
    return '비밀번호가 일치하지 않습니다.';
  }
  
  return '';
}

function validateNickName(value) {
  if (!value) {
    return '닉네임을 입력해 주세요.';
  }
  
  return '';
}

// 각 input에 대한 에러 메시지 반환
function getErrorMessage(input) {
  const value = input.value.trim();
  const inputId = input.id;

  // 각 input의 id에 따른 유효성 검사
  switch (inputId) {
    case 'email':
      return validateEmail(value);
    case 'password':
      return validatePassword(value); 
    case 'password-check':
      const passwordValue = document.getElementById('password').value.trim();
      return validatePasswordCheck(value, passwordValue);
    case 'nickname':
      return validateNickName(value);
    default:
      return '';
  }
}

// 에러 메시지 출력
function showError(input, message) {
  const parent = input.closest('.input-area');
  const errorTag = parent ? parent.querySelector('.error') : null;
  if (errorTag) {
    errorTag.textContent = message;
    errorTag.style.display = 'block';
  }
  input.style.border = '1px solid red';
}

// 에러 메시지 숨김
function hideError(input) {
  const parent = input.closest('.input-area');
  const errorTag = parent ? parent.querySelector('.error') : null;
  if (errorTag) {
    errorTag.textContent = '';
    errorTag.style.display = 'none';
  }
  input.style.border = 'none';
}

// submit 버튼 상태 업데이트
function updateSubmitButtonState(inputs, submitButton) {
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

export { 
  getErrorMessage, 
  showError, 
  hideError,
  updateSubmitButtonState,
};