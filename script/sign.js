// 변수는 카멜케이스 사용
document.addEventListener("DOMContentLoaded", () => {
	// 유효성검사
    let isEmailValid = false;
	let isNicknameValid = false;
	let ispwdValid = false;
	let ispwdConfirmValid = false;

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
		
	}

	// 초기화
	function resetState(input, errId) {
		
	}

	// 유효성 검사 함수
	function checkEmail() {
		btnDeactivate();
	}

	function checkNickname() {
		btnDeactivate();
	}

	function checkPwd() {
		btnDeactivate();
	}

	function checkPwdconfrim() {
		btnDeactivate();
	}

	// 버튼 비활성화
	function btnDeactivate() {
		btnDeactivate();
	}

	// 유효성 검사 이벤트
	if(emailInput) {
		emailInput.addEventListener("focusout", checkEmail);
	}

	if(nicknameInput) {
		nicknameInput.addEventListener("focusout", checkNickname);
	}

	// input은 실시간을 확인 가능해서 pwd는 confirm과의 비교가 필요해서 input이 맞다고 판단
	if(pwdInput) {
		pwdInput.addEventListener("input", checkPwd);
	}

	if(pwdConfirmInput) {
		pwdConfirmInput.addEventListener("input", checkPwdconfrim);
	}

	// 최종 정보가 맞으면 활성화 틀리면 비활성화
	btnDeactivate();
 
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