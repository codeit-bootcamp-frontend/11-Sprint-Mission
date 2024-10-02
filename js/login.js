import {
  isEmail,
  removeSpaceByPassword,
  showWarning,
  deleteWarning,
  validLoginInput,
} from './form-utils/validation.js';
import passwordVisibleToggle from './form-utils/password-toggle.js';

const inputs = document.querySelectorAll('input');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

const warningEmail = document.querySelector('.warning__email');
const warningPassword = document.querySelector('.warning__password');

const buttonDisabled = document.querySelector('.button--disabled');
const buttonEnabled = document.querySelector('.button--enabled');

const passwordEye = document.querySelector('.password--visibility');

function showWarningIfInvalidEmail() {
  emailInput.style.outline = 'none';
  if (emailInput.value.trim() == '') {
    showWarning(emailInput, warningEmail, '이메일을 입력해주세요.');
  } else if (!isEmail(emailInput.value)) {
    showWarning(emailInput, warningEmail, '잘못된 이메일 형식입니다.');
  }
}

function showWarningIfInvalidPassword() {
  passwordInput.style.outline = 'none';
  if (passwordInput.value.trim() == '') {
    showWarning(passwordInput, warningPassword, '비밀번호를 입력해주세요.');
  } else if (passwordInput.value.length < 8) {
    showWarning(
      passwordInput,
      warningPassword,
      '비밀번호를 8자 이상 입력해주세요.'
    );
  }
}

// 포커스 아웃 시 유효성 검사 후 오류 메시지 출력
emailInput.addEventListener('focusout', showWarningIfInvalidEmail);
passwordInput.addEventListener('focusout', showWarningIfInvalidPassword);

// 비밀번호 공백 사용 금지
passwordInput.addEventListener('input', () =>
  removeSpaceByPassword(passwordInput)
);

// 오류 메시지 제거
emailInput.addEventListener('focusin', () =>
  deleteWarning(emailInput, warningEmail)
);
passwordInput.addEventListener('focusin', () =>
  deleteWarning(passwordInput, warningPassword)
);

// 우측 클릭 사용 금지, 값 다 채워졌을 때 버튼 활성화
inputs.forEach((input) =>
  input.addEventListener('contextmenu', (event) => event.preventDefault())
);
inputs.forEach((input) =>
  input.addEventListener('input', () =>
    validLoginInput(buttonEnabled, buttonDisabled, emailInput, passwordInput)
  )
);

// 비밀번호 눈 깜빡임
passwordEye.addEventListener('click', () =>
  passwordVisibleToggle(passwordInput, passwordEye)
);
