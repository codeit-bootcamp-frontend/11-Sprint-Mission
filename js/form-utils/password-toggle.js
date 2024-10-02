export default passwordVisibleToggle;

function passwordVisibleToggle(password, passwordEye) {
  if (password.type === 'password') {
    password.type = 'text';
    passwordEye.src = 'images/login/btn_visibility_off.png';
  } else if (password.type === 'text') {
    password.type = 'password';
    passwordEye.src = 'images/login/btn_visibility_on.png';
  }
}
