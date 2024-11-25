import React from "react";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  onSortSelection: (option: "recent" | "favorite") => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onSortSelection }) => {
  return (
    <div className={styles.dropdown}>
      <button
        className={styles.dropdownMenu}
        onClick={() => onSortSelection("recent")}
      >
        최신순
      </button>
      <button
        className={styles.dropdownMenu}
        onClick={() => onSortSelection("favorite")}
      >
        좋아요순
      </button>
    </div>
  );
};

export default Dropdown;
