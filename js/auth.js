const btnsTogglePw = document.querySelectorAll(".btn-toggle");

/**
 * 비밀번호와 비밀번호 확인의 type을 변경하는 함수
 */
function changeTypePw(e) {
  const inputPw = e.target.previousElementSibling; // 버튼 이전 요소, 즉 비밀번호 | 비밀번호 확인 input 요소
  const type = inputPw.getAttribute("type"); // 비밀번호 | 비밀번호 확인 input의 type 속성

  if (type === "password") {
    inputPw.setAttribute("type", "text"); // type이 password면 text로 변경
  } else {
    inputPw.setAttribute("type", "password"); // type이 text면 password로 변경
  }
}

for (let btn of btnsTogglePw) {
  btn.addEventListener("click", changeTypePw);
}
