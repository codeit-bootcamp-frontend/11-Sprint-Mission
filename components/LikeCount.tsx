import styled from 'styled-components';
import HeartIcon from '@/public/images/icons/ic_heart.svg';

interface LikeCountProps {
  count: number;
  children?: React.ReactNode; // 개수를 텍스트로 표시하려면 사용해야 오류가 없음
}

const LikeCount: React.FC<LikeCountProps> = ({ count }) => {
  const display = count >= 10000 ? '9999+' : count.toString();

  return (
    <LikeSection>
      <HeartIcon width="20px" alt="좋아요" />
      {display}
    </LikeSection>
  );
};

const LikeSection = styled.div`
  display: flex;
  align-items: center;
  color: var(--gray-500);
  font-size: 16px;
  gap: 4px;
`;

export default LikeCount;
