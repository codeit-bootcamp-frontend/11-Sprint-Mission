import React from "react";

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  onKeyDown,
  type = "text",
}) => {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={label}>{label}</label>
      <input
        className="w-full h-13 py-5 px-5 bg-slate-200 border rounded-lg text-sm"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        id={label}
      />
    </div>
  );
};

export default InputField;
