import styled from "styled-components";

const Description = styled.div`
  margin-top: 24px;

  h3 {
    font-weight: 600;
    color: #4b5563;
  }

  p {
    color: #4b5563;
    line-height: 26px;
    margin-top: 16px;
  }

  @media (max-width: 1200px) {
    margin-top: 16px;

    h3 {
      font-size: 14px;
    }

    p {
      margin-top: 8px;
    }
  }
`;

export default Description;
