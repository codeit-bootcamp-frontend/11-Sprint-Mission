//함수 재사용
import{checkEmail, checkPassword} from 'validation.js';

//이벤트처리를 위한 참조변수생성
const emailInput = document.querySelector('.email-input');
const passwordInput = document.querySelector('.password-input');
const loginButton = document.querySelector('.login-button');

//이벤트함수 추가,호출
emailInput.addEventListener('focusout',checkEmail);
passwordInput.addEventListener('focusout',checkPassword);
loginButton.addEventListener('click',() => {
    window.location.href ='./items.html';
});
