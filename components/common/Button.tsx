import styles from "@/components/common/Button.module.css";

interface ButtonProps {
  buttonName: string;
  className?: string;
}

export default function Button({ buttonName, className = "" }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[className]}`}>
      {buttonName}
    </button>
  );
}
