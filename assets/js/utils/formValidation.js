// 이메일 유효성 검사
function validateEmail(value) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !!value && emailPattern.test(value);
}

// 비밀번호 유효성 검사
function validatePassword(value) {
  return !!value && value.length >= 8;
}

// 비밀번호 확인 검사
function validatePasswordCheck(value, passwordValue) {
  return value === passwordValue;
}

// 각 input에 대한 에러 메시지 반환
function getErrorMessage(input) {
  const value = input.value.trim();
  const inputId = input.id;

  if (!value) {
    switch (inputId) {
      case 'email':
        return '이메일을 입력해 주세요.';
      case 'password':
        return '비밀번호를 입력해 주세요.';
      case 'password-check':
        return '비밀번호를 입력해 주세요.';
      case 'nickname':
        return '닉네임을 입력해 주세요.';
      default:
        return '';
    }
  }

  // 각 input의 id에 따른 유효성 검사
  switch (inputId) {
    case 'email':
      if (!validateEmail(value)) {
        return '잘못된 이메일 형식입니다.';
      }
      break;
    case 'password':
      if (!validatePassword(value)) {
        return '비밀번호를 8자 이상 입력해주세요.';
      }
      break;
    case 'password-check':
      const passwordValue = document.getElementById('password').value.trim();
      if (!validatePasswordCheck(value, passwordValue)) {
        return '비밀번호가 일치하지 않습니다.';
      }
      break;
    default:
      break;
  }

  return '';
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

// 유효성 검사 결과를 DOM에 반영
function applyValidationResult(input) {
  const errorMessage = getErrorMessage(input);
  if (errorMessage) {
    showError(input, errorMessage);
    return false;
  } else {
    hideError(input);
    return true;
  }
}

// 모든 input의 유효성 검사
function validateForm(formElement) {
  let isValid = true;
  const inputs = formElement.querySelectorAll('input');

  inputs.forEach((input) => {
    const valid = applyValidationResult(input);
    if (!valid) {
      isValid = false;
    }
  });

  return isValid;
}

// submit 버튼 상태 업데이트
function updateSubmitButtonState(formElement) {
  const submitButton = formElement.querySelector('button[type="submit"]');
  const isValid = validateForm(formElement);

  if (isValid) {
    submitButton.disabled = false;
    submitButton.classList.add('active');
  } else {
    submitButton.disabled = true;
    submitButton.classList.remove('active');
  }
}

// 폼 유효성 검사 초기화 및 이벤트 설정
function initFormValidation(formId) {
  const formElement = document.getElementById(formId);
  const inputs = formElement.querySelectorAll('input');

  // input 포커스 아웃 시 유효성 검사 수행
  inputs.forEach((input) => {
    input.addEventListener('focusout', () => {
      applyValidationResult(input); 
      updateSubmitButtonState(formElement);
    });
    input.addEventListener('input', () => {
      applyValidationResult(input); 
      updateSubmitButtonState(formElement);
    });
  });

  // submit 버튼 클릭 시 모든 필드 유효성 검사
  formElement.addEventListener('submit', function (event) {
    event.preventDefault(); // 기본 제출 방지
    const isFormValid = validateForm(formElement);
    
    if (isFormValid) {
      alert('제출이 완료되었습니다.');
      formElement.submit(); // 모든 필드가 유효한 경우 폼 제출
    } else {
      alert('유효하지 않은 필드가 있습니다.');
      inputs.forEach((input) => {
        if (!applyValidationResult(input)) {
          input.focus(); // 유효하지 않은 필드에 포커스 맞추기
          return false;
        }
      });
    }
  });
}

export { initFormValidation };