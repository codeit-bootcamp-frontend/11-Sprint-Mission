import cn from 'classnames/bind';
//
import iconDots from '../assets/icon-vdots.svg';
import styles from './Dropdown.module.css';

const cx = cn.bind(styles);

/**
 * 드롭다운 컴포넌트
 * @param {*} buttonText : 드롭다운 기능 버튼 텍스트
 * @param {boolean} isRight : 드롭다운 요소 정렬. 기본 왼쪽.
 * @param {*} children : 드롭다운 요소
 * @return {JSX}
 */
function Dropdown({ buttonText, isRight = false, children }) {
  return (
    <div className={cx('dropdown', { right: isRight })}>
      <button className={styles.btn}>{buttonText || <img src={iconDots} alt="추가 기능" />}</button>
      <div className={styles.more}>{children}</div>
    </div>
  );
}

export default Dropdown;
