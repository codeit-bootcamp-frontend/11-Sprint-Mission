import "./Input.scss";

function Input({
  type = "text",
  placeholder = "",
  className = "default",
  name = "",
  value = "",
  onChange = () => {},
  onKeyDown = () => {},
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      name={name}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}

export default Input;
