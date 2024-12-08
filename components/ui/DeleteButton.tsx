import React from "react";
import CloseIcon from "@/public/images/ic_close.svg";
import Image from "next/image";

interface DeleteButtonProps {
  onClick: () => void;
  label: string;
}

function DeleteButton({ onClick, label }: DeleteButtonProps) {
  return (
    <button aria-label={`${label} 삭제`} onClick={onClick}>
      <Image src={CloseIcon} alt="close" width={24} height={24} />
    </button>
  );
}

export default DeleteButton;
