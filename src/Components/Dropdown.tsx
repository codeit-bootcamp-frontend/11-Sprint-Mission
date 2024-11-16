import { ReactNode } from 'react';
import clsx from 'clsx';
//
import iconDots from '../assets/icon-vdots.svg';
import styles from './Dropdown.module.css';

interface Props {
  buttonText?: string | undefined;
  isRight?: boolean;
  children: ReactNode;
}

/**
 * 드롭다운 컴포넌트
 * @param {string | undefined} buttonText : 드롭다운 기능 버튼 텍스트
 * @param {boolean} isRight : 드롭다운 요소 정렬. 기본 왼쪽.
 * @param {ReactNode} children : 드롭다운 요소
 * @return {JSX}
 */
function Dropdown({ buttonText, isRight = false, children }: Props) {
  return (
    <div className={clsx(styles.dropdown, isRight && styles.right)}>
      <button className={styles.btn}>{buttonText || <img src={iconDots} alt="추가 기능" />}</button>
      <div className={styles.more}>{children}</div>
    </div>
  );
}

export default Dropdown;
