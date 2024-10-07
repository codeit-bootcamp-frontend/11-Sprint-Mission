// /products 엔드포인트에서 데이터를 가져오는 함수
const FetchProducts = async () => {
  try {
    // Fetch API를 사용하여 GET 요청을 보냄 (명시적으로 method: 'GET' 설정)
    const response = await fetch(
      "https://panda-market-api.vercel.app/products",
      {
        method: "GET", // GET 메소드 명시
      }
    );

    // 응답이 정상인지 확인 (200번대 응답인지 확인)
    if (!response.ok) {
      throw new Error("제품 데이터를 가져오는데 실패했습니다"); // 오류 발생 시 에러 메시지 던지기
    }

    // JSON 형태로 데이터를 변환하여 받음
    const data = await response.json();

    // 데이터를 콘솔에 출력 (디버깅용)
    console.log(data);
    return data;
  } catch (error) {
    // 에러가 발생한 경우 콘솔에 에러 메시지 출력
    console.error("제품 데이터를 가져오는 중 오류 발생:", error);

    throw error;
  }
};

export default FetchProducts;
