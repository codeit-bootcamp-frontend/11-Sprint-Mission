const input = document.querySelectorAll("input");

const focusin = (e) => {
  console.log(e);
  e.target.style.borderStyle = "solid";
  e.target.style.borderColor = "#3692FF";
  e.target.style.borderWidth = "1px";
};

const focusout = (e) => {
  e.target.style.borderWidth = 0;
};

for (let i = 0; i < input.length; i++) {
  input[i].addEventListener("focusin", focusin);
  input[i].addEventListener("focusout", focusout);
}
