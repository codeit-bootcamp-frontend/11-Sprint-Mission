// passwordToggle.js
export default function togglePasswordVisibility(toggleIcons) {
  toggleIcons.forEach(toggleIcon => {
    toggleIcon.addEventListener('click', () => {
      const passwordInput = toggleIcon.previousElementSibling;
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      toggleIcon.classList.toggle('active', isPassword);
    });
  });
}