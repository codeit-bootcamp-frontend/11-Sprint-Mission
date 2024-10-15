import "./Input.scss";

function Input({
  type = "text",
  placeholder = null,
  styles = "default",
  inputName = null,
  value = "",
  onChange = null,
}) {
  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange({ target: { name: inputName, value: newValue } });
  };
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={styles}
      name={inputName}
      value={value}
      onChange={handleChange}
    />
  );
}

export default Input;
