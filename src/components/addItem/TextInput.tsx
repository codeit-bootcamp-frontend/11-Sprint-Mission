import { InputAction } from "pages/AddItem";
import { ChangeEvent, Dispatch, FocusEvent, ReactNode } from "react";

interface Props {
  name: string;
  placeholder: string;
  value: string;
  children: ReactNode;
  dispatch: Dispatch<InputAction>;
}

function TextInput({ children, name, placeholder, value, dispatch }: Props) {
  const setName = (value: string) =>
    dispatch({ type: "SET_NAME", payload: value });

  const handleInput = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setName(target.value);

  const handleBlur = ({ target }: FocusEvent<HTMLInputElement>) =>
    setName(target.value.trim());

  return (
    <div className='form-input-wrap'>
      <label htmlFor={`item_${name}`}>{children}</label>
      <input
        id={`item_${name}`}
        type='text'
        placeholder={placeholder}
        value={value}
        onBlur={handleBlur}
        onChange={handleInput}
        required
      />
    </div>
  );
}

export default TextInput;
