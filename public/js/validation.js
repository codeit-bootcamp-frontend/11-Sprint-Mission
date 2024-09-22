/**
 * 입력한 이메일이 다음 형식에 맞는지 확인한다.   
 * - 이메일을 입력했는가
 * - 이메일이 정규표현식에 부합한가
 */
function checkEmailFormat() {
  const fieldset = this.parentNode;
  const alert = fieldset.querySelector('.input-alert');
  const email = this.value.trim();
  const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')

  // 이메일 미입력
  if (email === '') {
    this.dataset.valid = false;
    this.classList.add('warning');
    alert.classList.add('warning');
    alert.textContent = '이메일을 입력해주세요.';
    return;
  }

  // 잘못된 형식의 이메일
  if (!regex.test(email)) {
    this.dataset.valid = false;
    this.classList.add('warning');
    alert.classList.add('warning');
    alert.textContent = '잘못된 이메일 형식입니다.';
    return;
  }

  // 문제 없음
  this.dataset.valid = true;
  this.classList.remove('warning');
  alert.classList.remove('warning');
  alert.textContent = '';
}

function checkNicknameFormat() {
  const fieldset = this.parentNode;
  const alert = fieldset.querySelector('.input-alert');
  const nickname = this.value.trim();

  // 닉네임 미입력
  if (nickname === '') {
    this.dataset.valid = false;
    this.classList.add('warning');
    alert.classList.add('warning');
    alert.textContent = '닉네임을 입력해주세요.';
    return;
  }

  // 문제 없음
  this.dataset.valid = true;
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
    this.dataset.valid = false;
    this.classList.add('warning');
    alert.classList.add('warning');
    alert.textContent = '비밀번호를 입력해주세요.';
    return;
  }

  // 짧은 비밀번호
  if (password.length < 8) {
    this.dataset.valid = false;
    this.classList.add('warning');
    alert.classList.add('warning');
    alert.textContent = '비밀번호를 8자 이상 입력해주세요.';
    return;
  }

  // 문제 없음
  this.dataset.valid = true;
  this.classList.remove('warning');
  alert.classList.remove('warning');
  alert.textContent = '';
}

function comparePassword() {
  const passwordInput = document.querySelector('#password-input');
  const repeatInput = document.querySelector('#password-input-repeat');
  const fieldset = repeatInput.parentNode;
  const alert = fieldset.querySelector('.input-alert');
  const password = passwordInput.value.trim();
  const repeat = repeatInput.value.trim();

  if (repeat === '') {
    repeatInput.dataset.valid = false;
    repeatInput.classList.remove('warning');
    alert.classList.remove('warning');
    alert.textContent = '';
    return;
  }

  if (password !== repeat) {
    repeatInput.dataset.valid = false;
    repeatInput.classList.add('warning');
    alert.classList.add('warning');
    alert.textContent = '비밀번호가 일치하지 않습니다.';
    return;
  }

  // 문제 없음
  repeatInput.dataset.valid = true;
  repeatInput.classList.remove('warning');
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

/**
 * 로그인 폼의 모든 입력이 유효한지 확인하는 함수
 * @return {Boolean} 유효 여부 반환
 * @desctiption 모든 입력의 유효 여부를 확인한다. 유효할 때 로그인 버튼을 활성화 스타일로 변경하고 아니면 비활성화 스타일로 변경한다.
 */
function checkAllInputValid() {
  const submitBtn = document.querySelector('#submit-btn');
  const validInputs = document.querySelectorAll('[data-valid]');
  const result = Array.from(validInputs).every(e => e.dataset.valid === 'true');

  submitBtn.classList.toggle('active', result);
  return result;
}

export {
  checkAllInputValid,
  checkNicknameFormat,
  checkEmailFormat,
  checkPasswordFormat,
  comparePassword,
  togglePasswordVisibility
}