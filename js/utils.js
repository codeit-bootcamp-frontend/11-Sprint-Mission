// 이메일 정규식
const regEmail = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

// 서브밋 버튼 활성화
const btnDisabled = (btn, obj) => {
  btn.disabled = Object.values(obj).some(value => value === false);
}

// 패스워드 토글 버튼
function btnTogglePassword() {
  const parent = this.parentElement;
  const img = parent.querySelector('.btn-eye img');
  const input = parent.querySelector('input');

  if (input.type === 'password') {
    input.type = 'text';
    img.src = '/img/login/ico-eye.png';
    img.title = img.alt = '비밀번호 숨기기';
  } else {
    input.type = 'password';
    img.src = '/img/login/ico-ban-eye.png';
    img.title = img.alt = '비밀번호 보기';
  }
}

export {
  regEmail,
  btnDisabled,
  btnTogglePassword,
}