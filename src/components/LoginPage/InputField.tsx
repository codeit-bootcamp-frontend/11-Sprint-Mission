import React, { forwardRef, useState } from "react";
import "./InputField.css";
import clsx from "clsx";
import visible from "../../assets/image/gnb/btn_visibility_off_24px.png";
import unvisible from "../../assets/image/gnb/btn_visibility_on_24px.png";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, type, name, error, placeholder, ...rest }, ref) => {
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
            className={clsx("input-tag", { "input-error": error })}
            type={
              type === "password" && !isPasswordVisible ? "password" : "text"
            }
            placeholder={placeholder}
            name={name}
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
  }
);

export default InputField;
