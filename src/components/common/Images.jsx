import { useEffect, useState } from "react";
import styles from "./Images.module.scss";

function Images({
  imageSize: { pcSize, tabletSize, mobileSize },
  src,
  alt,
  children,
  classNames = "",
}) {
  const [responsiveSize, setResponsiveSize] = useState(pcSize);

  const handleResize = () => {
    if (window.innerWidth <= 767) {
      setResponsiveSize(mobileSize);
    } else if (window.innerWidth <= 1199) {
      setResponsiveSize(tabletSize);
    } else {
      setResponsiveSize(pcSize);
    }
  };

  useEffect(() => {
    handleResize(); // 초기 실행 시 사이즈 설정
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pcSize, tabletSize, mobileSize]);

  return (
    <div className={`${styles.images} ${styles[responsiveSize]} ${classNames}`}>
      <img src={src} alt={alt} />
      {children}
    </div>
  );
}

export default Images;
