// 로그인에 필요한 필수 입력 요소를 모두 채웠는지 확인하는 함수
function checkAllInputFill() {
  const inputTags = document.querySelectorAll('#login-form input:required')
  const submitBtn = document.querySelector('#login-submit-btn');

  let isAllFilled = Array.from(inputTags).every(tag =>
    tag.value.trim() !== '');

  submitBtn.classList.toggle('active', isAllFilled);
}

// 입력 이메일 형식 확인 함수
function checkEmailFormat() {
  // input tag를 포함하는 fieldset
  const fieldset = this.parentNode;
  // input과 관련된 문구를 삽입할 p태그
  const alert = fieldset.querySelector('.input-alert');
  const email = this.value.trim();
  const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')

  // 이메일 미입력
  if (email === '') {
    this.classList.add('warning');
    alert.classList.add('warning');
    alert.textContent = '이메일을 입력해주세요.';
    return;
  }

  // 잘못된 형식의 이메일
  if (!regex.test(email)) {
    this.classList.add('warning');
    alert.classList.add('warning');
    alert.textContent = '잘못된 이메일 형식입니다.';
    return;
  }

  // 문제 없음
  this.classList.remove('warning');
  alert.classList.remove('warning');
  alert.textContent = '';
}

// 입력 비밀번호 형식 확인 함수
function checkPasswordFormat() {
  // input tag를 포함하는 fieldset
  const fieldset = this.parentNode;
  // input과 관련된 문구를 삽입할 p태그
  const alert = fieldset.querySelector('.input-alert');
  const password = this.value.trim();

  // 비밀번호 미입력
  if (password === '') {
    this.classList.add('warning');
    alert.classList.add('warning');
    alert.textContent = '비밀번호를 입력해주세요.';
    return;
  }

  // 짧은 비밀번호
  if (password.length < 8) {
    this.classList.add('warning');
    alert.classList.add('warning');
    alert.textContent = '비밀번호를 8자 이상 입력해주세요.';
    return;
  }

  // 문제 없음
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

// 입력 이메일 형식 확인 이벤트
document.querySelector('#input-email').addEventListener('focusout', checkEmailFormat)

// 입력 비밀번호 형식 확인 이벤트
document.querySelector('#input-password').addEventListener('focusout', checkPasswordFormat)

// 비밀번호 표기 버튼 토글 이벤트
document.querySelector('.visibility-btn')
  .addEventListener('click', togglePasswordVisibility)

document.addEventListener('input', checkAllInputFill)
