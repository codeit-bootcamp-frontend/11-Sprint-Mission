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

	// 유효성 검사 이벤트
	if(emailInput) {
		emailInput.addEventListener("focusout", 이메일체크함수);
	}

	if(nicknameInput) {
		nicknameInput.addEventListener("focusout", 닉네임체크함수);
	}

	// input은 실시간을 확인 가능해서 pwd는 confirm과의 비교가 필요해서 input이 맞다고 판단
	if(pwdInput) {
		pwdInput.addEventListener("input", 비밀번호체크함수);
	}

	if(pwdConfirmInput) {
		pwdConfirmInput.addEventListener("input", 비밀번호체크확인함수);
	}

	// 초기 상태에 관심이 없고 사용자가 양식과 상호작용한 후에만 유효성을 검사하려는 경우 
	// 먼저 이벤트 리스너를 설정한 다음 validateForm()을 호출하는 것이 더 깔끔
	//제출버튼 비활성화();
 
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