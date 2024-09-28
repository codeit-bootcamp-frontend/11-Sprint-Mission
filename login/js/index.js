import {
  comparePassword,
  checkEmail,
  checkPassword,
  activationLogin,
} from './validation.js';

document.getElementById('email')
  .addEventListener('focusout', checkEmail);

document.getElementById('password')
  .addEventListener('focusout', checkPassword);

document.getElementById('comparePassword')
  .addEventListener('focusout', comparePassword)

// 로그인 버튼 활성화 실행 실패
document.getElementById('loginButton')
  .addEventListener('focusout', activationLogin);

//눈 활성화 실패
const password = document.getElementById('password');
const eyeButton = document.getElementById('eyeButton')

eyeButton.addEventListener('click',function(){
  const currentType = password.getAttribute("type");
  if (currentType === "password") {
    password.setAttribute("type", "text");
    eyeButton.src = "../img/open-eye.png"; // 눈이 열려 있는 이미지로 변경
  } else {
    password.setAttribute("type", "password");
    eyeButton.src = "../img/close-eye.png"; // 눈이 감긴 이미지로 변경
  }
})
