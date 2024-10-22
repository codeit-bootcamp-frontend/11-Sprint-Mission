import Header from "../components/Header";
import Btn from "../components/Button/Btn";
import Editor from "../components/Editor";

function New() {
  return (
    <div>
      <Header isLogined={true} isMain={true} />
      <section>
        <Editor />
      </section>
    </div>
  );
}

export default New;
