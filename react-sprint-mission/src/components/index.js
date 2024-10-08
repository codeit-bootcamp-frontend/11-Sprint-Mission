import { Pagenation, ChangeButtonStyle } from "./Pagenation";
import { emailValidationMsg, pwdValidationMsg, showPassword, emptyCheck } from "./Validation";

const ImgPath = (fileName) => `${process.env.PUBLIC_URL}/assets${fileName}`;

export { Pagenation, ChangeButtonStyle, emailValidationMsg, pwdValidationMsg, showPassword, emptyCheck, ImgPath };
