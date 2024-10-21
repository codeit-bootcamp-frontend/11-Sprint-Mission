import styled from "styled-components";

const Tag = styled.div`
  margin-top: 24px;

  h3 {
    font-weight: 600;
    color: #4b5563;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
  }

  li {
    border-radius: 26px;
    background: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    color: #1f2937;
    padding: 0 16px;
  }

  @media (max-width: 1200px) {
    h3 {
      font-size: 14px;
    }

    ul {
      margin-top: 8px;
    }
  }
`;

export default Tag;
