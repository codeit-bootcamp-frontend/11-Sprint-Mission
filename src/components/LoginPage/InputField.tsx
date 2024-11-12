import React, { ChangeEvent, useState } from "react";
import "./InputField.css";
import visible from "../../assets/image/gnb/btn_visibility_off_24px.png";
import unvisible from "../../assets/image/gnb/btn_visibility_on_24px.png";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string;
  placeholder: string;
}

const InputField = ({
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
}: InputFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div>
      <p className="input-name">{label}</p>
      <div className="input-pass-box">
        <input
          className={`input-tag ${error ? "input-error" : ""}`}
          type={type === "password" && !isPasswordVisible ? "password" : "text"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {type === "password" && (
          <img
            src={isPasswordVisible ? unvisible : visible}
            alt={isPasswordVisible ? "Hide password" : "Show password"}
            onClick={togglePasswordVisibility}
            className="password-icon"
          />
        )}
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default InputField;
