import styled from "styled-components";
import ReturnToList from "./ReturnToList";
import backButtonIcon from "../../assets/backButton_icon.svg";

const StyledReturnToList = styled(ReturnToList)`
  display: flex;
  justify-content: center;

  a {
    border-radius: 40px;
    background: var(--blue);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 240px;
    height: 48px;
    color: #f3f4f6;
  }

  a::after {
    content: "";
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url(${backButtonIcon}) no-repeat;
    background-size: 100%;
    margin-left: 8px;
  }

  @media (max-width: 1200px) {
    a {
      font-size: 18px;
    }
  }
`;

export default StyledReturnToList;
