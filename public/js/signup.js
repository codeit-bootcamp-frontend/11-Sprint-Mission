const inputPassword = document.querySelector('#input-password')
const inputPasswordRepeat = document.querySelector('#input-password-repeat')
const visibleBtn1 = document.querySelector('.visible-btn.first')
const visibleBtn2 = document.querySelector('.visible-btn.second')


visibleBtn1.addEventListener('click', function (e) {
  const type = inputPassword.getAttribute('type');
  const eye = visibleBtn1.querySelector('.fa-eye');
  const eyeSlash = visibleBtn1.querySelector('.fa-eye-slash');

  if (type === 'password') {
    inputPassword.setAttribute('type', 'text');
    eye.classList.remove('active');
    eyeSlash.classList.add('active');
  } else if (type === 'text') {
    inputPassword.setAttribute('type', 'password');
    eye.classList.add('active');
    eyeSlash.classList.remove('active');
  }
})

visibleBtn2.addEventListener('click', function (e) {
  const type = inputPasswordRepeat.getAttribute('type');
  const eye = visibleBtn2.querySelector('.fa-eye');
  const eyeSlash = visibleBtn2.querySelector('.fa-eye-slash');

  if (type === 'password') {
    inputPasswordRepeat.setAttribute('type', 'text');
    eye.classList.remove('active');
    eyeSlash.classList.add('active');
  } else if (type === 'text') {
    inputPasswordRepeat.setAttribute('type', 'password');
    eye.classList.add('active');
    eyeSlash.classList.remove('active');
  }
})