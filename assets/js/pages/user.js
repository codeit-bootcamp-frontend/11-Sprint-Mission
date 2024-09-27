import togglePasswordVisibility from '../utils/passwordToggle.js';
import { 
  validateForm,
  updateSubmitButtonState,
  applyValidationResult
} from '../utils/formValidation.js';

const privateToggleIcons = document.querySelectorAll('.toggle-icon'); 

// userForm 유효성 검사
// initFormValidation('userForm');

// 프라이빗 토글 아이콘 이벤트 함수
togglePasswordVisibility(privateToggleIcons);

const formElement = document.getElementById('userForm');
const inputs = formElement.querySelectorAll('input');
const submitButton = formElement.querySelector('button[type="submit"]');

inputs.forEach((input) => {
  input.addEventListener('focusout', (e) => {
    const inputId = e.target.id;
    const target = document.getElementById(inputId);
    
    // 유효성 검사 결과 반영
    applyValidationResult(target);
  });
});