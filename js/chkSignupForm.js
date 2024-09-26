const fmSignup = document.getElementById('form-signup');
const btnSignup = document.getElementById('btn-signup');
//
const emailReg = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
const isValid = {
  email: false,
  nick: false,
  pw: false,
  pwre: false,
};

// 로그인 버튼 활성화 함수
const chkBtnSignup = () => {
  // console.log('fn:chkBtnSignup', isValid);
  btnSignup.disabled = Object.values(isValid).some(value => value === false);
}

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
  chkBtnSignup();
}

// form에 input focusout 이벤트 위임
fmSignup.addEventListener('focusout', e => {
  const el = e.target;
  const value = el.value.trim();

  // email 확인
  if (el.id === 'email') {
    if (!value) return procValid(el, 'email', '이메일을 입력해 주세요.');
    if (!emailReg.test(value)) return procValid(el, 'email', '잘못된 이메일 형식입니다.');
    procValid(el, 'email');
  }
  // nick 확인
  if (el.id === 'nick') {
    if (!value) return procValid(el, 'nick', '닉네임을 입력해 주세요.');
    procValid(el, 'nick');
  }
  // password 확인
  if (el.id === 'pw') {
    const minLength = 8;

    if (!value) return procValid(el, 'pw', '비밀번호를 입력해 주세요.');
    if (value.length < minLength) return procValid(el, 'pw', '비밀번호를 8자 이상 입력해 주세요.');
    procValid(el, 'pw');
  }
  // password 확인 확인
  if (el.id === 'pw-re') {
    const pw = document.getElementById('pw');

    if (value !== pw.value) return procValid(el, 'pwre', '비밀번호가 일치하지 않습니다.');
    procValid(el, 'pwre');
  }
});