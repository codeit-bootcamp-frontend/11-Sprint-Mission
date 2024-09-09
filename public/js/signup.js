const inputEmail = document.querySelector('#input-email');
const inputNickname = document.querySelector('#input-nickname');
const inputPassword = document.querySelector('#input-password');
const inputPasswordRepeat = document.querySelector('#input-password-repeat');
const submitBtn = document.querySelector('#signup-submit-btn');

const visibleBtn1 = document.querySelector('.visible-btn.first');
const visibleBtn2 = document.querySelector('.visible-btn.second');

function comparePassword() {
  const pw = inputPassword.value;
  const rpw = inputPasswordRepeat.value;

  if (pw === rpw) return true;
  else return false;
}

function checkAllInputFill() {
  const email = inputEmail.value !== '';
  const nickname = inputNickname.value !== '';
  const password = inputPassword.value !== '';
  const repeat = inputPasswordRepeat.value !== '';

  if (!comparePassword()) {
    submitBtn.classList.remove('active')
    return false;
  }

  if (email && nickname && password && repeat) {
    submitBtn.classList.add('active')
    return true;
  } else {
    submitBtn.classList.remove('active')
    return false;
  }
}

visibleBtn1.addEventListener('click', function (e) {
  const type = inputPassword.getAttribute('type');
  const eye = visibleBtn1.querySelector('.fa-eye');
  const eyeSlash = visibleBtn1.querySelector('.fa-eye-slash');

  if (type === 'password') {
    inputPassword.setAttribute('type', 'text');
    eye.classList.add('active');
    eyeSlash.classList.remove('active');
  } else if (type === 'text') {
    inputPassword.setAttribute('type', 'password');
    eye.classList.remove('active');
    eyeSlash.classList.add('active');
  }
})

visibleBtn2.addEventListener('click', function (e) {
  const type = inputPasswordRepeat.getAttribute('type');
  const eye = visibleBtn2.querySelector('.fa-eye');
  const eyeSlash = visibleBtn2.querySelector('.fa-eye-slash');

  if (type === 'password') {
    inputPasswordRepeat.setAttribute('type', 'text');
    eye.classList.add('active');
    eyeSlash.classList.remove('active');
  } else if (type === 'text') {
    inputPasswordRepeat.setAttribute('type', 'password');
    eye.classList.remove('active');
    eyeSlash.classList.add('active');
  }
})

inputEmail.addEventListener('input', checkAllInputFill)
inputNickname.addEventListener('input', checkAllInputFill)
inputPassword.addEventListener('input', checkAllInputFill)
inputPasswordRepeat.addEventListener('input', checkAllInputFill)
inputPasswordRepeat.addEventListener('change', function () {
  const alert = document.querySelector('.repeat-alert');

  if (comparePassword()) {
    alert.textContent = '비밀번호와 일치합니다.';
    alert.classList.add('correct');
    alert.classList.remove('warning');
  } else {
    alert.textContent = '비밀번호와 일치하지 않습니다.';
    alert.classList.remove('correct');
    alert.classList.add('warning');
  }
})

document.querySelector('#signup-form')
.addEventListener('submit', function(e){
  e.preventDefault();
  const result = checkAllInputFill();
  if(result) alert('전송 성공!');
})