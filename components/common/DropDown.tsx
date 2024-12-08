import { useState } from "react";
import styles from "@/components/common/DropDown.module.css";
import Image from "next/image";
import Sort from "@/assets/images/icons/ic_sort.svg";

export default function DropDown() {
  const [view, setView] = useState(false);
  // dropdown 만들 때 button 태그, ul 태그 등 방법이 여러 개인 거 같던데 차이점이 무엇인지?
  return (
    <ul
      className={styles.dropdown}
      onClick={() => {
        setView(!view);
      }}
    >
      <span className={styles.sort}>
        최신순
        <Image
          src={Sort}
          alt="정렬 아이콘"
          width={24}
          height={24}
          className={view ? styles.rotation : ""}
        />
      </span>
      {view && <li>기본순</li>}
    </ul>
  );
}
