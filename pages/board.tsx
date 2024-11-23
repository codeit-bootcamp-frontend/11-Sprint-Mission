import Image from "next/image";

export default function Board() {
  return (
    <>
      <BestPostBoard />
      <PostBoard />
    </>
  );
}

function BestPostBoard() {
  return null;
}

function PostBoard() {
  return (
    <div>
      <header>
        <h2>게시글</h2>
        <button>글쓰기</button>
      </header>
      <div>
        <form>
          <fieldset>
            <label>
              <Image
                width={20}
                height={20}
                src="/images/ic_search.svg"
                alt="겅색할 상품을 입력해주세요"
              />
              <input type="text" placeholder="검색할 상품을 입력해주세요" />
            </label>
          </fieldset>
        </form>
        <div>
          <div>
            <span>최신순</span>
            <Image
              width={20}
              height={20}
              src="/images/ic_arrow_down.svg"
              alt="정렬"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
