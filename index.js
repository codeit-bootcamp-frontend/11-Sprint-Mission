const emailInput = document.getElementById("email");
const passwordInput = document.querySelector('input[type="password"]');
const loginButton = document.querySelector(".form_btn");

function validateInputs() {
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  if (emailValue !== "" && passwordValue !== "") {
    loginButton.disabled = false;
    loginButton.classList.add("active");
  } else {
    loginButton.disabled = true;
    loginButton.classList.remove("active");
  }
}

emailInput.addEventListener("input", validateInputs);
passwordInput.addEventListener("input", validateInputs);
