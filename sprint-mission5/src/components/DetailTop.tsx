import styled from "styled-components";
import { ItemDetail } from "../types/type";
interface DetailTopBox {
  name: string;
}
interface DetailTopProps {
  itemDetail: ItemDetail;
}
function DetailTop({ itemDetail }: DetailTopProps) {
  return (
    <DetailTopBox>
      <DetailTitle>{itemDetail.name}</DetailTitle>
      <DetailDotsBox>
        <Dots></Dots>
        <Dots></Dots>
        <Dots></Dots>
      </DetailDotsBox>
    </DetailTopBox>
  );
}
const DetailTopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DetailTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gray800);
  @media (min-width: 320px) and (max-width: 767px) {
    font-size: 1rem;
  }
`;
const Dots = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: var(--gray400);
`;
const DetailDotsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
export default DetailTop;
