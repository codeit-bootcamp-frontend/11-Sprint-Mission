const validInputs = {
  email: false,
  password: false
}

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
    this.classList.add('warning');
    alert.classList.add('warning');
    alert.textContent = '이메일을 입력해주세요.';
    validInputs.email = false;
    return;
  }

  // 잘못된 형식의 이메일
  if (!regex.test(email)) {
    this.classList.add('warning');
    alert.classList.add('warning');
    alert.textContent = '잘못된 이메일 형식입니다.';
    validInputs.email = false;
    return;
  }

  // 문제 없음
  this.classList.remove('warning');
  alert.classList.remove('warning');
  alert.textContent = '';
  validInputs.email = true;
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
    validInputs.password = false;
    return;
  }

  // 짧은 비밀번호
  if (password.length < 8) {
    this.classList.add('warning');
    alert.classList.add('warning');
    alert.textContent = '비밀번호를 8자 이상 입력해주세요.';
    validInputs.password = false;
    return;
  }

  // 문제 없음
  this.classList.remove('warning');
  alert.classList.remove('warning');
  alert.textContent = '';
  validInputs.password = true;
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
  const submitBtn = document.querySelector('#login-submit-btn');
  const result = Object.keys(validInputs).every(key => validInputs[key]);

  submitBtn.classList.toggle('active', result);
  return result;
}

/**
 * 폼 제출을 제어하는 함수
 * @param {Event} e 로그인 폼의 제출 이벤트
 * @description 폼의 모든 입력이 유효할 때 폼을 제출하고 아니면 제출을 막는다. 현재는 폼을 제출하는 대신 /items로 이동고 그렇지 않으면 경고팝업을 띄운다.
 */
function submitForm(e) {
  e.preventDefault();
  const result = checkAllInputValid();

  if (result) location.href = '/views/items.html';
  else alert('잘못된 접근입니다.');
}


// 입력 이메일 형식 확인
document.querySelector('#input-email')
  .addEventListener('focusout', checkEmailFormat);

// 입력 비밀번호 형식 확인
document.querySelector('#input-password')
  .addEventListener('focusout', checkPasswordFormat);

// 모든 입력값이 형식에 맞는지 확인
document.querySelector('#login-form')
  .addEventListener('focusout', checkAllInputValid);

document.querySelector('#login-form')
  .addEventListener('submit', submitForm);

// 비밀번호 표기 버튼 토글
document.querySelector('.visibility-btn')
  .addEventListener('click', togglePasswordVisibility);