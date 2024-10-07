/**
 * 비밀번호와 비밀번호 확인의 type을 변경하는 함수
 * @param {*} e
 */
function togglePwVisibility(e) {
  // [sprint3 리뷰 반영] 함수명 직관적으로 변경
  const inputPw = e.target.closest(".password").querySelector(".pw"); // 비밀번호 input 요소
  const type = inputPw.getAttribute("type"); // 비밀번호 | 비밀번호 확인 input의 type 속성

  // [sprint3 리뷰 반영] if문 3항 연산자 사용해 코드 간결하게 수정
  inputPw.setAttribute("type", type === "password" ? "text" : "password");
}

export { togglePwVisibility };
