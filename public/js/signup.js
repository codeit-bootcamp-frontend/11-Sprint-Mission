import {
  checkAllInputValid,
  checkNicknameFormat,
  checkEmailFormat,
  checkPasswordFormat,
  comparePassword,
  togglePasswordVisibility
} from './validation.js';

/**
 * 폼 제출을 제어하는 함수
 * @param {Event} e 로그인 폼의 제출 이벤트
 * @description 폼의 모든 입력이 유효할 때 폼을 제출하고 아니면 제출을 막는다. 현재는 폼을 제출하는 대신 /signin로 이동고 그렇지 않으면 경고팝업을 띄운다.
 */
function submitForm(e) {
  e.preventDefault();
  const result = checkAllInputValid();

  if (result) location.href = '/views/signin.html';
  else alert('잘못된 접근입니다.');
}

document.querySelector('#input-email')
  .addEventListener('focusout', checkEmailFormat);

document.querySelector('#input-nickname')
  .addEventListener('focusout', checkNicknameFormat);

document.querySelector('#input-password')
  .addEventListener('focusout', checkPasswordFormat);

document.querySelector('#input-password')
  .addEventListener('focusout', comparePassword);

document.querySelector('#input-password-repeat')
  .addEventListener('focusout', comparePassword);

document.querySelector('#signup-form')
  .addEventListener('focusout', checkAllInputValid);

document.querySelector('#signup-form')
  .addEventListener('submit', submitForm);

document.querySelectorAll('.visibility-btn').forEach(btn => {
  btn.addEventListener('click', togglePasswordVisibility)
})