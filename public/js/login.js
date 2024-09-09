const inputEmail = document.querySelector('#input-email');
const inputPassword = document.querySelector('#input-password');
const submitBtn = document.querySelector('#login-submit-btn');
const visibleBtn = document.querySelector('.visible-btn');

function checkAllInputFill(){
  const email = inputEmail.value !== '';
  const password = inputPassword.value !== '';
  
  if(email && password){
    submitBtn.classList.add('active')
  } else {
    submitBtn.classList.remove('active')
  }
}

visibleBtn.addEventListener('click', function (e) {
  const type = inputPassword.getAttribute('type');
  const eye = visibleBtn.querySelector('.fa-eye');
  const eyeSlash = visibleBtn.querySelector('.fa-eye-slash');

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

inputEmail.addEventListener('input', checkAllInputFill)
inputPassword.addEventListener('input', checkAllInputFill)