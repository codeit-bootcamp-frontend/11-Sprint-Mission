const togglePasswordButton = document.createElement('img');
togglePasswordButton.src = 'img/icon-password.close.png';

passwordInput.parentNode.insertBefore(togglePasswordButton, passwordInput.nextSibling);
 
togglePasswordButton.addEventListener('click', function () {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordButton.src = 'img/icon-password.open.png';
        togglePasswordButton.alt = '비밀번호 숨기기';
    } else {
        passwordInput.type = 'password';
        togglePasswordButton.src = 'img/icon-password.close.png';
        togglePasswordButton.alt = '비밀번호 보이기';
    }
});