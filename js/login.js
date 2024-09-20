const email = document.querySelector('#email');
const password = document.querySelector('#password');
const btn = document.querySelector('.login-btn');

function activeLoginBtn() {
  if(email.value.length > 0 && password.value.length > 0) {
    // btn.setAttribute('class', 'active');
    btn.classList.add('active');
  } else {
    btn.classList.remove('active');
  }
}

[email, password].forEach((input) => {
  input.addEventListener('input', activeLoginBtn);
})




function loginSubmit(e) {
  e.preventDefault();

  if(email.value.length > 0 && password.value.length > 0) {
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

let passwordBtn = document.querySelector('.btn-visibility');
console.log(passwordBtn);

function passwordVisibility(btn) {
  const img = btn.children[0].getAttribute('src');
  const newImg = img === 'img/btn_visibility_off.svg' ? 'img/btn_visibility_on.svg' : 'img/btn_visibility_off.svg';
  const newInput = newImg.includes('on') ? 'text' : 'password';

  btn.previousElementSibling.setAttribute('type', newInput);
  btn.children[0].setAttribute('src', newImg);

}
passwordBtn.addEventListener('click', () => passwordVisibility(passwordBtn));
