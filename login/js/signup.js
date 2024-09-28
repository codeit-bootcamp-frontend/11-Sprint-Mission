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

// 로그인 버튼 활성화 실행 실패
document.getElementById('loginButton')
  .addEventListener('focusout', activationLogin2);

document.getElementById('eyeButton')
  .addEventListener('click', checkingPassword);
  
document.getElementById('eyeButton2')
  .addEventListener('click', checkingPassword2);



// //눈 활성화 실패 위에 작동 안하는 함수들을 숨기고 html중심으로 img위치 할당했더니 실행됨.
// const password = document.getElementById('password');
// const comparePassword = document.getElementById('comparePassword');
// const eyeButton = document.getElementById('eyeButton')
// const eyeButton2 = document.getElementById('eyeButton2')

// eyeButton.addEventListener('click',function(){
//   const currentType = password.getAttribute("type");
//   if (currentType === "password") {
//     password.setAttribute("type", "text");
//     eyeButton.src = "../../img/open-eye.png"; 
//   } else {
//     password.setAttribute("type", "password");
//     eyeButton.src = "../../img/close-eye.png"; 
//   }
// })

// // 동시에 활성화 되는 문제를 막기 위해 코드가 복작해질지 모르겠지만 일단 활성화를 위해 같은 내용을 반복해서 만들었다. 
// // getElementsByClassName으로 바꾸어 봤지만 하나만 활용됨. 일단 두개를 만듬 qurrySelector로 다시 도전 예정
// // 비밀번호 확인용 비밀번호 보기 버튼 활성화
// eyeButton2.addEventListener('click',function(){
//   const currentType = comparePassword.getAttribute("type");
//   if (currentType === "password") {
//     comparePassword.setAttribute("type", "text");
//     eyeButton2.src = "../../img/open-eye.png"; 
//   } else {
//     comparePassword.setAttribute("type", "password");
//     eyeButton2.src = "../../img/close-eye.png"; 
//   }
// })
