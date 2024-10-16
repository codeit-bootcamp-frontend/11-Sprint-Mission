import { Pagenation } from "./Pagenation";
import { emailValidationMsg, pwdValidationMsg, showPassword, emptyCheck } from "./Validation";
import { ItemImage } from "./ItemImage"
import TagInput from "./TagInput"
import TextInput from "./TextInput";
import Textarea from "./Textarea";

const ImgPath = (fileName) => require(`../assets${fileName}`);

export { Pagenation, emailValidationMsg, pwdValidationMsg, showPassword, emptyCheck, ImgPath, ItemImage, TagInput, TextInput, Textarea };
