import { MouseEvent as ReactMouseEvent } from "react";

/**
 * 비밀번호와 비밀번호 확인의 type을 변경하는 함수
 * @param {*} e
 */
function togglePwVisibility(
  e: MouseEvent | ReactMouseEvent<HTMLButtonElement>
) {
  // closest 메서드 사용하기 위해 HTMLElement로 타입 단언
  const target = e.target as HTMLButtonElement;
  const password = target.closest(".password");
  if (!password) return;

  const inputPw = password.querySelector(".pw") as HTMLInputElement; // 비밀번호 input 요소
  const type = inputPw.getAttribute("type"); // 비밀번호 | 비밀번호 확인 input의 type 속성

  // [sprint3 리뷰 반영] if문 3항 연산자 사용해 코드 간결하게 수정
  inputPw.setAttribute("type", type === "password" ? "text" : "password");
}

export { togglePwVisibility };
