import { InputFieldProps } from "@apptypes/forms";

function InputField({ type, text, placeholder }: InputFieldProps) {
  return (
    <div className='input-wrapper'>
      <label className='auth-label' htmlFor={type}>
        {text}
      </label>
      <input
        className='auth-input'
        type={type}
        id={type}
        name={type}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default InputField;
