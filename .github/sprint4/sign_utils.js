// 이메일 형식 검사 함수
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// 입력값 형식 검사 함수
function validateInputFields(inputElements, validationRules) {
  inputElements.forEach((element) => {
    element.addEventListener('focusout', function() {
      const inputId = this.id;
      const inputValue = this.value.trim();
      const errorElement = document.getElementById(`${inputId}-error`);
      
      // 해당 입력 필드의 유효성 검사 규칙 가져오기
      const validationRule = validationRules[inputId];
      
      if (validationRule) {
        const errorMessage = validationRule(inputValue);
        if (errorElement) {
          if (errorMessage) { // errorMessage가 있으면 true이므로 실행
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            this.classList.add('error-border');
          } else { // errorMessage가 없으면 false이므로 실행
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            this.classList.remove('error-border');
          }
        }
      }
    });
  });
}

// 입력 필드와 에러 메시지를 검사하여 조건에 맞으면 기능을 실행하는 함수
function checkInputsAndExecute(inputElements, submitButton) {
  let hasErrors = false;
  let hasEmptyFields = false;

  inputElements.forEach((element) => {
    if (element.value.trim() === '') {
      hasEmptyFields = true;
    }
    const errorElement = document.getElementById(`${element.id}-error`);
    if (errorElement && errorElement.style.display === 'block') {
      hasErrors = true;
    }
  });

  if (hasErrors || hasEmptyFields) {
    submitButton.disabled = true;
    submitButton.classList.add('error-button');
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove('error-button');
  }
}

// 디바운스 함수
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

export { isValidEmail, validateInputFields, checkInputsAndExecute, debounce };
