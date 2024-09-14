let email = document.querySelector('#email');
let password = document.querySelector('#password');
let btn = document.querySelector('.login-btn');

let emailcount = 0;
let passwordcount = 0;

function emailInput(e){
  emailcount = e.target.value.length;
  console.log(emailcount);
  activeLoginBtn();
}

function passwordInput(e){
  passwordcount = e.target.value.length;
  console.log(passwordcount);
  activeLoginBtn();
}

function activeLoginBtn() {
  if(emailcount > 0 && passwordcount > 0) {
    // btn.setAttribute('class', 'active');
    btn.classList.add('active')
  }
}

function loginSubmit(e) {
  e.preventDefault();

  if(emailcount > 0 && passwordcount > 0) {
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