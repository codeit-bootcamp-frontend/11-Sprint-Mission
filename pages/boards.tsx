import styles from "@/styles/boards.module.css";
import BoardsBestArticles from "../components/Boards/BoardsBestArticles";
import SearchInput from "../components/common/SearchInput";
import Button from "@/components/common/Button";
import DropDown from "@/components/common/DropDown";
import { InferGetServerSidePropsType } from "next";
import axios from "@/pages/api/axiosApi";

export async function getServerSideProps() {
  const res = await axios.get("/articles");
  const articles = res.data.results ?? [];

  return {
    props: {
      articles,
    },
  };
}

export default function Boards({
  articles,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <section className={styles.container}>
        <div>
          <h1>베스트 게시글</h1>
          <BoardsBestArticles articles={articles} />
        </div>
        <div>
          <h2>게시글</h2>
          <Button buttonName="글쓰기" />
          <SearchInput />
          <DropDown />
        </div>
      </section>
    </>
  );
}
