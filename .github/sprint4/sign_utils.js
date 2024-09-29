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
        if (errorMessage) {//errorMessage가 있으면 ture이므로 실행
          errorElement.textContent = errorMessage;
          errorElement.style.display = 'block';
          this.classList.add('error-border');
        } else {//errorMessage가 없으면 flase이므로 실행
          errorElement.textContent = '';
          errorElement.style.display = 'none';//
          this.classList.remove('error-border');
        }
      }
    });
  });
}


export {isValidEmail, validateInputFields}


