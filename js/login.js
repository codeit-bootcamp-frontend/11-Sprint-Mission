const email = document.querySelector('#email');
const password = document.querySelector('#password');
const btn = document.querySelector('.login-btn');

function activeLoginBtn() {
  const isValid = email.value.length > 0 && password.value.length > 0; //boolean값으로 받아서 함수를 재사용 가능
  btn.classList.toggle('active', isValid); //toggle에도 사용하고 
  return isValid;
}

[email, password].forEach((input) => {
  input.addEventListener('input', activeLoginBtn);
})


function loginSubmit(e) {
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
btn.addEventListener('click', loginSubmit);



// 비밀번호 visibility 설정 
let passwordVisibility = document.querySelector('.btn-visibility');

console.log(passwordVisibility);

function activePasswordVisibility(visibilityToggle) {
  const img = visibilityToggle.getAttribute('src');
  const newImg = img === 'img/btn_visibility_off.svg' ? 'img/btn_visibility_on.svg' : 'img/btn_visibility_off.svg';
  const newInput = newImg.includes('on') ? 'text' : 'password';

  visibilityToggle.setAttribute('src', newImg);
  visibilityToggle.previousElementSibling.setAttribute('type', newInput);
}

passwordVisibility.addEventListener('click', () => activePasswordVisibility(passwordVisibility));
