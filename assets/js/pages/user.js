import togglePasswordVisibility from '../utils/passwordToggle.js';
import { 
  updateSubmitButtonState,
  getErrorMessage,
  showError, 
  hideError,
} from '../utils/formValidation.js';

const formElement = document.getElementById('userForm');
const inputs = formElement.querySelectorAll('input');
const submitButton = formElement.querySelector('button[type="submit"]');
const privateToggleIcons = document.querySelectorAll('.toggle-icon'); 

inputs.forEach((input) => {
  // 포커스 아웃 시 유효성 검사 수행
  input.addEventListener('focusout', (e) => {
    const target = e.target;
    const errorMessage = getErrorMessage(target);
    if (errorMessage) {
      showError(target, errorMessage);
    } else {
      hideError(target);
    }
  });

  // 입력 중 유효성 검사 수행
  input.addEventListener('input', (e) => {
    const target = e.target;
    const errorMessage = getErrorMessage(target);
    if (errorMessage) {
      showError(target, errorMessage);
      target.setAttribute('data-valid', 'false');
    } else {
      hideError(target);
      target.setAttribute('data-valid', 'true');
    }
    // 모든 입력의 유효성에 따라 제출 버튼 상태 업데이트
    updateSubmitButtonState(inputs, submitButton);
  });
});

// 제출 버튼 클릭 이벤트 추가
submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  alert('제출이 완료되었습니다.');
  formElement.submit();
});

// 프라이빗 토글 아이콘 이벤트 함수
togglePasswordVisibility(privateToggleIcons);