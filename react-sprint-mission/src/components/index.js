import { Pagenation } from "./Pagenation";
import { emailValidationMsg, pwdValidationMsg, showPassword, emptyCheck } from "./Validation";
import { ItemImage } from "./ItemImage"

const ImgPath = (fileName) => require(`../assets${fileName}`);

export { Pagenation, emailValidationMsg, pwdValidationMsg, showPassword, emptyCheck, ImgPath, ItemImage };
