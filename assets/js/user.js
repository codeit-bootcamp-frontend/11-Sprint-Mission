document.addEventListener('DOMContentLoaded', function (){
  const form = document.getElementById('userForm'); 
  const submitBtn = document.getElementById('submitBtn');
  const inputs = form.querySelectorAll('input');
  const toggleIcons = document.querySelectorAll('.password-toggle .toggle-icon'); 

  function checkFormValidity() {
      let allFilled = true;
  
      inputs.forEach(input => {
          if (input.value === '') {
              allFilled = false;
          }
      });
      if (allFilled) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('gray');
        submitBtn.classList.add('blue');
      } else {
        submitBtn.disabled = true;
        submitBtn.classList.remove('blue');
        submitBtn.classList.add('gray');
      }
  }
  
  inputs.forEach(input => {
      input.addEventListener('input', checkFormValidity);
  });

  toggleIcons.forEach(toggleIcon => {
  toggleIcon.addEventListener('click', function () {
    const passwordInput = toggleIcon.previousElementSibling;
    const isPassword = passwordInput.type === 'password';
    
    passwordInput.type = isPassword ? 'text' : 'password';
    toggleIcon.classList.toggle('active', isPassword);
  });
});
});