// 이메일값 가져오기
const inputEmail = document.getElementById("input-email");
const btnAbled = document.getElementById("login-button");
const inputPassword = document.getElementById("input-password");
const loginForm = document.getElementById("login-form");
const validInputs = document.querySelectorAll("[data-valid]");

inputEmail.addEventListener("focusout", (e) => printEventType(e, "email"));
inputPassword.addEventListener("focusout", (e) =>
  printEventType(e, "password")
);

loginForm.addEventListener("focusout", (e) => checkoutBtn(e));
function checkoutBtn(e) {
  const result = Array.from(validInputs).every(
    (e) => e.dataset.valid === "true"
  );
  console.log(result + "completed");

  if (result) {
    btnAbled.disabled = false;
  }
  btnAbled.classList.toggle("active", result);
}

let regex = new RegExp(
  "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
);

function printEventType(e, type) {
  //변수 선언
  const invalidType = e.target.value;
  const parentElement = e.target.parentElement;
  const markText = parentElement.querySelector(".invalid-text");

  if (type === "email") {
    if (invalidType === "") {
      markText.textContent = "이메일을 입력해주세요.";
      e.target.dataset.valid = false;
      inputEmail.classList.add("invalid-mark");
      return;
    } else if (!regex.test(invalidType)) {
      markText.textContent = "잘못된 이메일 형식입니다.";
      e.target.dataset.valid = false;
      inputEmail.classList.add("invalid-mark");
      return;
    }
    e.target.dataset.valid = true;
    markText.textContent = "";
    inputEmail.classList.remove("invalid-mark");
  }

  if (type === "password") {
    if (invalidType === "") {
      markText.textContent = "비밀번호를 입력해주세요.";
      e.target.dataset.valid = false;
      inputPassword.classList.add("invalid-mark");
      return;
    } else if (invalidType.length < 8) {
      markText.textContent = "비밀번호를 8자 이상 입력해주세요.";
      e.target.dataset.valid = false;
      inputPassword.classList.add("invalid-mark");
      return;
    }
    e.target.dataset.valid = true;
    markText.textContent = "";
    inputPassword.classList.remove("invalid-mark");
  }

  e.target.dataset.valid = true;
  console.log(regex.test(invalidType));
  console.log(markText);
  console.log(e, type);
}
