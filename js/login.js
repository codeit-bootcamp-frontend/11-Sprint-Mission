import { activePasswordVisibility, checkInputFormat } from './components/label.js'

const email = document.querySelector('#email');
const password = document.querySelector('#password');
const btn = document.querySelector('.login-btn');

//input 값 올바른지 확인 후, 빨간색 아웃라인을 추가하는 함수 
[email, password].forEach((input) => {
  input.addEventListener('focusout', checkInputFormat);
})


//로그인 버튼 활성화 하는 함수
function activeLoginBtn() {
  //const isValid = email.value.length > 0 && password.value.length > 0; //boolean값으로 받아서 함수를 재사용 가능
  console.log(isValid);
  btn.classList.toggle('active', isValid); //toggle에도 사용하고 
  return isValid;
}

[email, password].forEach((input) => {
  input.addEventListener('input', activeLoginBtn);
})


//로그인 버튼 제출했을 때의 함수 = 로그인 버튼 클릭했을 때의 함수
function submitLogin(e) {
  e.preventDefault();

  if(activeLoginBtn()) { //activeLoginBtn 함수를 재사용
    console.log('로그인 제출:', {
      email: email.value,
      password: password.value
    });

    //추가적인 제출 코드 작성
  } else {
    console.log('입력이 부족합니다.')
  }
}
btn.addEventListener('click', submitLogin);



// 비밀번호 눈 모양 visibility 설정하는 함수

const passwordVisibility = document.querySelector('.btn-visibility');
console.log(passwordVisibility);

passwordVisibility.addEventListener('click', () => activePasswordVisibility(passwordVisibility));
