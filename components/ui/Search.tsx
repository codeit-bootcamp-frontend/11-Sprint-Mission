import SearchIcon from "@/public/images/ic_search.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

interface SearchProps {
  onSearch: (keyword: string) => void;
  placeholder?: string;
}

const Search = ({
  onSearch,
  placeholder = "검색할 키워드를 입력해 주세요",
}: SearchProps) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const currentKeyword = (router.query.q as string) || "";
    setKeyword(currentKeyword);
  }, [router.query.q]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(keyword);
    }
  };

  return (
    <div>
      <Image src={SearchIcon} alt="검색 아이콘" width={24} height={24} />
      <input
        value={keyword}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Search;
