import { FocusEvent as ReactFocusEvent } from "react";

/**
 * input이 공백인지 검사
 * @param {*} target 이벤트 발생한 타겟 요소
 * @param {*} errorMessage 에러를 표시할 <span> 태그
 * @returns input의 입력이 공백이면 true, 공백이 아니면 false 반환
 */
function handleEmptyInput(target: HTMLInputElement, errorMessage: HTMLElement) {
  if (target.value.trim() === "") {
    errorMessage.textContent = target.placeholder;
    target.classList.add("invalid");
    target.dataset.valid = "false";
    return true;
  } else {
    target.classList.remove("invalid");
    target.dataset.valid = "true";
    return false;
  }
}

/**
 * 이메일이 [최소 한글자 이상의 영문 대소문자, 숫자]@[최소 한글자 이상의 영문 대소문자, 숫자].[최소 2글자 이상의 영문 대소문자]의 정규 표현식에 적합한지 검사
 * @param {*} email 공백을 제거한 이메일 문자열
 * @returns 이메일이 정규 표현식에 적합하면 true, 적합하지 않으면 false 반환
 */
function validateEmailFormat(email: string) {
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
}

/**
 * 이메일 입력의 유효성 검사
 * @param {*} target 이벤트 발생한 타겟 요소
 * @param {*} errorMessage 에러를 표시할 <span> 태그
 */
function validateEmail(target: HTMLInputElement, errorMessage: HTMLElement) {
  const isEmailValid = validateEmailFormat(target.value.trim());
  if (!isEmailValid) {
    errorMessage.textContent = "잘못된 이메일 형식입니다.";
    target.classList.add("invalid");
    target.dataset.valid = "false";
  } else {
    target.classList.remove("invalid");
    target.dataset.valid = "true";
  }
}

/**
 * 비밀번호 입력의 유효성 검사
 * @param {*} target 이벤트 발생한 타겟 요소
 * @param {*} errorMessage 에러를 표시할 <span> 태그
 */
function validatePassword(target: HTMLInputElement, errorMessage: HTMLElement) {
  if (target.value.trim().length < 8) {
    errorMessage.textContent = "비밀번호를 8자리 이상 입력해주세요.";
    target.classList.add("invalid");
    target.dataset.valid = "false";
  } else {
    target.classList.remove("invalid");
    target.dataset.valid = "true";
  }
}

/**
 * 비밀번호 확인 입력의 유효성 검사
 * @param {*} target 이벤트 발생한 타겟 요소
 * @param {*} errorMessage 에러를 표시할 <span> 태그
 */
function validatePasswordConfirm(
  target: HTMLInputElement,
  errorMessage: HTMLElement
) {
  const form = target.closest("form");

  if (!form) return;

  const password = form.querySelector("#input_password") as HTMLInputElement;

  if (target.value.trim() !== password.value.trim()) {
    errorMessage.textContent = "비밀번호가 일치하지 않습니다.";
    target.classList.add("invalid");
    target.dataset.valid = "false";
  } else {
    validatePassword(target, errorMessage);
  }
}

/**
 * form의 input 요소들의 유효성 검사
 */
function checkInputValidity(e: FocusEvent | ReactFocusEvent) {
  const target = e.target as HTMLInputElement;
  const inputArea = target.closest(".input-area");

  if (!inputArea) return;

  const errorMessage = inputArea.querySelector(".msg-error") as HTMLElement;
  const isEmpty = handleEmptyInput(target, errorMessage);

  if (!isEmpty) {
    switch (target.id) {
      case "input_email":
        validateEmail(target, errorMessage);
        break;
      case "input_password":
        validatePassword(target, errorMessage);
        break;
      case "input_password_confirm":
        validatePasswordConfirm(target, errorMessage);
        break;
      default:
        break;
    }
  }
}

/**
 * 폼 태그의 모든 입력이 모두 유효성 검사를 통과했는지 체크
 */
function validateForm(e: FocusEvent | ReactFocusEvent) {
  const target = e.target as HTMLInputElement;
  const form = target.closest("form") as HTMLFormElement;
  const inputs = form.querySelectorAll("input");
  const btnSubmit = form.querySelector(
    "button[type=submit]"
  ) as HTMLButtonElement; // 로그인 | 회원가입 버튼
  const isFormValid = Array.from(inputs).every(
    (input) => input.dataset.valid === "true"
  ); // form의 모든 input 요소의 data-valid가 'true'인지 체크

  btnSubmit.disabled = isFormValid === true ? false : true; // 모든 입력이 공백이 아니면 로그인 버튼 활성화
}

export { checkInputValidity, validateForm };
