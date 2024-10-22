import "./Input.scss";

function Input({
  type = "text",
  placeholder = "",
  className = "default",
  name = "",
  value = "",
  ...rest
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      name={name}
      value={value}
      {...rest}
    />
  );
}

export default Input;
