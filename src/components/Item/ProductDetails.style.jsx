import styled from "styled-components";

const Details = styled.div`
  flex-grow: 1;
  margin-left: 24px;

  @media (max-width: 1200px) {
    margin-left: 16px;
  }

  @media (max-width: 744px) {
    margin: 16px 0 0 0;
  }
`;

const UserStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 62px;

  @media (max-width: 1200px) {
    margin-top: 40px;
  }
`;

export { Details, UserStats };
