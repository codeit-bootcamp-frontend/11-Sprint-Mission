import styled from "styled-components";

const Details = styled.div`
  flex-grow: 1;
  margin-left: 24px;
`;

const Title = styled.div`
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 16px;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #1f2937;
  }

  p {
    font-size: 40px;
    font-weight: 600;
    color: #1f2937;
    margin-top: 16px;
  }
`;

const UserStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 62px;
`;

export { Details, Title, UserStats };
