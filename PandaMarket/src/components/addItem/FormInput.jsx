const InputField = ({
  labelName,
  name,
  htmlForId,
  type,
  value,
  placeholder,
  onKeyDown,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={htmlForId}>{labelName}</label>
      <input
        id={htmlForId}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
