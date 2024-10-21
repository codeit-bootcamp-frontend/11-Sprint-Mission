import styled from "styled-components";

const Inner = styled.div`
  width: 1200px;
  margin: 29px auto 0 auto;

  @media (max-width: 1200px) {
    width: 93.5%;
  }

  @media (max-width: 744px) {
    width: 91.7%;
  }
`;

const ProductContainer = styled.div`
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  padding-bottom: 40px;

  @media (max-width: 1200px) {
    padding-bottom: 32px;
  }

  @media (max-width: 744px) {
    flex-direction: column;
  }
`;

export { Inner, ProductContainer };
