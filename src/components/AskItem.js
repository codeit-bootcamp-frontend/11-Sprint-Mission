import SmallButton from "./SmallButton";
import "./AskItem.css";
import Comment from "./Comment";

function AskItem() {
  return (
    <div>
      <section>
        <h3 className="ask-to">문의하기</h3>
        <form>
          <label for="ask-input"></label>
          <textarea
            id="ask-input"
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          />
        </form>
        <SmallButton />
      </section>
      <section>
        <Comment />
        <Comment />
        <Comment />
      </section>
    </div>
  );
}
export default AskItem;
