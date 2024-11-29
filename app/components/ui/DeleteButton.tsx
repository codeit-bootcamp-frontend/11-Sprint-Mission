import React from "react";
import Image from "next/image";
import styles from "./DeleteButton.module.css";

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <button className={styles.deleteButton} onClick={onClick}>
      <Image
        src="/images/ic_delete.png"
        alt="삭제"
        width={24}
        height={24}
        className={styles.deleteIcon}
      />
    </button>
  );
};

export default DeleteButton;
