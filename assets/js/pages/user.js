import togglePasswordVisibility from '../utils/passwordToggle.js';
import { 
  getValidationErrorMessage, 
  showErrorMessage, 
  clearErrorMessage,
  updateSubmitButtonStatus,
} from '../utils/formValidation.js';

const formElement = document.getElementById('userForm');
const inputs = formElement.querySelectorAll('input');
const submitButton = formElement.querySelector('button[type="submit"]');
const privateToggleIcons = document.querySelectorAll('.toggle-icon'); 

inputs.forEach((input) => {
  // 포커스 아웃 시 유효성 검사 수행
  input.addEventListener('focusout', (e) => {
    handleInputValidation(e.target);
  });

  // 입력 중 유효성 검사 수행
  input.addEventListener('input', (e) => {
    handleInputValidation(e.target);
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


// 입력 값의 유효성 검사 및 에러 메시지 처리
function handleInputValidation(target) {
  const errorMessage = getValidationErrorMessage(target);
  if (errorMessage) {
    showErrorMessage(target, errorMessage);
    target.setAttribute('data-valid', 'false');
  } else {
    clearErrorMessage(target);
    target.setAttribute('data-valid', 'true');
  }
  // 모든 입력의 유효성에 따라 제출 버튼 상태 업데이트
  updateSubmitButtonStatus(inputs, submitButton);
}