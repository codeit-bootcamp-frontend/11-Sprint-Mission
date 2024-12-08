import styles from "@/components/common/Input.module.css";
import Image from "next/image";

interface InputProps {
  placeholder?: string;
  className?: string;
  type?: string;
}

interface ImageProps extends InputProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export default function Input({
  placeholder,
  type = "text",
  className = "",
  src,
  alt,
  width,
  height,
}: ImageProps) {
  return (
    <>
      <form className={`${styles.form} ${styles[className]}`}>
        {src && (
          <Image src={src} alt={alt || "Image"} width={width} height={height} />
        )}
        <input placeholder={placeholder} type={type}></input>
      </form>
    </>
  );
}
