import styles from "./Images.module.scss";
import useReSizing from "../../hooks/useReSizing";

function Images({
  imageSize: { pcSize, tabletSize, mobileSize },
  src,
  alt,
  children,
  classNames = "",
}) {
  const imagesSize = useReSizing({ pcSize, tabletSize, mobileSize });

  return (
    <div className={`${styles.images} ${styles[imagesSize]} ${classNames}`}>
      <img src={src} alt={alt} />
      {children}
    </div>
  );
}

export default Images;
