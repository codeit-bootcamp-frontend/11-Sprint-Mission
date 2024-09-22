const validInputs = {
  email: false,
  nickname :false,
  password: false,
  passwordRepeat : false
}


// 비밀번호 표기 토글 이벤트 핸들러
function togglePasswordVisibility() {
  // password input tag
  const inputTag = this.previousElementSibling;
  const type = inputTag.getAttribute('type') === 'password' ? 'text' : 'password';

  // 비밀번호 입력란을 가리킴
  inputTag.setAttribute('type', type);

  // 비밀번호 표기 버튼 토글
  Array.from(this.children).forEach(e => e.classList.toggle('hide'))
}

// 비밀번호 표기 버튼 토글 이벤트
document.querySelectorAll('.visibility-btn').forEach(btn => {
  btn.addEventListener('click', togglePasswordVisibility)
})