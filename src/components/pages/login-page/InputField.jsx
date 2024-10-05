function InputField({type, text, placeholder}) {
  return (
    <div class="input-wrapper">
      <label class="auth-label" for={type}>
        {text}
      </label>
      <input
        class="auth-input"
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