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

	/* 디버깅
	console.log(loginForm);
	console.log(signupForm);
	console.log(emailInput);
	console.log(nicknameInput);
	console.log(pwdInput);
	console.log(pwdConfirmInput);
	console.log(submitBtn);
	*/

	// 오류메세지
	function errMsg(input, errId) {
		const errValue = document.getElementById(errId);
    	errValue.style.display = "block";
		// 빨간색
    	input.style.border = "1px solid #f74747";
	}

	// 초기화
	function resetState(input, errId) {
		const errValue = document.getElementById(errId);
		errValue.style.display = "none";
		input.style.border = "none";
	}

	// 폼 비활성화
	function formDeactivate() {

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
		console.log(emailValue);
		isEmailValid = false;
		
		// 이메일이 입력이 안됐을때
		if(!emailValue) {
			errMsg(emailInput, "email_empty_err");
		}
		// 이메일형식이 아닐때
		else if(!validationString(emailValue)) {
			errMsg(emailInput, "email_invalid_err");
		}
		// 이메일일때
		else {
			isEmailValid = true;
			resetState(emailInput, "email_empty_err");
			resetState(emailInput, "email_invalid_err");
		}
		// formDeactivate();
	}

	function checkNickname() {
		const nicknameValue = nicknameInput.value.trim();
		isNicknameValid = false;

		if(!nicknameValue) {
			errMsg(nicknameInput, "nickname_empty_err");
		} 
		else {
			isNicknameValid = true;
			resetState(emailInput, "nickname_empty_err");
		}
		// formDeactivate();
	}

	function checkPwd() {
		const pwdValue = pwdInput.value.trim();
		isPwdValid = false;

		if(!pwdValue) {
			errMsg(pwdInput, "pwd_empty_err");
		}
		else if(pwdValue.length < 8) {
			errMsg(pwdInput, "pwd_invalid_err");
		}
		else {
			isPwdValid = true;
			resetState(pwdInput, "pwd_empty_err");
			resetState(pwdInput, "pwd_invalid_err");
		}
		// formDeactivate();
	}

	function checkPwdconfrim() {
		const pwdConfirmValue = pwdConfirmInput.value.trim();
		isPwdConfirmValid = false;

		// 패스워드 짧을때
		if(!isPwdValid) {
			errMsg(pwdConfirmInput, "pwd_confirm_init_err");
		}
		// 패스워드 확인이 비어있거나 원래 패스워드와 일치하지않으면,
		else if(!pwdConfirmValue || pwdConfirmValue !== pwdInput.value.trim()) {
			errMsg(pwdConfirmInput, "pwd_confirm_err");
		}
		else {
			isPwdConfirmValid = true;
			resetState(pwdConfirmInput, "pwd_confirm_init_err");
			resetState(pwdConfirmInput, "pwd_confirm_err");
		}
		// formDeactivate();
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
		pwdConfirmInput.addEventListener("input", checkPwdconfrim);
	}

	// 최종 정보가 맞으면 활성화 틀리면 비활성화
	// formDeactivate();
 
	if(loginForm) {
		loginForm.addEventListener("submit", function(e) {
			e.preventDefault();
			window.location.href = "item.html";
		});
	}

	if(signupForm) {
		signupForm.addEventListener("submit", function(e) {
			e.preventDefault();
			window.location.href = "signup.html";
		});
	}
});