import styled from "styled-components";

const Img = styled.div`
  border-radius: 16px;
  width: 486px;
  height: 486px;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 1200px) {
    width: 340px;
    height: 340px;
  }

  @media (max-width: 744px) {
    width: 100%;
    height: 343px;
  }
`;

export default Img;
