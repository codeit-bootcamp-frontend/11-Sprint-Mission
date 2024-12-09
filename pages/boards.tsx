import styles from "@/styles/boards.module.css";
import BestArticles from "../components/boards/BestArticles";
import { InferGetServerSidePropsType } from "next";
import AllArticles from "@/components/boards/AllArticles";
import instance from "@/api/axiosApi";

// 베스트 게시글은 계속 바뀌니까 서버사이드렌더링이 적합?
export async function getServerSideProps() {
  const res = await instance.get("/articles?orderBy=recent");
  const articles = res.data.list ?? [];

  return {
    props: {
      articles,
    },
  };
}

export default function Boards({
  articles,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // console.log("Received articles:", articles);

  return (
    <>
      <section className={styles.container}>
        <BestArticles articles={articles} />
        <AllArticles articles={articles} />
      </section>
    </>
  );
}
