// 로그인에 필요한 필수 입력 요소를 모두 채웠는지 확인하는 함수
function checkAllInputFill() {
  const inputTags = document.querySelectorAll('#signup-form input:required')
  const submitBtn = document.querySelector('#signup-submit-btn');

  let isAllFilled = Array.from(inputTags).every(tag => 
    tag.value.trim() !== '');

  submitBtn.classList.toggle('active', isAllFilled);
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

document.addEventListener('input', checkAllInputFill)