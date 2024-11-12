import React, { ChangeEvent, useState } from "react";
import "./RegisterInputField.css";
import visible from "../../assets/image/gnb/btn_visibility_off_24px.png";
import unvisible from "../../assets/image/gnb/btn_visibility_on_24px.png";

interface RegisterInputFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const RegisterInputField = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
}: RegisterInputFieldProps) => {
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
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
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

export default RegisterInputField;
