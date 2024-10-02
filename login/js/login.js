import {
  checkEmail,
  checkPassword,
  activationLogin,
  checkingPassword,
} from './validation.js';
const emailInput = document.getElementById('email');
const password = document.getElementById('password');

emailInput.addEventListener('input', activationLogin);
password.addEventListener('input', activationLogin);

document.getElementById('email')
  .addEventListener('focusout', checkEmail);

document.getElementById('password')
  .addEventListener('focusout', checkPassword);

document.getElementById('eyeButton')
  .addEventListener('click', checkingPassword);

document.getElementById('loginButton')
  .addEventListener('focusout', activationLogin);