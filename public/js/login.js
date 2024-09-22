import {
  checkAllInputValid,
  togglePasswordVisibility,
  checkEmailFormat,
  checkPasswordFormat
} from './validation.js';

/**
 * 폼 제출을 제어하는 함수
 * @param {Event} e 로그인 폼의 제출 이벤트
 * @description 폼의 모든 입력이 유효할 때 폼을 제출하고 아니면 제출을 막는다. 현재는 폼을 제출하는 대신 /items로 이동고 그렇지 않으면 경고팝업을 띄운다.
 */
function submitForm(e) {
  e.preventDefault();
  const result = checkAllInputValid();

  if (result) location.href = '/views/items.html';
  else alert('잘못된 접근입니다.');
}


// 입력 이메일 형식 확인
document.querySelector('#input-email')
  .addEventListener('focusout', checkEmailFormat);

// 입력 비밀번호 형식 확인
document.querySelector('#input-password')
  .addEventListener('focusout', checkPasswordFormat);

// 모든 입력값이 형식에 맞는지 확인
document.querySelector('#form')
  .addEventListener('focusout', checkAllInputValid);

document.querySelector('#form')
  .addEventListener('submit', submitForm);

// 비밀번호 표기 버튼 토글
document.querySelector('.visibility-btn')
  .addEventListener('click', togglePasswordVisibility);