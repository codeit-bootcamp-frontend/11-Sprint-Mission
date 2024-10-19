import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ItemDetail from "../components/ItemDetail";
import Query from "../components/Query";

function Detail() {
  const params = useParams();
  //console.log(params);

  return (
    <div>
      <Header isLogined={true} isMain={true} />
      <section>
        <ItemDetail id={params.id} />
      </section>
      <section>
        <Query id={params.id} />
      </section>
    </div>
  );
}

export default Detail;
