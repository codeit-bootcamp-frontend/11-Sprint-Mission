// 아이콘(눈) 버튼 클릭 시 비밀번호 보이기 / 숨기기
let eye = document.querySelector('.eye');
let password = document.querySelector('#password-input');

function passwordShow () {
  if (password.getAttribute('type') == 'password') {
    eye.classList.add('show');
    password.setAttribute('type', 'text');
  } else {
    eye.classList.remove('show');
    password.setAttribute('type', 'password');
  }
}

eye.addEventListener('click', passwordShow);



// 이메일, 비밀번호 입력 시 로그인 버튼 활성화 / 비활성화
let email = document.querySelector('#email-input');
let loginBtn = document.querySelector('.loginBtn');

function loginBtnActive () {
  if (email.value && password.value) {
    loginBtn.classList.add('active');
  } else {
    loginBtn.classList.remove('active');
  }
}

email.addEventListener('input', loginBtnActive);
password.addEventListener('input', loginBtnActive);



// 이메일, 비밀번호 입력 후 엔터키 누르면 로그인 버튼 클릭
function loginEnter (e) {
  if (e.keyCode == 13 && email.value && password.value) {
    loginBtn.click();
  } else if (e.keyCode == 13 && email.value == '' && password.value !== '') {
    alert('이메일을 입력해 주세요.');
  } else if (e.keyCode == 13 && email.value !== '' && password.value == '') {
    alert('비밀번호를 입력해 주세요.');
  }
}

email.addEventListener('keydown', loginEnter);
password.addEventListener('keydown', loginEnter);