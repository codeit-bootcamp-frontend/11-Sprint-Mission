// 로그인에 필요한 필수 입력 요소를 모두 채웠는지 확인하는 함수
function checkAllInputFill() {
  const inputTags = document.querySelectorAll('#login-form input:required')
  const submitBtn = document.querySelector('#login-submit-btn');

  let isAllFilled = Array.from(inputTags).every(tag =>
    tag.value.trim() !== '');

  submitBtn.classList.toggle('active', isAllFilled);
}

function checkEmailFormat() {
  // input tag를 포함하는 fieldset
  const fieldset = this.parentNode;
  // input과 관련된 문구를 삽입할 p태그
  const alert = fieldset.querySelector('.input-alert');
  const email = this.value.trim();

  // 이메일 미입력
  if (email === '') {
    this.classList.add('warning');
    alert.classList.add('warning');
    alert.textContent = '이메일을 입력해주세요.';
    return;
  }

  this.classList.remove('warning');
  alert.classList.remove('warning');
  alert.textContent = '';
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

// 입력 이메일 포맷 확인 이벤트
document.querySelector('#input-email').addEventListener('focusout', checkEmailFormat)

// 비밀번호 표기 버튼 토글 이벤트
document.querySelector('.visibility-btn')
  .addEventListener('click', togglePasswordVisibility)

document.addEventListener('input', checkAllInputFill)
