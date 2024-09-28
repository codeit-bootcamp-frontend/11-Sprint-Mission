import {
  checkEmail,
  checkPassword,
  activationLogin,
} from './validation.js';

document.getElementById('email')
  .addEventListener('focusout', checkEmail);

document.getElementById('password')
  .addEventListener('focusout', checkPassword);

// 로그인 버튼 활성화 실행 실패
document.getElementById('loginButton')
  .addEventListener('focusout', activationLogin);

const password = document.getElementById('password');
const eyeButton = document.getElementById('eyeButton')

// 로그인버튼에 없던 요소를 지웠더니 실행됨.
eyeButton.addEventListener('click',function(){
  const currentType = password.getAttribute("type");
  if (currentType === "password") {
    password.setAttribute("type", "text");
    eyeButton.src = "../img/open-eye.png"; 
  } else {
    password.setAttribute("type", "password");
    eyeButton.src = "../img/close-eye.png"; 
  }
})
