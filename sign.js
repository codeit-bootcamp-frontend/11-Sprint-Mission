document.addEventListener("DOMContentLoaded", () => {
    let emailValid = false;
    let usernameValid = false;
    let passwordValid = false;
    let passwordRepeatValid = false;

    const loginGeneral = document.getElementById("loginGeneral");
    const signupGeneral = document.getElementById("signupGeneral");
    const emailText = document.getElementById("email");
    const usernameText = document.getElementById("username");
    const passwordText = document.getElementById("password");
    const passwordRepeatText = document.getElementById("password_repeat");

    function show (input, errorId) {
        const errorElement = document.getElementById(errorId);
        errorElement.style.display = "block";
        input.style.border = "1px solid #f74747";
    }

    function hide (input, errorId) {
        const errorElement = document.getElementById(errorId);
        errorElement.style.display = "none";
        input.style.border = "none";
    }

    function regularEmail(email) {
        const emailForm = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailForm.test(email);
    }

    function checkEmail() {
        const emailValue = emailText.value.trim();
        emailValid = false;
        hide(emailText, "emailEmptyError");
        hide(emailText, "emailInvalidError");

        if (!emailValue) {
            show(emailText, "emailEmptyError");
        }
        else if (!regularEmail(emailValue)) {
            show(emailText, "emailInvalidError");
        }
        else {
            emailValid = true;
            hide(emailText, "emailEmptyError");
            hide(emailText, "emailInvalidError");
        }
        submitState();
    }

    function checkUsername() {
        const usernameValue = usernameText.value.trim();
        usernameValid = false;
        hide(usernameText, "usernameEmptyError");

        if (!usernameValue) {
            show(usernameText, "usernameEmptyError");
        }
        else {
            usernameValid = true;
            hide(usernameText, "usernameEmptyError");
        }
        submitState();
    }

    function checkPassword() {
        const passwordValue = passwordText.value.trim();
        passwordValid = false;
        hide(passwordText, "passwordEmptyError");
        hide(passwordText, "passwordInvalidError");

        if (!passwordValue) {
            show(passwordText, "passwordEmptyError");
        }
        else if (passwordValue.length < 8) {
            show(passwordText, "passwordInvalidError");
        }
        else {
            passwordValid = true;
            hide(passwordText, "passwordEmptyError");
            hide(passwordText, "passwordInvalidError");
        }
        submitState();
    }

    function checkPasswordRepeat(){
        const passwordRepeatValue = passwordRepeatText.value.trim();
        passwordRepeatValid = false;
        hide(passwordRepeatText, "passwordRepeatInvalidError");

        if (!passwordRepeatValue || passwordRepeatValue !== passwordText.value.trim()) {
            show(passwordText, "passwordRepeatInvalidError");
        }
        else {
            passwordRepeatValid = true;
            hide(passwordText, "passwordRepeatInvalidError");
        }
        submitState();
    }

    function submitState() {
        let valueValid = emailValid && passwordValid;
        if (signupGeneral) {
            valueValid = emailValid && usernameValid && passwordValid && passwordRepeatValid;
        }
        submitButton.disabled = !valueValid;
    }

    emailText.addEventListener("input", checkEmail);
    if (signupGeneral) {
        usernameText.addEventListener("input", checkUsername);
        passwordRepeatText.addEventListener("input", checkPasswordRepeat);
    }
    passwordText.addEventListener("input", checkPassword);

    if (loginGeneral) {
        loginGeneral.addEventListener("submit", function (event) {
            event.preventDefault();
            location.href = "items.html";
        });
    }

    if (signupGeneral) {
        signupGeneral.addEventListener("submit", function (event) {
            event.preventDefault();
            location.href = "signup.html";
        });
    }
});