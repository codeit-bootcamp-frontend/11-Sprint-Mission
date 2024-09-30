import { regEmail, btnDisabled, btnTogglePassword } from './utils.js';

const fmLogin = document.getElementById('form-login');
const btnLogin = document.getElementById('btn-login');
const btnEyes = document.querySelectorAll('.btn-eye');
//
const isValid = {
  email: false,
  pw: false,
};

// 요소 유효 처리 함수
// msg는 실패한 경우에만 있다는 가정
const procValid = (el, flag, msg) => {
  // console.log('fn:procValid');
  if (!msg) {
    el.classList.remove('invalid');
    isValid[flag] = true;
  } else {
    el.classList.add('invalid');
    el.nextElementSibling.textContent = msg;
    isValid[flag] = false;
  }
  btnDisabled(btnLogin, isValid);
}

// form에 input focusout 이벤트 위임
fmLogin.addEventListener('focusout', e => {
  const el = e.target;
  const value = el.value.trim();

  // email 확인
  if (el.id === 'email') {
    if (!value) return procValid(el, 'email', '이메일을 입력해 주세요.');
    if (!regEmail.test(value)) return procValid(el, 'email', '잘못된 이메일 형식입니다.');
    procValid(el, 'email');
  }
  // password 확인
  if (el.id === 'pw') {
    const minLength = 8;

    if (!value) return procValid(el, 'pw', '비밀번호를 입력해 주세요.');
    if (value.length < minLength) return procValid(el, 'pw', '비밀번호를 8자 이상 입력해 주세요.');
    procValid(el, 'pw');
  }
});

// 패스워드 토글 버튼
Array.from(btnEyes).forEach(el => {
  el.addEventListener('click', btnTogglePassword);
});