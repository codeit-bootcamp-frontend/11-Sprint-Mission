const InputField = ({
  labelName,
  name,
  htmlForId,
  type,
  value,
  placeholder,
  onKeyDown,
  onChange,
  onInput,
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
        onInput={onInput}
      />
    </div>
  );
};

export default InputField;
