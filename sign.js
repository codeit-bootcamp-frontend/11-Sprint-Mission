document.addEventListener("DOMContentLoaded", function () {
    //유효성 검사
    let emailValid = false;
    let usernameValid = false;
    let passwordValid = false;
    let passwordRepeatValid = false;

    //요소 접근
    const loginGeneral = document.getElementById("loginGeneral");
    const signupGeneral = document.getElementById("signupGeneral");
    const emailText = document.getElementById("email");
    const usernameText = document.getElementById("username");
    const passwordText = document.getElementById("password");
    const passwordRepeatText = document.getElementById("password_repeat");
    const submitButton = document.getElementById("login_button");

    //오류 메세지 보여주기
    function show(input, errorId) {
        const errorElement = document.getElementById(errorId);
        errorElement.style.display = "block";
        input.style.border = "1px solid #f74747";
    }

    //오류 메세지 가리기
    function hide(input, errorId) {
        const errorElement = document.getElementById(errorId);
        //멘토님이 display 속성을 none으로 하는 것 보다 opacity를 바꾸는게 좋다고 언급.
        errorElement.style.display = "none";
        input.style.border = "none";
    }

    //이메일 검증
    function regularEmail(email) {
        const emailForm = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailForm.test(email);
    }

    //유효성 검사 모듈
    function validateInput(inputElement, validationFn, emptyErrorId, invalidErrorId) {
        const value = inputElement.value.trim();
        hide(inputElement, emptyErrorId);
        hide(inputElement, invalidErrorId);

        if (!value) {
            show(inputElement, emptyErrorId);
            return false;
        } else if (validationFn && !validationFn(value)) {
            show(inputElement, invalidErrorId);
            return false;
        } else {
            return true;
        }
    }

    //이메일 검증
    function checkEmail() {
        emailValid = validateInput(emailText, regularEmail, "emailEmptyError", "emailInvalidError");
        submitState();
    }
    //닉네임 검증
    function checkUsername() {
        usernameValid = validateInput(usernameText, (value) => value.length > 0, "usernameEmptyError", null);
        submitState();
    }
    //비밀번호 검증
    function checkPassword() {
        passwordValid = validateInput(passwordText, (value) => value.length >= 8, "passwordEmptyError", "passwordInvalidError");
        submitState();
    }
    //비밀번호 재확인 검증, 단순 형식이나 true 여부가 아닌 일치를 검사하기에 모듈 활용이 아닌 직접 작성
    function checkPasswordRepeat() {
        const passwordRepeatValue = passwordRepeatText.value.trim();
        passwordRepeatValid = passwordRepeatValue && passwordRepeatValue === passwordText.value.trim();
        if (!passwordRepeatValid) {
            show(passwordRepeatText, "passwordRepeatInvalidError");
        } else {
            hide(passwordRepeatText, "passwordRepeatInvalidError");
        }
        submitState();
    }
    //submitButton을 조정하기 위한 함수, 삼항연산자로 폼을 체크 후 할당
    function submitState() {
        const valueValid = signupGeneral
            ? emailValid && usernameValid && passwordValid && passwordRepeatValid
            : emailValid && passwordValid;
        submitButton.disabled = !valueValid;
    }

    //이벤트 리스너를 추가, 입력 필드와 핸들러를 가져와 객체에 담고 forEach로 할당
    const inputEvents = [
        { element: emailText, handler: checkEmail },
        { element: passwordText, handler: checkPassword },
    ];

    if (signupGeneral) {
        inputEvents.push(
            { element: usernameText, handler: checkUsername },
            { element: passwordRepeatText, handler: checkPasswordRepeat }
        );
    }

    inputEvents.forEach(({ element, handler }) => {
        element.addEventListener("input", handler);
    });

    // 제출되면 이동될 주소
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