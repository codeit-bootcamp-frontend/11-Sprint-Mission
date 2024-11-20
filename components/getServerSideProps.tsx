import { Article } from "@/types/commontypes";
import axiosinstance from "@/lib/axiosInstance";

export async function getServerSideProps() {
  try {
    const res = await axiosinstance.get("/articles", {
      params: { page: 1, limit: 5 },
    });
    const data: Article[] = res.data.list;

    return {
      props: {
        initialArticles: data,
      },
    };
  } catch (error) {
    console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
    return {
      props: {
        initialArticles: [],
      },
    };
  }
}
