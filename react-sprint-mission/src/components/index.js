import { Pagenation } from "./Pagenation";
import { emailValidationMsg, pwdValidationMsg, showPassword, emptyCheck } from "./Validation";

const ImgPath = (fileName) => require(`../assets${fileName}`);

export { Pagenation, emailValidationMsg, pwdValidationMsg, showPassword, emptyCheck, ImgPath };
