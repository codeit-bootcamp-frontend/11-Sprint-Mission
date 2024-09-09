const inputPassword = document.querySelector('#input-password')
const visibleBtn = document.querySelector('.visible-btn')

visibleBtn.addEventListener('click', function (e) {
  const type = inputPassword.getAttribute('type');
  const eye = visibleBtn.querySelector('.fa-eye');
  const eyeSlash = visibleBtn.querySelector('.fa-eye-slash');

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