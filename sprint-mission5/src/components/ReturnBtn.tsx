import returnIcon from "../images/returnicon/return.png";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
function ReturnButton() {
  const navigate = useNavigate();
  const handleReturnClick = () => {
    navigate(-1);
  };
  return (
    <>
      <ReturnBtn onClick={handleReturnClick}>
        <ReturnTxt>목록으로 돌아가기</ReturnTxt>
        <img src={returnIcon} alt="돌아가기 btn" />
      </ReturnBtn>
    </>
  );
}
const ReturnTxt = styled.span`
  font-size: 1.125rem;
  color: var(--white);
`;
const ReturnBtn = styled.button`
  margin: 0 auto;
  margin-top: 64px;
  padding: 11px 39.5px;
  background-color: var(--skyblue);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 40px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--gray900);

    ${ReturnTxt} {
      color: var(--bgkakao);
    }
  }
`;
export default ReturnButton;
