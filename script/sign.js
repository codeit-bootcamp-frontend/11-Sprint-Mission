// 변수는 카멜케이스 사용
document.addEventListener("DOMContentLoaded", () => {
	// 유효성검사
  let isEmailValid = false;
	let isNicknameValid = false;
	let isPwdValid = false;
	let isPwdConfirmValid = false;

	const loginForm = document.getElementById("login_form");
	const signupForm = document.getElementById("signup_form");
	const emailInput = document.getElementById("email");
	const nicknameInput = document.getElementById("nickname");
	const pwdInput = document.getElementById("pwd");
	const pwdConfirmInput = document.getElementById("pwd_confirm");
	const submitBtn = document.querySelector('.sign-container form btn');

	// 오류 메세지 + 초기화
	function setErrorState(input, errorId, isError) {
		const errorElement = document.getElementById(errorId);
		errorElement.style.display = isError ? "block" : "none";
		input.input.style.border = isError ? "1px solid #f74747" : "none";
	}

	// 폼 비활성화
	function formDeactivate() {
		let isFormValid = isEmailValid && isPwdValid;
	
		if(signupForm) {
			isFormValid = isFormValid && isNicknameValid && isPwdConfirmValid;
		}
	
		submitBtn.disabled = !isFormValid;
	}

	function validationString(email) {
		// 정규표현식으로 확인
		const emailCheck = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
		
		// test()는 주어진 문자열이 정규 표현식을 만족하는지 판별하여 true false로 반환
		return emailCheck.test(email);
	}

	// 유효성 검사 함수
	function checkEmail() {
		const emailValue = emailInput.value.trim();
		isEmailValid = false;
		
		// 이메일이 입력이 안됐을때
		if(!emailValue) {
			setErrorState(emailInput, "email_empty_err", true);
		}
		// 이메일형식이 아닐때
		else if(!validationString(emailValue)) {
			setErrorState(emailInput, "email_empty_err", true);
		}
		// 이메일일때
		else {
			isEmailValid = true;
			setErrorState(emailInput, "email_empty_err", false);
			setErrorState(emailInput, "email_empty_err", false);
		}
		formDeactivate();
	}

	function checkNickname() {
		const nicknameValue = nicknameInput.value.trim();
		isNicknameValid = false;

		if(!nicknameValue) {
			setErrorState(nicknameInput, "nickname_empty_err", true);
		} 
		else {
			isNicknameValid = true;
			setErrorState(nicknameInput, "nickname_empty_err", false);
		}
		formDeactivate();
	}

	function checkPwd() {
		const pwdValue = pwdInput.value.trim();
		isPwdValid = false;

		if(!pwdValue) {
			setErrorState(pwdInput, "pwd_empty_err", true);
		}
		else if(pwdValue.length < 8) {
			setErrorState(pwdInput, "pwd_empty_err", true);
		}
		else {
			isPwdValid = true;
			setErrorState(pwdInput, "pwd_empty_err", false);
			setErrorState(pwdInput, "pwd_empty_err", false);
		}
		formDeactivate();
	}

	function checkPwdconfirm() {
		const pwdConfirmValue = pwdConfirmInput.value.trim();
		isPwdConfirmValid = false;

		// 패스워드 짧을때
		if(!isPwdValid) {
			setErrorState(pwdConfirmInput, "pwd_confirm_init_err", true);
		}
		// 패스워드 확인이 비어있거나 원래 패스워드와 일치하지않으면,
		else if(!pwdConfirmValue || pwdConfirmValue !== pwdInput.value.trim()) {
			setErrorState(pwdConfirmInput, "pwd_confirm_init_err", true);
		}
		else {
			isPwdConfirmValid = true;
			setErrorState(pwdConfirmInput, "pwd_confirm_init_err", false);
			setErrorState(pwdConfirmInput, "pwd_confirm_init_err", false);
		}
		formDeactivate();
	}

	// 유효성 검사 이벤트
	if(emailInput) {
		emailInput.addEventListener("focusout", checkEmail);
	}

	if(nicknameInput) {
		nicknameInput.addEventListener("focusout", checkNickname);
	}

	// input은 실시간으로 확인 -> pwd는 confirm과의 실시간 비교가 필요
	if(pwdInput) {
		pwdInput.addEventListener("input", checkPwd);
	}

	if(pwdConfirmInput) {
		pwdConfirmInput.addEventListener("input", checkPwdconfirm);
	}
 
	formDeactivate();

	form.addEventListener("submit", function(e) {
		e.preventDefault();
		window.location.href = form.id === "login_form" ? "item.html" : "signup.html";
	});

	// 심화요소 토글버튼 수행x
});