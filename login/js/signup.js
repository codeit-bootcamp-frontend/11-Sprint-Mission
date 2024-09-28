import {
  comparePasswords,
  checkEmail,
  checkPassword,
  activationLogin2,
  inputNickname,
  checkingPassword,
  checkingPassword2,
} from './validation.js';

const emailInput = document.getElementById('email');
const password = document.getElementById('password');
const nickname = document.getElementById('nickname');
const comparePassword = document.getElementById('comparePassword');

emailInput.addEventListener('input', activationLogin2);
password.addEventListener('input', activationLogin2);
nickname.addEventListener('input', activationLogin2); 
comparePassword.addEventListener('input', activationLogin2);

document.getElementById('email')
  .addEventListener('focusout', checkEmail);

document.getElementById('password')
  .addEventListener('focusout', checkPassword);

document.getElementById('comparePassword')
  .addEventListener('focusout', comparePasswords);

  document.getElementById('nickname')
  .addEventListener('focusout', inputNickname);

document.getElementById('loginButton')
  .addEventListener('focusout', activationLogin2);

document.getElementById('eyeButton')
  .addEventListener('click', checkingPassword);
  
document.getElementById('eyeButton2')
  .addEventListener('click', checkingPassword2);