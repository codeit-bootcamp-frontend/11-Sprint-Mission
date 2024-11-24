"use client";

import React, { useState } from "react";
import styles from "./SearchInput.module.css";
import Image from "next/image";

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void; // 검색어를 상위로 전달
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "검색할 상품을 입력해주세요",
  onSearch,
}) => {
  const [value, setValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(value);
    }
  };

  return (
    <div className={styles.container}>
      <Image width={24} height={24} src="/images/ic_search.png" alt="검색" />
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default SearchInput;
