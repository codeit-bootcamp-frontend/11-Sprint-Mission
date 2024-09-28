import {
  comparePassword,
  checkEmail,
  checkPassword,
} from './validation.js';

// 입력 이메일 형식 확인
document.getElementById('email')
  .addEventListener('focusout', checkEmail);

// 입력 비밀번호 형식 확인
document.getElementById('password')
  .addEventListener('focusout', checkPassword);

document.getElementById('comparePassword')
  .addEventListener('focusout',comparePassword)