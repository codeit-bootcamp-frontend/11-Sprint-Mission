import React from 'react';
import styles from '@/styles/Addboard.module.css';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import IconPlus from '@/public/ic_plus.svg';
import Image from 'next/image';
import useResize from '@/hooks/useResize';

const Addboard = () => {
  const screenType = useResize(); // useResize 훅 사용

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(e.target.value);
  };

  const getTextTitle = () => {
    return screenType === 'desktop' ? '게시글 쓰기' : '상품 등록하기';
  };

  return (
    <>
      <div className={styles.addboard}>
        <div className={styles['addboard-header']}>
          <h2>{getTextTitle()}</h2>
          {/* 버튼 css 안됨 */}
          <Button addClassName={styles.buttonMiddle} disabled={false}>
            등록
          </Button>
        </div>
        <div className={styles['addboard-content']}>
          <div className={styles.box}>
            <h3>*제목</h3>
            <Input
              addClassName={styles.inputTitle}
              placehorder="제목을 입력해주세요"
            />
          </div>
          <div className={styles.box}>
            <h3>*내용</h3>
            <Input
              addClassName={`${styles.inputTitle} ${styles.inputLarge}`}
              placehorder="내용을 입력해주세요"
            />
          </div>
          <div className={styles.box}>
            <h3>이미지</h3>
            <div className={styles.image}>
              <div className={styles['image-block']}>
                <Image
                  src={IconPlus}
                  alt="이미지등록"
                  width={48}
                  height={48}
                ></Image>
                <div className={styles['image-txt']}>이미지 등록</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addboard;
