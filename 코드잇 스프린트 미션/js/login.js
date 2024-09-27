import {
  isEmailEmpty,
  isEmailValid,
  isPasswordEmpty,
  isShortPassword,
  showError,
  removeError,
} from './validation2.js';

// 변수 선언
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
