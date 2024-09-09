const inputPassword = document.querySelector('#input-password')

document.querySelector('.visible-btn')
  .addEventListener('click', function (e) {
    const type = inputPassword.getAttribute('type');
    const eye = document.querySelector('.fa-eye');
    const eyeSlash = document.querySelector('.fa-eye-slash');

    if(type === 'password'){
      inputPassword.setAttribute('type', 'text');
      eye.classList.remove('active');
      eyeSlash.classList.add('active');
    }else if(type === 'text'){
      inputPassword.setAttribute('type', 'password');
      eye.classList.add('active');
      eyeSlash.classList.remove('active');
    }
  })