import styled from "styled-components";

const Head = styled.div`
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

  @media (max-width: 1200px) {
    h2 {
      font-size: 20px;
    }

    p {
      font-size: 32px;
      margin-top: 8px;
    }
  }

  @media (max-width: 744px) {
    h2 {
      font-size: 16px;
    }

    p {
      font-size: 24px;
    }
  }
`;

export default Head;
