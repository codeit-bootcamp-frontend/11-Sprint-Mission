import { ReactNode, useState } from "react";

interface Props {
  type?: "button" | "submit" | "reset";
  name: string;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

function PrimaryButton({
  children,
  type = "button",
  name,
  disabled,
  onClick,
}: Props) {
  const [isHover, setIsHover] = useState(false);
  return (
    <button
      type={type}
      className={["btn-primary", name, isHover ? "hover" : null].join(" ")}
      onClick={onClick}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
