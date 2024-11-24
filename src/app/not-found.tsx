import Header from "@/components/Header";

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">페이지를 찾을 수 없습니다!</h1>
        <p className="mt-4 text-lg">
          죄송합니다, 요청하신 페이지가 존재하지 않습니다.
        </p>
      </div>
    </>
  );
};

export default NotFoundPage;
