import { Pagenation } from "./Pagenation";
import {
  emailValidationMsg,
  pwdValidationMsg,
  showPassword,
  emptyCheck,
} from "./Validation";
import { ItemImage } from "./ItemImage";
import TagInput from "./TagInput";
import TextInput from "./TextInput";
import Textarea from "./Textarea";
import Button from "./Button";
import ItemHeader from "./ItemHeader";
import VerticalSelect from "./VerticalSelect";
import UserIconInfo from "./UserIconInfo";

const ImgPath = (fileName) => require(`../assets${fileName}`);

export {
  Pagenation,
  emailValidationMsg,
  pwdValidationMsg,
  showPassword,
  emptyCheck,
  ImgPath,
  ItemImage,
  TagInput,
  TextInput,
  Textarea,
  ItemHeader,
  Button,
  VerticalSelect,
  UserIconInfo,
};
