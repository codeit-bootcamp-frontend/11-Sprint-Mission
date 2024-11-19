import { ChangeEvent, Dispatch, FocusEvent, ReactNode } from "react";
import { InputAction } from "pages/AddItem";

interface Props {
  name: string;
  value: string;
  placeholder: string;
  children: ReactNode;
  dispatch: Dispatch<InputAction>;
}

function Description({ children, name, value, placeholder, dispatch }: Props) {
  const setDescription = (value: string) =>
    dispatch({ type: "SET_DESCRIPTION", payload: value });

  const handleInput = ({ target }: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(target.value);

  const handleBlur = ({ target }: FocusEvent<HTMLTextAreaElement>) =>
    setDescription(target.value.trim());
  return (
    <div className='form-input-wrap'>
      <label htmlFor={`item_${name}`}>{children}</label>
      <textarea
        id={`item_${name}`}
        placeholder={placeholder}
        value={value}
        onChange={handleInput}
        onBlur={handleBlur}
        required
      />
    </div>
  );
}

export default Description;
