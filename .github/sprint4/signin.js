import { ERROR_BORDER } from "./sign_utils.js";

const EMAIL_INPUT = document.getElementById('email');
const INPUT_ARRAY = [EMAIL_INPUT];

for (let INPUT of INPUT_ARRAY) {
  ERROR_BORDER(INPUT);
}
  
