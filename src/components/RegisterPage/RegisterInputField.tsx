import React, { forwardRef, useState } from "react";
import "./RegisterInputField.css";
import visible from "../../assets/image/gnb/btn_visibility_off_24px.png";
import unvisible from "../../assets/image/gnb/btn_visibility_on_24px.png";

interface RegisterInputFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  error?: string;
}

const RegisterInputField = forwardRef<
  HTMLInputElement,
  RegisterInputFieldProps
>(({ label, type, name, placeholder, error, ...rest }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div>
      <p className="input-name">{label}</p>
      <div className="input-pass-box">
        <input
          ref={ref}
          className={`input-tag ${error ? "input-error" : ""}`}
          type={type === "password" && !isPasswordVisible ? "password" : "text"}
          name={name}
          placeholder={placeholder}
          {...rest}
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
});

export default RegisterInputField;
