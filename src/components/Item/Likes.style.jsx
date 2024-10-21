import styled from "styled-components";

const Like = styled.span`
  border: 1px solid #e5e7eb;
  border-radius: 35px;
  display: flex;
  align-items: center;
  height: 40px;
  font-weight: 500;
  color: #6b7280;
  padding: 0 12px;
  position: relative;

  i {
    width: 32px;
    height: 32px;
    margin-right: 4px;
  }

  img {
    width: 100%;
    height: 100%;
  }

  &::before {
    content: "";
    background: #e5e7eb;
    display: inline-block;
    width: 1px;
    height: 34px;
    position: absolute;
    top: 50%;
    left: -24px;
    transform: translateY(-50%);
  }

  @media (max-width: 1200px) {
    height: 32px;

    i {
      width: 24px;
      height: 24px;
    }
  }
`;

export default Like;
