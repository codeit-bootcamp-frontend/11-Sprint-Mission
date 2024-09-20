const email = document.querySelector('#email');
const password = document.querySelector('#password');
const btn = document.querySelector('.login-btn');

function emailInput(){
  activeLoginBtn();
}

function passwordInput(){
  activeLoginBtn();
}

function activeLoginBtn() {
  if(email.value.length > 0 && password.value.length > 0) {
    // btn.setAttribute('class', 'active');
    btn.classList.add('active');
  } else {
    btn.classList.remove('active');
  }
}

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

email.addEventListener('input', emailInput);
password.addEventListener('input', passwordInput);
btn.addEventListener('click', loginSubmit);

// 비밀번호 visibility 설정 

let passwordBtn = document.querySelector('.btn-visibility');

console.log(passwordBtn);

function setPasswordVisibility(e) {
  let img = passwordBtn.children[0].getAttribute('src'); 
  if(img == 'img/btn_visibility_off.svg'){
    passwordBtn.previousElementSibling.setAttribute('type', 'text');
    passwordBtn.children[0].setAttribute('src', 'img/btn_visibility_on.svg')
  } else {
    passwordBtn.previousElementSibling.setAttribute('type', 'password');
    passwordBtn.children[0].setAttribute('src', 'img/btn_visibility_off.svg')
  }
}

passwordBtn.addEventListener('click', setPasswordVisibility);