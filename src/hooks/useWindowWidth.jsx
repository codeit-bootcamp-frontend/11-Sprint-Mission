import { useEffect, useState } from "react";

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    //resize 이벤트가 발생할 때, handleResize 함수 실행
    window.addEventListener("resize", handleResize);

    //초기값을 설정할 수 있도록 handleResize 함수를 한 번 실행
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
}

export default useWindowWidth;
