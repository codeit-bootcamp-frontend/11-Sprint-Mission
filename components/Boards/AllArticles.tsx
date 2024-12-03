import Button from "../common/Button";
import DropDown from "../common/DropDown";
import SearchInput from "../common/SearchInput";

export default function AllArticles() {
  return (
    <div>
      <h2>게시글</h2>
      <Button buttonName="글쓰기" />
      <SearchInput />
      <DropDown />
      게시글 내용
    </div>
  );
}
