const pwImg = document.querySelector(".visiblePW");
const pwCheckImg = document.querySelector(".visiblePWCheck");
const password = document.querySelector(".myPw");
const passwordCheck = document.querySelector(".checkMyPw");

pwImg.addEventListener("click", function () {
  const visible = "img/icon/ic_visibility_on.png";
  const invisible = "img/icon/ic_visibility_off.png";

  if (pwImg.src.includes(visible)) {
    pwImg.src = invisible;
    password.type = "password";
  } else {
    pwImg.src = visible;
    password.type = "text";
  }
});

pwCheckImg.addEventListener("click", function () {
  const visible = "img/icon/ic_visibility_on.png";
  const invisible = "img/icon/ic_visibility_off.png";

  if (pwCheckImg.src.includes(visible)) {
    pwCheckImg.src = invisible;
    passwordCheck.type = "password";
  } else {
    pwCheckImg.src = visible;
    passwordCheck.type = "text";
  }
});
