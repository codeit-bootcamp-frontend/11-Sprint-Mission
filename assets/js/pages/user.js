import checkFormValidity from '../utils/formValidation.js';
import togglePasswordVisibility from '../utils/passwordToggle.js';
import onDOMReady from '../utils/domReady.js';


onDOMReady(() => {
  const form = document.getElementById('userForm'); 
  const submitBtn = document.getElementById('submitBtn');
  const inputs = form.querySelectorAll('input');
  const toggleIcons = document.querySelectorAll('.password-toggle .toggle-icon'); 
  
  inputs.forEach(input => input.addEventListener('input', () => {
    checkFormValidity(inputs, submitBtn);
  }));
  
  togglePasswordVisibility(toggleIcons);
  checkFormValidity(inputs, submitBtn);
});